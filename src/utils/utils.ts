import morseCodes from '../data/morseCodes.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Dispatch, SetStateAction } from 'react';
import type UserInterface from '../interfaces/UserInterface';
import { DELETE_FOR_EVERYONE_WINDOW } from './constant';
dayjs.extend(relativeTime);

/**
 * Indicates whether the app is running in the development environment.
 */
export const isDev = import.meta.env.VITE_NODE_ENV === 'development';

/**
 *
 * @param t time in seconds
 * @returns returns time in MM:SS format
 */
export const formatTime = (t: number) => {
  const min = String(Math.floor(t / 60)).padStart(2, '0');
  const sec = String(t % 60).padStart(2, '0');
  return `${min}:${sec}`;
};

/**
 * Represents a single morse-code item.
 */
export type MorseItem = {
  id: number;
  morse: string;
  hint: string;
  decoded: string;
  category: string;
};

/**
 * Selects a random morse-code challenge from the bundled dataset.
 *
 * @returns A randomly selected morse-code entre.
 */
export const getRandomMorse = (): MorseItem => {
  return morseCodes[Math.floor(Math.random() * morseCodes.length)];
};

/**
 * Creates a promise that resolves after the provided delay.
 *
 * @param delay Delay duration in milliseconds.
 * @returns A promise that resolves once the delay has elapsed.
 */
export const mockApiDelay = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

/**
 * Builds initials from the first two words in a display name.
 *
 * @param name Display name to convert.
 * @returns Up to two initials, or an empty string when no name is provided.
 */
export const getAvatarTxt = (name: string | undefined) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
};

/**
 * Formats a timestamp into a compact last-seen label.
 *
 * @param date Timestamp string to format.
 * @returns A relative last-seen label, or a date for older timestamps.
 */
export const formatLastSeen = (date: string, isOnline: boolean = false) => {
  const now = dayjs();
  const target = dayjs(date);

  const minutes = now.diff(target, 'minute');
  const hours = now.diff(target, 'hour');
  const days = now.diff(target, 'day');

  if (isOnline) {
    return 'Just now';
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return 'Yesterday';
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return target.format('DD MMM YYYY');
};

/**
 * Formats a message timestamp for chat list previews.
 *
 * @param date Timestamp string to format.
 * @returns A time for today, weekday for recent messages, date for older messages, or an empty string for missing/invalid input.
 */
export const formatLastMessageAt = (date: string | undefined) => {
  if (!date) return '';

  const target = dayjs(date);
  if (!target.isValid()) return '';

  const days = dayjs().startOf('day').diff(target.startOf('day'), 'day');

  if (days === 0) {
    return target.format('h:mm A'); // 4:12 AM
  }

  if (days === 1) {
    return 'yesterday'; // yesterday
  }

  if (days > 1 && days < 7) {
    return target.format('dddd'); // Monday, Friday
  }

  return target.format('DD/MM/YYYY'); // 24/04/2026
};

/**
 * Formats a message timestamp for compact chat display.
 *
 * @param date - ISO-compatible date string to format.
 * @returns Time in "H:MM A" format
 */
export const formatMsgTime = (date: string) => {
  if (!date) return '';
  const target = dayjs(date);
  if (!target.isValid()) return '';

  return target.format('h:mm A'); // 4:12 AM
};

/**
 * Formats a message date for chat grouping.
 *
 * @param date - ISO-compatible date string to format.
 * @returns Relative date label for recent dates, or "DD/MM/YYYY" for older dates.
 */
export const formatMsgDate = (date: string) => {
  if (!date) return '';
  const target = dayjs(date);
  if (!target.isValid()) return '';

  const days = dayjs().startOf('day').diff(target.startOf('day'), 'day');

  if (days === 0) {
    return 'Today';
  }

  if (days === 1) {
    return 'yesterday'; // yesterday
  }

  if (days > 1 && days < 7) {
    return target.format('dddd'); // Monday, Friday
  }

  return target.format('DD/MM/YYYY'); // 24/04/2026
};

/**
 * Copies text to the clipboard and optionally marks an item as copied for 2 seconds.
 *
 * @param copyText - Text to write to the user's clipboard.
 * @param copiedId - Optional identifier to set while the copied state is active.
 * @param setCopiedId - Optional React state setter used to show and clear copied state.
 */
export const copyToClipboard = async (
  copyText: string,
  copiedId: string = '',
  setCopiedId: Dispatch<SetStateAction<string>> | null = null,
) => {
  try {
    await navigator.clipboard.writeText(copyText);
    if (copiedId && setCopiedId) {
      setCopiedId(copiedId);
      setTimeout(() => setCopiedId(''), 2000);
    }
  } catch (error) {
    console.error('Failed to copy text !!');
  }
};

/**
 * Counts the number of online users in a members list.
 *
 * @param members - Members to inspect. Defaults to an empty list.
 * @returns The total number of members whose `isOnline` flag is true.
 */
export const countOnlineMembers = (members: UserInterface[] = []) => {
  return members.reduce((curOnline, mem) => curOnline + (mem.isOnline ? 1 : 0), 0);
};

// todo add js docs
export const generateLocalUrl = async (cloudUrl: string): Promise<string> => {
  try {
    if (!cloudUrl) return '';
    const response = await fetch(cloudUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  } catch (error) {
    console.error('Failed to generate local url');
  }
  return '';
};

// todo add js docs
export const formatFileSize = (bytes: number | undefined) => {
  if (!bytes) return '';
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
};

export const formatPlayTime = (duration: number | undefined) => {
  if (!duration) return '';
  return `${Math.floor(duration / 60)
    .toString()
    .padStart(2, '0')}
    :
    ${Math.ceil(duration % 60)
      .toString()
      .padStart(2, '0')}`;
};

// todo add js docs
export const downloadFile = async (url: string | undefined, fileName: string | undefined) => {
  if (!url || !fileName) return;

  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// todo add js docs
export const canDeleteForEveryone = (createdAt: string) => {
  return Date.now() < new Date(createdAt).getTime() + DELETE_FOR_EVERYONE_WINDOW;
};

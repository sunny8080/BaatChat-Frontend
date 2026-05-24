import morseCodes from '../data/morseCodes.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Dispatch, SetStateAction } from 'react';
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

  if (minutes < 1 || isOnline) {
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
 * Copies text to the clipboard and optionally marks an item as copied for 2 seconds.
 *
 * @param copyText - Text to write to the user's clipboard.
 * @param copiedId - Optional identifier to set while the copied state is active.
 * @param setCopiedId - Optional React state setter used to show and clear copied state.
 */
export const copyToClipboard = async (copyText: string, copiedId: string = '', setCopiedId: Dispatch<SetStateAction<string>> | null = null) => {
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

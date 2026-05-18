import morseCodes from '../data/morseCodes.json';

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

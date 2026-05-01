import morseCodes from '../data/morseCodes.json';

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

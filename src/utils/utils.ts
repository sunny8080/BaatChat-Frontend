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

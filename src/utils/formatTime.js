/**
 * Accurate time formatting utilities for PULSE Precision Stopwatch
 */

/**
 * Parses total milliseconds into zero-padded time components
 * @param {number} ms - Milliseconds to format
 * @returns {{ hours: string, minutes: string, seconds: string, centiseconds: string, formatted: string }}
 */
export function parseTimeParts(ms) {
  if (typeof ms !== 'number' || isNaN(ms) || ms < 0) {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      centiseconds: '00',
      formatted: '00:00:00.00',
    };
  }

  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  
  const hours = Math.floor(totalMinutes / 60);

  const pad = (num, digits = 2) => String(num).padStart(digits, '0');

  const hStr = pad(hours);
  const mStr = pad(minutes);
  const sStr = pad(seconds);
  const cStr = pad(centiseconds);

  return {
    hours: hStr,
    minutes: mStr,
    seconds: sStr,
    centiseconds: cStr,
    formatted: `${hStr}:${mStr}:${sStr}.${cStr}`,
  };
}

/**
 * Formats milliseconds into HH:MM:SS.CC string
 * @param {number} ms - Milliseconds
 * @returns {string} e.g. "00:00:00.00"
 */
export function formatTime(ms) {
  return parseTimeParts(ms).formatted;
}

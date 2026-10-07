/**
 * Time formatting utilities for STOPWATCH Precision Time Tracking
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
 * Formats milliseconds into standard HH:MM:SS.CC string
 * @param {number} ms - Milliseconds
 * @returns {string} e.g. "00:00:00.00"
 */
export function formatTime(ms) {
  return parseTimeParts(ms).formatted;
}

/**
 * Formats milliseconds into concise lap time format
 * e.g. "00:12.42" or "01:14:28.32" if hours > 0
 * @param {number} ms - Milliseconds
 * @returns {string}
 */
export function formatLapTime(ms) {
  const parts = parseTimeParts(ms);
  if (Number(parts.hours) > 0) {
    return `${parts.hours}:${parts.minutes}:${parts.seconds}.${parts.centiseconds}`;
  }
  return `${parts.minutes}:${parts.seconds}.${parts.centiseconds}`;
}

/**
 * Formats a timestamp into a human-readable session date label (e.g. "TODAY", "YESTERDAY", "OCT 07")
 * @param {number|string|Date} timestamp
 * @returns {{ group: string, fullDate: string, timeStr: string }}
 */
export function formatSessionDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  let group = '';
  if (isToday) {
    group = 'TODAY';
  } else if (isYesterday) {
    group = 'YESTERDAY';
  } else {
    group = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  }

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const fullDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return { group, fullDate, timeStr };
}

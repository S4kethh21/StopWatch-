/**
 * Storage manager for STOPWATCH application
 * Uses clean namespaced keys under stopwatch_app_*
 */

const STORAGE_KEYS = {
  PERSONAL_BEST: 'stopwatch_app_personal_best',
  SESSIONS: 'stopwatch_app_sessions',
  SETTINGS: 'stopwatch_app_settings',
};

const DEFAULT_SETTINGS = {
  countdown: 'off', // 'off' | '3' | '5'
  sound: false,     // boolean (Default OFF)
  reducedMotion: 'auto', // 'auto' | 'on' | 'off'
  theme: 'midnight-yellow',
};

/**
 * Safely reads from localStorage
 */
function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[Stopwatch Storage] Error reading key "${key}":`, err);
    return fallback;
  }
}

/**
 * Safely writes to localStorage
 */
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[Stopwatch Storage] Error writing key "${key}":`, err);
  }
}

/**
 * Get personal best (fastest lap in ms)
 * @returns {number|null}
 */
export function getPersonalBest() {
  const val = safeGet(STORAGE_KEYS.PERSONAL_BEST, null);
  return typeof val === 'number' && val > 0 ? val : null;
}

/**
 * Save personal best (in ms)
 * @param {number} timeMs
 */
export function setPersonalBest(timeMs) {
  if (typeof timeMs === 'number' && timeMs > 0) {
    safeSet(STORAGE_KEYS.PERSONAL_BEST, timeMs);
  }
}

/**
 * Get all saved sessions
 * @returns {Array<object>}
 */
export function getSessions() {
  const sessions = safeGet(STORAGE_KEYS.SESSIONS, []);
  return Array.isArray(sessions) ? sessions : [];
}

/**
 * Save a new session
 * @param {object} session
 * @returns {Array<object>} updated list
 */
export function saveSession(session) {
  const sessions = getSessions();
  const newSession = {
    id: session.id || `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: session.timestamp || Date.now(),
    date: session.date || new Date().toISOString(),
    totalDuration: session.totalDuration || 0,
    totalLaps: session.totalLaps || 0,
    fastestLap: session.fastestLap || null,
    slowestLap: session.slowestLap || null,
    averageLap: session.averageLap || null,
    laps: Array.isArray(session.laps) ? session.laps : [],
  };

  const updated = [newSession, ...sessions];
  safeSet(STORAGE_KEYS.SESSIONS, updated);
  return updated;
}

/**
 * Delete a session by ID
 * @param {string} sessionId
 * @returns {Array<object>} updated list
 */
export function deleteSession(sessionId) {
  const sessions = getSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  safeSet(STORAGE_KEYS.SESSIONS, filtered);
  return filtered;
}

/**
 * Get settings
 * @returns {object}
 */
export function getSettings() {
  const loaded = safeGet(STORAGE_KEYS.SETTINGS, {});
  return { ...DEFAULT_SETTINGS, ...loaded };
}

/**
 * Save settings
 * @param {object} settings
 */
export function saveSettings(settings) {
  const current = getSettings();
  const updated = { ...current, ...settings };
  safeSet(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

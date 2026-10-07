/**
 * Subtle sound synthesizer using the Web Audio API
 * Produces soft, pleasant acoustic-like clicks and chimes.
 * Respects autoplay restrictions and volume levels.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    try {
      audioCtx = new AudioContextClass();
    } catch {
      return null;
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

/**
 * Play a synthesized tone
 * @param {object} opts
 */
function playTone({ freq = 440, endFreq = null, duration = 0.08, type = 'sine', gain = 0.06 }) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(freq, now);
    if (endFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
    }

    gainNode.gain.setValueAtTime(gain, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Gracefully handle browser restrictions
  }
}

export const soundEffects = {
  /**
   * Crisp rising chime when starting / resuming timer
   */
  start(enabled = true) {
    if (!enabled) return;
    playTone({ freq: 520, endFreq: 680, duration: 0.09, type: 'sine', gain: 0.05 });
  },

  /**
   * Soft subtle click when pausing timer
   */
  pause(enabled = true) {
    if (!enabled) return;
    playTone({ freq: 440, endFreq: 380, duration: 0.06, type: 'triangle', gain: 0.04 });
  },

  /**
   * Bright precise ping when recording a lap
   */
  lap(enabled = true) {
    if (!enabled) return;
    playTone({ freq: 880, endFreq: 960, duration: 0.08, type: 'sine', gain: 0.06 });
  },

  /**
   * Soft short pulse for countdown ticks (3, 2, 1)
   */
  countdownTick(enabled = true) {
    if (!enabled) return;
    playTone({ freq: 520, duration: 0.07, type: 'sine', gain: 0.06 });
  },

  /**
   * Clear rising chime for countdown GO
   */
  countdownGo(enabled = true) {
    if (!enabled) return;
    playTone({ freq: 660, endFreq: 880, duration: 0.16, type: 'sine', gain: 0.08 });
  },

  /**
   * Soft tone when resetting
   */
  reset(enabled = true) {
    if (!enabled) return;
    playTone({ freq: 400, endFreq: 280, duration: 0.09, type: 'triangle', gain: 0.04 });
  },
};

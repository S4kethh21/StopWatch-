import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Controls({ isRunning, isPaused, canReset, onStart, onPause, onReset }) {
  return (
    <div className="primary-controls" role="group" aria-label="Stopwatch primary controls">
      {/* START / RESUME Button */}
      <button
        type="button"
        className="btn btn-primary btn-start"
        onClick={onStart}
        disabled={isRunning}
        aria-label={isPaused ? 'Resume stopwatch' : 'Start stopwatch'}
      >
        <Play size={18} className="btn-icon" fill="currentColor" />
        <span>{isPaused ? 'RESUME' : 'START'}</span>
      </button>

      {/* PAUSE Button */}
      <button
        type="button"
        className="btn btn-secondary btn-pause"
        onClick={onPause}
        disabled={!isRunning}
        aria-label="Pause stopwatch"
      >
        <Pause size={18} className="btn-icon" />
        <span>PAUSE</span>
      </button>

      {/* RESET Button */}
      <button
        type="button"
        className="btn btn-ghost btn-reset"
        onClick={onReset}
        disabled={!canReset}
        aria-label="Reset stopwatch"
      >
        <RotateCcw size={18} className="btn-icon" />
        <span>RESET</span>
      </button>
    </div>
  );
}

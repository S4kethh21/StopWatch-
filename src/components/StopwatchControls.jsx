import React from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchControls({
  isRunning,
  isPaused,
  canReset,
  onStart,
  onPause,
  onReset,
  onRecordLap,
  lapCount = 0,
}) {
  return (
    <div className="stopwatch-controls-module" role="group" aria-label="Stopwatch controls">
      {/* Primary Action Button (Yellow Filled) */}
      <div className="controls-primary-wrapper">
        {!isRunning ? (
          <button
            type="button"
            className="btn-main-primary"
            onClick={onStart}
            aria-label={isPaused ? 'Resume stopwatch' : 'Start stopwatch'}
          >
            <Play size={20} fill="currentColor" />
            <span>{isPaused ? 'RESUME' : 'START'}</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn-main-primary"
            onClick={onPause}
            aria-label="Pause stopwatch"
          >
            <Pause size={20} fill="currentColor" />
            <span>PAUSE</span>
          </button>
        )}
      </div>

      {/* Secondary Controls Row (LAP & RESET) */}
      <div className="controls-secondary-wrapper">
        <button
          type="button"
          className="btn-main-secondary btn-lap-action"
          onClick={onRecordLap}
          disabled={!isRunning}
          aria-label="Record lap time"
        >
          <Flag size={16} />
          <span>LAP</span>
          {lapCount > 0 && <span className="controls-lap-badge">{lapCount}</span>}
        </button>

        <button
          type="button"
          className="btn-main-secondary btn-reset-action"
          onClick={onReset}
          disabled={!canReset}
          aria-label="Reset stopwatch to zero"
        >
          <RotateCcw size={16} />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
}

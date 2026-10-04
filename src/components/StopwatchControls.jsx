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
    <div className="center-phone-controls" role="group" aria-label="Stopwatch controls">
      {/* Primary Action Button (Yellow Filled) */}
      <div className="controls-row-primary">
        {!isRunning ? (
          <button
            type="button"
            className="btn-phone-primary btn-start-yellow"
            onClick={onStart}
            aria-label={isPaused ? 'Resume stopwatch' : 'Start stopwatch'}
          >
            <Play size={18} fill="currentColor" />
            <span>{isPaused ? 'RESUME' : 'START'}</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn-phone-primary btn-pause-yellow"
            onClick={onPause}
            aria-label="Pause stopwatch"
          >
            <Pause size={18} fill="currentColor" />
            <span>PAUSE</span>
          </button>
        )}
      </div>

      {/* Secondary Actions (Dark Outlined) */}
      <div className="controls-row-secondary">
        <button
          type="button"
          className="btn-phone-secondary btn-lap-outline"
          onClick={onRecordLap}
          disabled={!isRunning}
          aria-label="Record lap time"
        >
          <Flag size={15} />
          <span>LAP</span>
          {lapCount > 0 && <span className="lap-counter-pill">{lapCount}</span>}
        </button>

        <button
          type="button"
          className="btn-phone-secondary btn-reset-outline"
          onClick={onReset}
          disabled={!canReset}
          aria-label="Reset stopwatch"
        >
          <RotateCcw size={15} />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { Play, Pause, RotateCcw, Flag, Maximize2, Minimize2 } from 'lucide-react';

export default function StopwatchControls({
  isRunning,
  isPaused,
  canReset,
  isFocusMode = false,
  onStart,
  onPause,
  onReset,
  onRecordLap,
  onToggleFocus,
  lapCount = 0,
}) {
  return (
    <div
      className={`stopwatch-controls-module ${isFocusMode ? 'controls-focus-mode' : ''}`}
      role="group"
      aria-label="Stopwatch controls"
    >
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

      {/* Secondary Controls Row */}
      {!isFocusMode ? (
        <div className="controls-secondary-wrapper">
          <button
            type="button"
            className="btn-main-secondary btn-lap-action"
            onClick={onRecordLap}
            disabled={!isRunning}
            aria-label="Record lap time"
          >
            <Flag size={15} />
            <span>LAP</span>
            {lapCount > 0 && <span className="controls-lap-badge">{lapCount}</span>}
          </button>

          <button
            type="button"
            className="btn-main-secondary btn-reset-action"
            onClick={onReset}
            disabled={!canReset}
            aria-label="Reset stopwatch"
          >
            <RotateCcw size={15} />
            <span>RESET</span>
          </button>

          <button
            type="button"
            className="btn-main-secondary btn-focus-action"
            onClick={onToggleFocus}
            aria-label="Enter focus mode"
            title="Focus Mode (Press F)"
          >
            <Maximize2 size={15} />
            <span>FOCUS</span>
          </button>
        </div>
      ) : (
        <div className="controls-focus-wrapper">
          {/* In Focus Mode: Option for Split Lap, and Exit Focus button */}
          {isRunning && (
            <button
              type="button"
              className="btn-focus-lap"
              onClick={onRecordLap}
              aria-label="Record split lap"
            >
              <Flag size={14} />
              <span>LAP</span>
            </button>
          )}

          <button
            type="button"
            className="btn-exit-focus"
            onClick={onToggleFocus}
            aria-label="Exit focus mode"
            title="Exit Focus Mode (Press F or ESC)"
          >
            <Minimize2 size={14} />
            <span>EXIT FOCUS</span>
          </button>
        </div>
      )}
    </div>
  );
}

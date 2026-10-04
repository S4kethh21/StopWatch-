import React from 'react';
import { parseTimeParts } from '../utils/formatTime';

export default function StopwatchDisplay({ elapsedTime, isRunning, isPaused }) {
  const { hours, minutes, seconds, centiseconds, formatted } = parseTimeParts(elapsedTime);

  // Status computation
  let statusText = 'READY';
  let statusColorClass = 'status-ready';

  if (isRunning) {
    statusText = 'RUNNING';
    statusColorClass = 'status-running';
  } else if (isPaused) {
    statusText = 'PAUSED';
    statusColorClass = 'status-paused';
  }

  // Determine which time row has active prominence
  const hasHours = parseInt(hours, 10) > 0;
  const hasMinutes = parseInt(minutes, 10) > 0;

  return (
    <div className="stopwatch-screen-content" aria-label="Stopwatch Timer">
      {/* Huge Oversized Typographic Timer (Stacked Editorial Style) */}
      <div
        className="editorial-timer-stack"
        role="timer"
        aria-live="polite"
        aria-label={`Current stopwatch time: ${formatted}`}
      >
        {/* Hours row */}
        <div className={`time-digit-row row-hours ${hasHours ? 'row-active' : 'row-dim'}`}>
          <span className="digit-value">{hours}</span>
          <span className="digit-unit">h</span>
        </div>

        {/* Minutes row */}
        <div className={`time-digit-row row-minutes ${hasMinutes ? 'row-active' : (hasHours ? 'row-dim' : '')}`}>
          <span className="digit-value">{minutes}</span>
          <span className="digit-unit">m</span>
        </div>

        {/* Seconds row — Primary focal digit */}
        <div className={`time-digit-row row-seconds ${isRunning ? 'row-highlight-yellow' : ''}`}>
          <span className="digit-value">{seconds}</span>
          <span className="digit-unit">s</span>
        </div>

        {/* Centiseconds fractional readout */}
        <div className="time-centiseconds-row" aria-hidden="true">
          <span className="cs-label">SPLIT</span>
          <span className={`cs-value ${isRunning ? 'text-yellow' : 'text-muted'}`}>
            .{centiseconds}
          </span>
        </div>
      </div>

      {/* Thin Editorial Divider */}
      <div className="editorial-divider" aria-hidden="true" />

      {/* Status Label */}
      <div className={`editorial-status ${statusColorClass}`} role="status">
        <span className="status-indicator-dot" aria-hidden="true" />
        <span className="status-indicator-text">{statusText}</span>
      </div>
    </div>
  );
}

import React from 'react';
import { parseTimeParts } from '../utils/formatTime';

export default function StopwatchDisplay({
  elapsedTime,
  isRunning,
  isPaused,
  countdownValue = null,
  isFocusMode = false,
}) {
  const { hours, minutes, seconds, centiseconds, formatted } = parseTimeParts(elapsedTime);

  // Status computation
  let statusText = 'READY';
  let statusColorClass = 'status-ready';

  if (countdownValue !== null) {
    statusText = 'COUNTDOWN';
    statusColorClass = 'status-countdown';
  } else if (isRunning) {
    statusText = 'RUNNING';
    statusColorClass = 'status-running';
  } else if (isPaused) {
    statusText = 'PAUSED';
    statusColorClass = 'status-paused';
  }

  return (
    <div
      className={`stopwatch-display-unit ${isFocusMode ? 'display-focus-mode' : ''}`}
      aria-label="Stopwatch Timer"
    >
      <span className="timer-top-label" aria-hidden="true">
        {isFocusMode ? 'FOCUS TIMING' : 'TIME'}
      </span>

      {/* Countdown Visual Overlay / Core Display */}
      {countdownValue !== null ? (
        <div className="countdown-display-wrap" role="alert" aria-live="assertive">
          <span className="countdown-number text-yellow">
            {countdownValue}
          </span>
          <span className="countdown-hint">PREPARE TO START</span>
        </div>
      ) : (
        <>
          {/* Huge Editorial Typographic Timer */}
          <div
            className={`huge-timer-digits ${isFocusMode ? 'digits-expanded-focus' : ''}`}
            role="timer"
            aria-live="polite"
            aria-label={`Elapsed time: ${formatted}`}
          >
            <span className="digit-group group-hours">{hours}</span>
            <span className="digit-colon">:</span>
            <span className="digit-group group-minutes">{minutes}</span>
            <span className="digit-colon">:</span>
            <span className={`digit-group group-seconds ${isRunning ? 'highlight-yellow' : ''}`}>
              {seconds}
            </span>
            <span className="digit-period">.</span>
            <span className={`digit-group group-centiseconds ${isRunning ? 'cs-yellow' : 'cs-muted'}`}>
              {centiseconds}
            </span>
          </div>

          {/* Subtitle Units Underneath */}
          {!isFocusMode && (
            <div className="timer-unit-labels" aria-hidden="true">
              <span className="unit-col col-hr">HOURS</span>
              <span className="unit-space" />
              <span className="unit-col col-min">MINUTES</span>
              <span className="unit-space" />
              <span className="unit-col col-sec">SECONDS</span>
              <span className="unit-space" />
              <span className="unit-col col-cs">CENTISECONDS</span>
            </div>
          )}
        </>
      )}

      {/* Status Dot & Label */}
      <div className={`timer-status-badge ${statusColorClass}`} role="status">
        <span className="status-dot" aria-hidden="true" />
        <span className="status-label">{statusText}</span>
      </div>
    </div>
  );
}

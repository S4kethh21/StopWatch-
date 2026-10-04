import React from 'react';
import { parseTimeParts } from '../utils/formatTime';

export default function StopwatchDisplay({ elapsedTime, isRunning, isPaused }) {
  const { hours, minutes, seconds, centiseconds, formatted } = parseTimeParts(elapsedTime);

  // Status computation
  let statusText = 'READY';
  let statusClass = 'status-ready';

  if (isRunning) {
    statusText = 'RUNNING';
    statusClass = 'status-running';
  } else if (isPaused) {
    statusText = 'PAUSED';
    statusClass = 'status-paused';
  }

  const ringStateClass = isRunning
    ? 'ring-running'
    : isPaused
    ? 'ring-paused'
    : 'ring-ready';

  return (
    <section className="stopwatch-display-container" aria-label="Stopwatch Timer">
      {/* Precision Instrument Dial / Ring */}
      <div className={`dial-wrapper ${ringStateClass}`}>
        {/* Subtle Ambient Glow Ring */}
        <div className="dial-glow" aria-hidden="true" />

        {/* SVG Decorative Precision Ticks & Ring */}
        <svg className="dial-svg" viewBox="0 0 360 360" aria-hidden="true">
          <circle
            className="dial-track"
            cx="180"
            cy="180"
            r="168"
          />
          <circle
            className="dial-progress"
            cx="180"
            cy="180"
            r="168"
            strokeDasharray="1055"
            strokeDashoffset="0"
          />
        </svg>

        {/* Stopwatch Content inside dial */}
        <div className="display-inner">
          {/* Main Large Time Readout */}
          <div
            className="time-readout"
            role="timer"
            aria-live="polite"
            aria-label={`Elapsed time: ${formatted}`}
          >
            <span className="time-segment hours">{hours}</span>
            <span className="time-separator">:</span>
            <span className="time-segment minutes">{minutes}</span>
            <span className="time-separator">:</span>
            <span className="time-segment seconds">{seconds}</span>
            <span className="time-dot">.</span>
            <span className="time-segment centiseconds">{centiseconds}</span>
          </div>

          {/* Time Unit Labels for high readability */}
          <div className="time-labels" aria-hidden="true">
            <span className="unit-label">HR</span>
            <span className="unit-spacer" />
            <span className="unit-label">MIN</span>
            <span className="unit-spacer" />
            <span className="unit-label">SEC</span>
            <span className="unit-spacer dot-spacer" />
            <span className="unit-label cs-label">CS</span>
          </div>

          {/* Status Indicator */}
          <div className={`status-pill ${statusClass}`} role="status">
            <span className="status-dot-wrapper" aria-hidden="true">
              <span className="status-dot-ping" />
              <span className="status-dot-core" />
            </span>
            <span className="status-text">{statusText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

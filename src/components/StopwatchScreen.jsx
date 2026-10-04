import React from 'react';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchControls from './StopwatchControls';
import { ArrowLeft } from 'lucide-react';

export default function StopwatchScreen({
  elapsedTime,
  isRunning,
  isPaused,
  canReset,
  laps,
  onStart,
  onPause,
  onReset,
  onRecordLap,
  onNavigateHome,
  onNavigateLaps,
}) {
  return (
    <div className="screen-container stopwatch-screen-view">
      {/* Top Editorial Bar */}
      <header className="screen-header stopwatch-header" role="banner">
        <button
          type="button"
          className="btn-back-nav"
          onClick={onNavigateHome}
          aria-label="Return to home screen"
        >
          <ArrowLeft size={16} />
          <span>HOME</span>
        </button>

        <div className="header-center-title">
          <span className="brand-text-primary">STOPWATCH</span>
        </div>

        <div className="header-meta-right">
          <span className="spec-text-yellow">TASK 02</span>
          <span className="spec-text-muted">PRECISION</span>
        </div>
      </header>

      {/* Main Stopwatch Stage (Centered in Viewport) */}
      <main className="stopwatch-main-stage">
        <div className="stopwatch-center-column">
          <StopwatchDisplay
            elapsedTime={elapsedTime}
            isRunning={isRunning}
            isPaused={isPaused}
          />

          <StopwatchControls
            isRunning={isRunning}
            isPaused={isPaused}
            canReset={canReset}
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onRecordLap={onRecordLap}
            lapCount={laps.length}
            onViewLaps={onNavigateLaps}
          />
        </div>
      </main>

      {/* Subtle Keyboard Shortcuts Hint */}
      <footer className="screen-footer stopwatch-footer">
        <div className="shortcuts-row">
          <span className="shortcut-tag">
            <kbd>SPACE</kbd> {isRunning ? 'PAUSE' : 'START'}
          </span>
          <span className="shortcut-divider">&bull;</span>
          <span className="shortcut-tag">
            <kbd>L</kbd> LAP
          </span>
          <span className="shortcut-divider">&bull;</span>
          <span className="shortcut-tag">
            <kbd>R</kbd> RESET
          </span>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchControls from './StopwatchControls';
import LapHistoryPanel from './LapHistoryPanel';
import { ArrowLeft } from 'lucide-react';

function InfoGlyph({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 10v9" />
      <path d="M10 10h2" />
      <path d="M9.5 19h5" />
    </svg>
  );
}

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
  onClearLaps,
  onNavigateHome,
  onOpenInfo,
}) {
  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenInfo();
  };

  return (
    <div className="screen-container stopwatch-screen-view">
      {/* Top Editorial Navigation */}
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
          <div className="header-right-actions">
            <span className="spec-text-muted header-precision-tag">PRECISION</span>
            {/* Circular Info Button */}
            <button
              type="button"
              className="btn-info-circle"
              onClick={handleInfoClick}
              aria-label="About this stopwatch and developer information"
              title="About & Information (Press I)"
            >
              <InfoGlyph size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid: Left Stopwatch (60-65%), Right Lap History (35-40%) */}
      <main className="stopwatch-main-stage">
        <div className="stopwatch-two-column-layout">
          {/* Left Column — The Hero Stopwatch */}
          <section className="stopwatch-hero-col" aria-label="Stopwatch Timer">
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
            />
          </section>

          {/* Right Column — Lap History Panel */}
          <section className="stopwatch-sidebar-col" aria-label="Lap History Panel">
            <LapHistoryPanel
              laps={laps}
              onClearLaps={onClearLaps}
            />
          </section>
        </div>
      </main>

      {/* Subtle Keyboard Shortcuts Footer */}
      <footer className="screen-footer stopwatch-footer">
        <div className="shortcuts-row">
          <span className="shortcut-tag">
            <kbd>SPACE</kbd> {isRunning ? 'PAUSE' : (isPaused ? 'RESUME' : 'START')}
          </span>
          <span className="shortcut-divider">&bull;</span>
          <span className="shortcut-tag">
            <kbd>L</kbd> LAP
          </span>
          <span className="shortcut-divider">&bull;</span>
          <span className="shortcut-tag">
            <kbd>R</kbd> RESET
          </span>
          <span className="shortcut-divider">&bull;</span>
          <span className="shortcut-tag">
            <kbd>ESC</kbd> HOME
          </span>
        </div>
      </footer>
    </div>
  );
}

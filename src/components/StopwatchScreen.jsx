import React from 'react';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchControls from './StopwatchControls';
import LapHistoryPanel from './LapHistoryPanel';
import { ArrowLeft, Settings as SettingsIcon, History as HistoryIcon } from 'lucide-react';
import InfoGlyph from './InfoGlyph';

export default function StopwatchScreen({
  elapsedTime,
  isRunning,
  isPaused,
  canReset,
  laps,
  personalBest,
  isNewPersonalBest,
  countdownValue,
  isFocusMode,
  onStart,
  onPause,
  onReset,
  onRecordLap,
  onClearLaps,
  onToggleFocus,
  onNavigateHome,
  onNavigateHistory,
  onOpenSettings,
  onOpenInfo,
}) {
  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenInfo();
  };

  return (
    <div className={`screen-container stopwatch-screen-view ${isFocusMode ? 'in-focus-mode' : ''}`}>
      {/* Top Navigation */}
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
            {/* History Navigation Button */}
            {!isFocusMode && (
              <button
                type="button"
                className="btn-header-history"
                onClick={onNavigateHistory}
                aria-label="Open session history"
                title="Session History (Press H)"
              >
                <HistoryIcon size={14} />
                <span>HISTORY &rarr;</span>
              </button>
            )}

            {/* Settings Modal Button */}
            {!isFocusMode && (
              <button
                type="button"
                className="btn-header-icon"
                onClick={onOpenSettings}
                aria-label="Open stopwatch settings"
                title="Settings (Press S)"
              >
                <SettingsIcon size={16} />
              </button>
            )}

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

      {/* Main Grid: Left Stopwatch Hero, Right Lap History (Hidden in Focus Mode) */}
      <main className={`stopwatch-main-stage ${isFocusMode ? 'stage-focus-active' : ''}`}>
        <div className={`stopwatch-two-column-layout ${isFocusMode ? 'layout-focus-mode' : ''}`}>
          {/* Hero Stopwatch Column */}
          <section className="stopwatch-hero-col" aria-label="Stopwatch Timer">
            <StopwatchDisplay
              elapsedTime={elapsedTime}
              isRunning={isRunning}
              isPaused={isPaused}
              countdownValue={countdownValue}
              isFocusMode={isFocusMode}
            />

            <StopwatchControls
              isRunning={isRunning}
              isPaused={isPaused}
              canReset={canReset}
              isFocusMode={isFocusMode}
              onStart={onStart}
              onPause={onPause}
              onReset={onReset}
              onRecordLap={onRecordLap}
              onToggleFocus={onToggleFocus}
              lapCount={laps.length}
            />
          </section>

          {/* Lap History Panel (Hidden in Focus Mode) */}
          {!isFocusMode && (
            <section className="stopwatch-sidebar-col" aria-label="Lap History Panel">
              <LapHistoryPanel
                laps={laps}
                elapsedTime={elapsedTime}
                personalBest={personalBest}
                isNewPersonalBest={isNewPersonalBest}
                onClearLaps={onClearLaps}
              />
            </section>
          )}
        </div>
      </main>

      {/* Subtle Keyboard Shortcuts Footer */}
      <footer className="screen-footer stopwatch-footer">
        <div className="shortcuts-row">
          <span className="shortcut-tag">
            <kbd>SPACE</kbd> {isRunning ? 'PAUSE' : isPaused ? 'RESUME' : 'START'}
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
            <kbd>F</kbd> FOCUS
          </span>
          {!isFocusMode && (
            <>
              <span className="shortcut-divider">&bull;</span>
              <span className="shortcut-tag">
                <kbd>H</kbd> HISTORY
              </span>
              <span className="shortcut-divider">&bull;</span>
              <span className="shortcut-tag">
                <kbd>S</kbd> SETTINGS
              </span>
            </>
          )}
          <span className="shortcut-divider">&bull;</span>
          <span className="shortcut-tag">
            <kbd>ESC</kbd> {isFocusMode ? 'EXIT' : 'HOME'}
          </span>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StopwatchDisplay from './components/StopwatchDisplay';
import Controls from './components/Controls';
import LapControls from './components/LapControls';
import LapList from './components/LapList';
import ResetConfirmation from './components/ResetConfirmation';
import KeyboardHints from './components/KeyboardHints';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // References for precision timing without state latency
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Synchronized state references for event handlers
  const isRunningRef = useRef(false);
  const elapsedTimeRef = useRef(0);
  const lapsRef = useRef([]);
  const showResetConfirmationRef = useRef(false);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  useEffect(() => {
    lapsRef.current = laps;
  }, [laps]);

  useEffect(() => {
    showResetConfirmationRef.current = showResetConfirmation;
  }, [showResetConfirmation]);

  // Derived state
  const isPaused = !isRunning && elapsedTime > 0;
  const canReset = elapsedTime > 0 || laps.length > 0;

  // Cleanup requestAnimationFrame on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // START action
  const handleStart = useCallback(() => {
    if (isRunningRef.current) return; // Prevent multiple timer loops

    startTimeRef.current = performance.now();
    setIsRunning(true);

    const tick = () => {
      const now = performance.now();
      const currentElapsed = accumulatedTimeRef.current + (now - startTimeRef.current);
      setElapsedTime(currentElapsed);
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    animFrameIdRef.current = requestAnimationFrame(tick);
  }, []);

  // PAUSE action
  const handlePause = useCallback(() => {
    if (!isRunningRef.current) return;

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    const now = performance.now();
    const currentElapsed = accumulatedTimeRef.current + (now - startTimeRef.current);
    accumulatedTimeRef.current = currentElapsed;
    setElapsedTime(currentElapsed);
    setIsRunning(false);
  }, []);

  // LAP action
  const handleRecordLap = useCallback(() => {
    if (!isRunningRef.current) return;

    const now = performance.now();
    const currentElapsed = accumulatedTimeRef.current + (now - startTimeRef.current);

    setLaps((prevLaps) => {
      const prevTotal = prevLaps.length > 0 ? prevLaps[0].totalTime : 0;
      const lapTime = Math.max(0, currentElapsed - prevTotal);
      const newLap = {
        id: Date.now() + Math.random(),
        lapNumber: prevLaps.length + 1,
        lapTime,
        totalTime: currentElapsed,
      };
      return [newLap, ...prevLaps];
    });
  }, []);

  // RESET action
  const handleResetClick = useCallback(() => {
    if (elapsedTimeRef.current === 0 && lapsRef.current.length === 0) {
      return;
    }
    // Prompt confirmation dialog
    setShowResetConfirmation(true);
  }, []);

  const handleConfirmReset = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    accumulatedTimeRef.current = 0;
    startTimeRef.current = 0;
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setShowResetConfirmation(false);
  }, []);

  const handleCancelReset = useCallback(() => {
    setShowResetConfirmation(false);
  }, []);

  const handleClearLaps = useCallback(() => {
    setLaps([]);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept shortcuts when reset modal is open
      if (showResetConfirmationRef.current) return;

      // Ignore shortcuts if the user is typing in an input field
      const targetTag = e.target?.tagName?.toUpperCase();
      if (
        targetTag === 'INPUT' ||
        targetTag === 'TEXTAREA' ||
        targetTag === 'SELECT' ||
        e.target?.isContentEditable
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunningRef.current) {
          handlePause();
        } else {
          handleStart();
        }
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        if (isRunningRef.current) {
          handleRecordLap();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResetClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePause, handleStart, handleRecordLap, handleResetClick]);

  return (
    <div className="pulse-app">
      {/* Background Ambience Layers */}
      <div className="bg-gradient-canvas" aria-hidden="true" />
      <div className="bg-radial-glow bg-radial-blue" aria-hidden="true" />
      <div className="bg-radial-glow bg-radial-violet" aria-hidden="true" />
      <div className="bg-grid-overlay" aria-hidden="true" />

      {/* Main Content Layout */}
      <div className="app-shell">
        <Header />

        <main className="main-content">
          <div className="center-stage">
            {/* Stopwatch Central Display */}
            <StopwatchDisplay
              elapsedTime={elapsedTime}
              isRunning={isRunning}
              isPaused={isPaused}
            />

            {/* Controls Cluster */}
            <div className="controls-cluster">
              <Controls
                isRunning={isRunning}
                isPaused={isPaused}
                canReset={canReset}
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleResetClick}
              />
              <LapControls
                isRunning={isRunning}
                onRecordLap={handleRecordLap}
                lapCount={laps.length}
              />
            </div>
          </div>

          {/* Lap History Panel */}
          <div className="lap-stage">
            <LapList laps={laps} onClearLaps={handleClearLaps} />
          </div>
        </main>

        <KeyboardHints />
      </div>

      {/* Reset Confirmation Dialog */}
      <ResetConfirmation
        isOpen={showResetConfirmation}
        onCancel={handleCancelReset}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

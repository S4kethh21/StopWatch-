import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import PhoneFrame from './components/PhoneFrame';
import StopwatchDisplay from './components/StopwatchDisplay';
import StopwatchControls from './components/StopwatchControls';
import IntroPhone from './components/IntroPhone';
import ActivePhone from './components/ActivePhone';
import LapList from './components/LapList';
import ResetConfirmation from './components/ResetConfirmation';
import KeyboardHints from './components/KeyboardHints';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // References for timestamp delta calculation
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Synchronized state references for event listeners
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

  // Derived flags
  const isPaused = !isRunning && elapsedTime > 0;
  const canReset = elapsedTime > 0 || laps.length > 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // START / RESUME
  const handleStart = useCallback(() => {
    if (isRunningRef.current) return; // Prevent multiple loops

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

  // PAUSE
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

  // RECORD LAP
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

  // RESET TRIGGER
  const handleResetClick = useCallback(() => {
    if (elapsedTimeRef.current === 0 && lapsRef.current.length === 0) {
      return;
    }
    setShowResetConfirmation(true);
  }, []);

  // CONFIRM RESET
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

  // CANCEL RESET
  const handleCancelReset = useCallback(() => {
    setShowResetConfirmation(false);
  }, []);

  // CLEAR LAPS ONLY
  const handleClearLaps = useCallback(() => {
    setLaps([]);
  }, []);

  // Scroll actions
  const scrollToLaps = useCallback(() => {
    const el = document.getElementById('lap-history-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showResetConfirmationRef.current) return;

      const tag = e.target?.tagName?.toUpperCase();
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
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
    <div className="editorial-app-root">
      {/* Editorial Page Container */}
      <div className="editorial-viewport-wrapper">
        <Header onScrollToLaps={scrollToLaps} onScrollToTop={scrollToTop} />

        <main className="editorial-main-stage">
          {/* 3-Phone Showcase Hero Composition */}
          <div className="phones-trio-showcase">
            {/* Left Phone — Intro / Welcome */}
            <IntroPhone
              onStartStopwatch={handleStart}
              onViewLaps={scrollToLaps}
              isRunning={isRunning}
            />

            {/* Center Phone — Hero Functional Stopwatch */}
            <PhoneFrame
              headerLabel="STOPWATCH"
              variant="hero-center"
              className="phone-center-hero"
            >
              <div className="center-hero-content">
                <StopwatchDisplay
                  elapsedTime={elapsedTime}
                  isRunning={isRunning}
                  isPaused={isPaused}
                />
                <StopwatchControls
                  isRunning={isRunning}
                  isPaused={isPaused}
                  canReset={canReset}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleResetClick}
                  onRecordLap={handleRecordLap}
                  lapCount={laps.length}
                />
              </div>
            </PhoneFrame>

            {/* Right Phone — Active Lap Times */}
            <ActivePhone
              laps={laps}
              isRunning={isRunning}
              onPause={handlePause}
              onStart={handleStart}
              onRecordLap={handleRecordLap}
              elapsedTime={elapsedTime}
            />
          </div>

          {/* Minimalist Laps Section */}
          <LapList laps={laps} onClearLaps={handleClearLaps} />
        </main>

        <KeyboardHints />
      </div>

      {/* Inline Reset Confirmation Dialog */}
      <ResetConfirmation
        isOpen={showResetConfirmation}
        onCancel={handleCancelReset}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

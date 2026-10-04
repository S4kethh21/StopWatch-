import React, { useState, useRef, useEffect, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import StopwatchScreen from './components/StopwatchScreen';
import LapsScreen from './components/LapsScreen';
import ResetConfirmation from './components/ResetConfirmation';

export default function App() {
  // Screen-by-Screen Navigation state: 'home' | 'stopwatch' | 'laps'
  const [currentScreen, setCurrentScreen] = useState('home');

  // Core Stopwatch state
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // High-precision timing references (avoids state lag & drift)
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Synchronized state references for keyboard listeners
  const isRunningRef = useRef(false);
  const elapsedTimeRef = useRef(0);
  const lapsRef = useRef([]);
  const showResetConfirmationRef = useRef(false);
  const currentScreenRef = useRef('home');

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

  useEffect(() => {
    currentScreenRef.current = currentScreen;
  }, [currentScreen]);

  // Derived flags
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

  // START
  const handleStart = useCallback(() => {
    if (isRunningRef.current) return; // Prevent duplicate loops

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

  // TRIGGER RESET
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

  // Navigation handlers
  const handleNavigateHome = useCallback(() => {
    setCurrentScreen('home');
  }, []);

  const handleNavigateStopwatch = useCallback(() => {
    setCurrentScreen('stopwatch');
  }, []);

  const handleNavigateLaps = useCallback(() => {
    setCurrentScreen('laps');
  }, []);

  // Transition from Home CTA: switch to stopwatch screen and activate timer
  const handleStartFromHome = useCallback(() => {
    setCurrentScreen('stopwatch');
    if (!isRunningRef.current) {
      handleStart();
    }
  }, [handleStart]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept shortcuts when confirmation modal is open
      if (showResetConfirmationRef.current) return;

      // Ignore shortcuts if typing in input
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
        if (currentScreenRef.current === 'home') {
          handleStartFromHome();
        } else {
          if (isRunningRef.current) {
            handlePause();
          } else {
            handleStart();
          }
        }
      } else if (e.key === 'l' || e.key === 'L') {
        if (isRunningRef.current) {
          e.preventDefault();
          handleRecordLap();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        if (currentScreenRef.current === 'stopwatch') {
          e.preventDefault();
          handleResetClick();
        }
      } else if (e.key === 'Escape') {
        if (currentScreenRef.current === 'laps') {
          e.preventDefault();
          handleNavigateStopwatch();
        } else if (currentScreenRef.current === 'stopwatch' && !isRunningRef.current) {
          e.preventDefault();
          handleNavigateHome();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleStartFromHome,
    handleStart,
    handlePause,
    handleRecordLap,
    handleResetClick,
    handleNavigateStopwatch,
    handleNavigateHome,
  ]);

  return (
    <div className="stopwatch-app-root">
      {/* Screen Router Viewport */}
      <div className={`screen-view-framer view-${currentScreen}`}>
        {currentScreen === 'home' && (
          <HomeScreen onStartStopwatch={handleStartFromHome} />
        )}

        {currentScreen === 'stopwatch' && (
          <StopwatchScreen
            elapsedTime={elapsedTime}
            isRunning={isRunning}
            isPaused={isPaused}
            canReset={canReset}
            laps={laps}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleResetClick}
            onRecordLap={handleRecordLap}
            onNavigateHome={handleNavigateHome}
            onNavigateLaps={handleNavigateLaps}
          />
        )}

        {currentScreen === 'laps' && (
          <LapsScreen
            laps={laps}
            elapsedTime={elapsedTime}
            onClearLaps={handleClearLaps}
            onNavigateStopwatch={handleNavigateStopwatch}
          />
        )}
      </div>

      {/* Inline Reset Confirmation Modal */}
      <ResetConfirmation
        isOpen={showResetConfirmation}
        onCancel={handleCancelReset}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

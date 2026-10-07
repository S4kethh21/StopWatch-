import React, { useState, useRef, useEffect, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import StopwatchScreen from './components/StopwatchScreen';
import SessionHistoryView from './components/SessionHistoryView';
import ResetConfirmation from './components/ResetConfirmation';
import SettingsModal from './components/SettingsModal';
import InfoPanel from './components/InfoPanel';
import {
  getPersonalBest,
  setPersonalBest,
  getSessions,
  saveSession,
  deleteSession,
  getSettings,
  saveSettings,
} from './utils/storage';
import { soundEffects } from './utils/sound';

export default function App() {
  // Screen Navigation state: 'home' | 'stopwatch' | 'history'
  const [currentScreen, setCurrentScreen] = useState('home');

  // Modal / Drawer states
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // Focus Mode state
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Countdown state (null | 3 | 2 | 1 | 'GO')
  const [countdownValue, setCountdownValue] = useState(null);
  const countdownIntervalRef = useRef(null);

  // Preferences / Settings from localStorage
  const [settings, setSettings] = useState(() => getSettings());

  // Personal Best & Session History from localStorage
  const [personalBest, setPbState] = useState(() => getPersonalBest());
  const [isNewPersonalBest, setIsNewPersonalBest] = useState(false);
  const pbTimeoutRef = useRef(null);

  const [sessions, setSessions] = useState(() => getSessions());

  // Core Stopwatch state
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  // High-precision timing references (avoids state lag & drift)
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Synchronized state references for keyboard listeners
  const isRunningRef = useRef(false);
  const elapsedTimeRef = useRef(0);
  const lapsRef = useRef([]);
  const showResetConfirmationRef = useRef(false);
  const isInfoOpenRef = useRef(false);
  const isSettingsOpenRef = useRef(false);
  const isFocusModeRef = useRef(false);
  const currentScreenRef = useRef('home');
  const countdownActiveRef = useRef(false);

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
    isInfoOpenRef.current = isInfoOpen;
  }, [isInfoOpen]);

  useEffect(() => {
    isSettingsOpenRef.current = isSettingsOpen;
  }, [isSettingsOpen]);

  useEffect(() => {
    isFocusModeRef.current = isFocusMode;
  }, [isFocusMode]);

  useEffect(() => {
    currentScreenRef.current = currentScreen;
  }, [currentScreen]);

  useEffect(() => {
    countdownActiveRef.current = countdownValue !== null;
  }, [countdownValue]);

  // Derived flags
  const isPaused = !isRunning && elapsedTime > 0;
  const canReset = elapsedTime > 0 || laps.length > 0;

  // Cleanup requestAnimationFrame & intervals on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (pbTimeoutRef.current) {
        clearTimeout(pbTimeoutRef.current);
      }
    };
  }, []);

  // START RUNNER (Internal timestamp ticker)
  const runTimer = useCallback(() => {
    if (isRunningRef.current) return;

    startTimeRef.current = performance.now();
    setIsRunning(true);
    soundEffects.start(settings.sound);

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
  }, [settings.sound]);

  // CANCEL COUNTDOWN (if in progress)
  const cancelCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownValue(null);
  }, []);

  // START (With optional countdown check)
  const handleStart = useCallback(() => {
    if (isRunningRef.current) return;

    // If countdown is active, cancel it
    if (countdownActiveRef.current) {
      cancelCountdown();
      return;
    }

    // Check if countdown is enabled in settings and stopwatch is starting fresh or resumed
    const hasCountdown = settings.countdown === '3' || settings.countdown === '5';

    if (hasCountdown && elapsedTimeRef.current === 0) {
      let count = parseInt(settings.countdown, 10);
      setCountdownValue(count);
      soundEffects.countdownTick(settings.sound);

      countdownIntervalRef.current = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setCountdownValue(count);
          soundEffects.countdownTick(settings.sound);
        } else if (count === 0) {
          setCountdownValue('GO');
          soundEffects.countdownGo(settings.sound);
        } else {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          setCountdownValue(null);
          runTimer();
        }
      }, 1000);
      return;
    }

    runTimer();
  }, [settings.countdown, settings.sound, runTimer, cancelCountdown]);

  // PAUSE
  const handlePause = useCallback(() => {
    if (countdownActiveRef.current) {
      cancelCountdown();
      return;
    }

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
    soundEffects.pause(settings.sound);
  }, [settings.sound, cancelCountdown]);

  // RECORD LAP (Updates right-side history & Personal Best)
  const handleRecordLap = useCallback(() => {
    if (!isRunningRef.current) return;

    const now = performance.now();
    const currentElapsed = accumulatedTimeRef.current + (now - startTimeRef.current);

    soundEffects.lap(settings.sound);

    setLaps((prevLaps) => {
      const prevTotal = prevLaps.length > 0 ? prevLaps[0].totalTime : 0;
      const lapTime = Math.max(0, currentElapsed - prevTotal);
      const newLap = {
        id: Date.now() + Math.random(),
        lapNumber: prevLaps.length + 1,
        lapTime,
        totalTime: currentElapsed,
      };

      // Check Personal Best
      const currentPb = getPersonalBest();
      if (currentPb === null || lapTime < currentPb) {
        setPersonalBest(lapTime);
        setPbState(lapTime);
        setIsNewPersonalBest(true);

        if (pbTimeoutRef.current) clearTimeout(pbTimeoutRef.current);
        pbTimeoutRef.current = setTimeout(() => {
          setIsNewPersonalBest(false);
        }, 4000);
      }

      return [newLap, ...prevLaps];
    });
  }, [settings.sound]);

  // TRIGGER RESET
  const handleResetClick = useCallback(() => {
    if (countdownActiveRef.current) {
      cancelCountdown();
      return;
    }

    // If no meaningful data recorded, do nothing
    if (elapsedTimeRef.current === 0 && lapsRef.current.length === 0) {
      return;
    }

    // Open Save Session Confirmation
    setShowResetConfirmation(true);
  }, [cancelCountdown]);

  // CONFIRM RESET & DISCARD SESSION
  const handleDiscardSession = useCallback(() => {
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
    soundEffects.reset(settings.sound);
  }, [settings.sound]);

  // CONFIRM RESET & SAVE SESSION
  const handleSaveAndResetSession = useCallback(() => {
    const totalDuration = elapsedTimeRef.current;
    const currentLaps = lapsRef.current;

    let fastest = null;
    let slowest = null;
    let sum = 0;

    if (currentLaps.length > 0) {
      fastest = currentLaps[0].lapTime;
      slowest = currentLaps[0].lapTime;
      currentLaps.forEach((l) => {
        sum += l.lapTime;
        if (l.lapTime < fastest) fastest = l.lapTime;
        if (l.lapTime > slowest) slowest = l.lapTime;
      });
    }

    const averageLap = currentLaps.length > 0 ? sum / currentLaps.length : null;

    const newSession = {
      timestamp: Date.now(),
      date: new Date().toISOString(),
      totalDuration,
      totalLaps: currentLaps.length,
      fastestLap: fastest,
      slowestLap: slowest,
      averageLap,
      laps: [...currentLaps],
    };

    const updatedSessions = saveSession(newSession);
    setSessions(updatedSessions);

    // Reset stopwatch to zero
    handleDiscardSession();
  }, [handleDiscardSession]);

  // CANCEL RESET
  const handleCancelReset = useCallback(() => {
    setShowResetConfirmation(false);
  }, []);

  // CLEAR LAPS ONLY (Keeps current stopwatch elapsed time running!)
  const handleClearLaps = useCallback(() => {
    setLaps([]);
  }, []);

  // DELETE A SAVED SESSION
  const handleDeleteSession = useCallback((sessionId) => {
    const updated = deleteSession(sessionId);
    setSessions(updated);
  }, []);

  // UPDATE SETTINGS
  const handleUpdateSettings = useCallback((newSettings) => {
    const updated = saveSettings(newSettings);
    setSettings(updated);
  }, []);

  // TOGGLE FOCUS MODE
  const handleToggleFocus = useCallback(() => {
    setIsFocusMode((prev) => !prev);
  }, []);

  // Screen Navigation handlers
  const handleNavigateHome = useCallback(() => {
    setCurrentScreen('home');
    setIsFocusMode(false);
  }, []);

  // NAVIGATE TO STOPWATCH (DOES NOT START TIMER!)
  const handleNavigateStopwatch = useCallback(() => {
    setCurrentScreen('stopwatch');
  }, []);

  // NAVIGATE TO HISTORY
  const handleNavigateHistory = useCallback(() => {
    setCurrentScreen('history');
    setIsFocusMode(false);
  }, []);

  // Info & Settings Modals
  const handleOpenInfo = useCallback(() => {
    setIsInfoOpen(true);
  }, []);

  const handleCloseInfo = useCallback(() => {
    setIsInfoOpen(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  // KEYBOARD SHORTCUTS HANDLER
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. If Info panel is open, let Escape or I key close it
      if (isInfoOpenRef.current) {
        if (e.key === 'Escape' || e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          handleCloseInfo();
        }
        return;
      }

      // 2. If Settings modal is open, let Escape or S key close it
      if (isSettingsOpenRef.current) {
        if (e.key === 'Escape' || e.key === 's' || e.key === 'S') {
          e.preventDefault();
          handleCloseSettings();
        }
        return;
      }

      // 3. If Reset / Save dialog is open, let Escape cancel it
      if (showResetConfirmationRef.current) {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleCancelReset();
        }
        return;
      }

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

      // GLOBAL: I KEY opens About / Info
      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        handleOpenInfo();
        return;
      }

      // SCREEN: HOME
      if (currentScreenRef.current === 'home') {
        // ENTER KEY: Navigate to Stopwatch ONLY (never starts timer)
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNavigateStopwatch();
          return;
        }
      }

      // SCREEN: HISTORY
      if (currentScreenRef.current === 'history') {
        if (e.key === 'Escape' || e.key === 'h' || e.key === 'H') {
          e.preventDefault();
          handleNavigateStopwatch();
          return;
        }
      }

      // SCREEN: STOPWATCH
      if (currentScreenRef.current === 'stopwatch') {
        // S KEY: Open Settings
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          handleOpenSettings();
          return;
        }

        // H KEY: Open Session History
        if (e.key === 'h' || e.key === 'H') {
          e.preventDefault();
          handleNavigateHistory();
          return;
        }

        // F KEY: Toggle Focus Mode
        if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          handleToggleFocus();
          return;
        }

        // SPACE KEY: Start / Pause toggle
        if (e.code === 'Space') {
          e.preventDefault();
          if (isRunningRef.current || countdownActiveRef.current) {
            handlePause();
          } else {
            handleStart();
          }
          return;
        }

        // L KEY: Record Lap (while running)
        if (e.key === 'l' || e.key === 'L') {
          if (isRunningRef.current) {
            e.preventDefault();
            handleRecordLap();
          }
          return;
        }

        // R KEY: Reset / Save dialog
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          handleResetClick();
          return;
        }

        // ESCAPE KEY: Exit focus mode, or return Home if timer stopped
        if (e.key === 'Escape') {
          e.preventDefault();
          if (isFocusModeRef.current) {
            handleToggleFocus();
          } else if (!isRunningRef.current && !countdownActiveRef.current) {
            handleNavigateHome();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleCloseInfo,
    handleCloseSettings,
    handleCancelReset,
    handleOpenInfo,
    handleOpenSettings,
    handleNavigateStopwatch,
    handleNavigateHistory,
    handleNavigateHome,
    handleToggleFocus,
    handleStart,
    handlePause,
    handleRecordLap,
    handleResetClick,
  ]);

  return (
    <div className={`stopwatch-app-root motion-${settings.reducedMotion}`}>
      {/* Screen Router Viewport */}
      <div className={`screen-view-framer view-${currentScreen}`}>
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigateStopwatch={handleNavigateStopwatch}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {currentScreen === 'stopwatch' && (
          <StopwatchScreen
            elapsedTime={elapsedTime}
            isRunning={isRunning}
            isPaused={isPaused}
            canReset={canReset}
            laps={laps}
            personalBest={personalBest}
            isNewPersonalBest={isNewPersonalBest}
            countdownValue={countdownValue}
            isFocusMode={isFocusMode}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleResetClick}
            onRecordLap={handleRecordLap}
            onClearLaps={handleClearLaps}
            onToggleFocus={handleToggleFocus}
            onNavigateHome={handleNavigateHome}
            onNavigateHistory={handleNavigateHistory}
            onOpenSettings={handleOpenSettings}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {currentScreen === 'history' && (
          <SessionHistoryView
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
            onBackToStopwatch={handleNavigateStopwatch}
            onOpenInfo={handleOpenInfo}
          />
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onClose={handleCloseSettings}
      />

      {/* Info / About Drawer Panel */}
      <InfoPanel
        isOpen={isInfoOpen}
        onClose={handleCloseInfo}
      />

      {/* Save Session / Reset Modal */}
      <ResetConfirmation
        isOpen={showResetConfirmation}
        elapsedTime={elapsedTime}
        laps={laps}
        onCancel={handleCancelReset}
        onDiscard={handleDiscardSession}
        onSaveAndReset={handleSaveAndResetSession}
      />
    </div>
  );
}

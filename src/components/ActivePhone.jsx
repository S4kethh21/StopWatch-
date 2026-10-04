import React, { useMemo } from 'react';
import PhoneFrame from './PhoneFrame';
import { Pause, Play, Flag, Zap } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

export default function ActivePhone({
  laps,
  isRunning,
  onPause,
  onStart,
  onRecordLap,
  elapsedTime,
}) {
  // Determine fastest lap
  const fastestLapId = useMemo(() => {
    if (!laps || laps.length < 2) return null;
    let minTime = Infinity;
    let id = null;
    for (const lap of laps) {
      if (lap.lapTime < minTime) {
        minTime = lap.lapTime;
        id = lap.id;
      }
    }
    return id;
  }, [laps]);

  // Fallback demo laps for visual mockup fidelity if user hasn't recorded laps yet
  const displayLaps = useMemo(() => {
    if (laps && laps.length > 0) return laps.slice(0, 5);
    return [
      { id: 'demo-3', lapNumber: 3, lapTime: 7210, totalTime: 25930, isDemo: true },
      { id: 'demo-2', lapNumber: 2, lapTime: 5140, totalTime: 18720, isDemo: true },
      { id: 'demo-1', lapNumber: 1, lapTime: 13580, totalTime: 13580, isDemo: true },
    ];
  }, [laps]);

  return (
    <PhoneFrame headerLabel="TIMES" variant="active" className="phone-active">
      <div className="active-screen-content">
        {/* Top Active Indicator */}
        <div className="times-top-bar">
          <span className="times-badge">
            <span className={`times-dot ${isRunning ? 'pulse-yellow' : ''}`} />
            {isRunning ? 'ACTIVE SPLITS' : (laps.length > 0 ? 'LOGGED SPLITS' : 'SPLIT PREVIEW')}
          </span>
          <span className="times-total-time">
            {formatTime(elapsedTime)}
          </span>
        </div>

        {/* Lap Times Feed List */}
        <div className="active-laps-feed">
          {displayLaps.map((lap, index) => {
            const isFastest =
              (!lap.isDemo && lap.id === fastestLapId) ||
              (lap.isDemo && lap.lapNumber === 2);
            const isLatest = index === 0;

            return (
              <div
                key={lap.id}
                className={`times-lap-item ${isFastest ? 'item-fastest-yellow' : ''} ${
                  isLatest && isRunning ? 'item-current-active' : ''
                }`}
              >
                <div className="item-meta">
                  <span className="item-lap-num">
                    LAP {String(lap.lapNumber).padStart(2, '0')}
                  </span>
                  {isFastest && (
                    <span className="item-fastest-chip">
                      <Zap size={10} /> FASTEST
                    </span>
                  )}
                  {lap.isDemo && <span className="item-demo-chip">SAMPLE</span>}
                </div>
                <div className="item-times">
                  <span className="item-lap-time">{formatTime(lap.lapTime)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Controls Matching Reference */}
        <div className="active-phone-controls">
          <div className="controls-row-primary">
            {isRunning ? (
              <button
                type="button"
                className="btn-phone-primary btn-pause-yellow"
                onClick={onPause}
                aria-label="Pause stopwatch from times screen"
              >
                <Pause size={16} fill="currentColor" />
                <span>PAUSE</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-phone-primary btn-start-yellow"
                onClick={onStart}
                aria-label="Start stopwatch from times screen"
              >
                <Play size={16} fill="currentColor" />
                <span>RESUME</span>
              </button>
            )}
          </div>

          <div className="controls-row-secondary">
            <button
              type="button"
              className="btn-phone-secondary btn-lap-outline"
              onClick={onRecordLap}
              disabled={!isRunning}
              aria-label="Record lap from times screen"
            >
              <Flag size={14} />
              <span>LAP</span>
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

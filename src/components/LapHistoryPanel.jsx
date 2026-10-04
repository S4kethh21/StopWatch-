import React, { useState, useMemo } from 'react';
import { Trash2, AlertTriangle, Zap } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

export default function LapHistoryPanel({ laps, onClearLaps }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Compute fastest & slowest laps dynamically
  const { fastestLap, slowestLap, hasMultipleLaps, totalLapsCount } = useMemo(() => {
    if (!laps || laps.length === 0) {
      return {
        fastestLap: null,
        slowestLap: null,
        hasMultipleLaps: false,
        totalLapsCount: 0,
      };
    }

    if (laps.length === 1) {
      return {
        fastestLap: laps[0],
        slowestLap: laps[0],
        hasMultipleLaps: false,
        totalLapsCount: 1,
      };
    }

    let fastest = laps[0];
    let slowest = laps[0];

    for (let i = 1; i < laps.length; i++) {
      if (laps[i].lapTime < fastest.lapTime) {
        fastest = laps[i];
      }
      if (laps[i].lapTime > slowest.lapTime) {
        slowest = laps[i];
      }
    }

    return {
      fastestLap: fastest,
      slowestLap: slowest,
      hasMultipleLaps: fastest.id !== slowest.id,
      totalLapsCount: laps.length,
    };
  }, [laps]);

  const handleConfirmClear = () => {
    onClearLaps();
    setShowClearConfirm(false);
  };

  const hasLaps = totalLapsCount > 0;

  return (
    <aside className="lap-history-panel" aria-label="Lap History">
      {/* Panel Header */}
      <div className="lap-panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">LAP HISTORY</h2>
          <span className="panel-subtitle">RECORDED TIMES</span>
        </div>
        {hasLaps && (
          <span className="panel-count-tag" aria-label={`${totalLapsCount} laps`}>
            {String(totalLapsCount).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Laps Content */}
      <div className="lap-panel-body">
        {hasLaps ? (
          <div className="lap-scroll-container">
            <div className="lap-list-vertical" role="list">
              {laps.map((lap) => {
                const isFastest = hasMultipleLaps && lap.id === fastestLap?.id;

                return (
                  <div
                    key={lap.id}
                    className={`lap-item-row ${isFastest ? 'is-fastest-row' : ''}`}
                    role="listitem"
                  >
                    <div className="lap-row-left">
                      <span className="lap-label">
                        LAP {String(lap.lapNumber).padStart(2, '0')}
                      </span>
                      {isFastest && (
                        <span className="badge-fastest-yellow" title="Fastest recorded lap">
                          <Zap size={9} /> FASTEST
                        </span>
                      )}
                    </div>
                    <div className="lap-row-right">
                      <span className={`lap-time-digits ${isFastest ? 'text-yellow' : ''}`}>
                        {formatTime(lap.lapTime)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small Statistics Area below lap list */}
            <div className="lap-stats-area">
              <div className="stat-stat-item">
                <span className="stat-metric-label">FASTEST</span>
                <span className="stat-metric-value text-yellow">
                  {fastestLap ? formatTime(fastestLap.lapTime) : '--:--:--.--'}
                </span>
              </div>

              <div className="stat-stat-item">
                <span className="stat-metric-label">SLOWEST</span>
                <span className="stat-metric-value text-white">
                  {slowestLap && hasMultipleLaps
                    ? formatTime(slowestLap.lapTime)
                    : (fastestLap ? formatTime(fastestLap.lapTime) : '--:--:--.--')}
                </span>
              </div>

              <div className="stat-stat-item">
                <span className="stat-metric-label">TOTAL LAPS</span>
                <span className="stat-metric-value text-white">
                  {String(totalLapsCount).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="lap-empty-state">
            <p className="empty-state-title">No laps recorded yet.</p>
            <p className="empty-state-hint">
              Start the stopwatch and press <kbd>L</kbd> or <span className="text-yellow">LAP</span> to record a time.
            </p>
          </div>
        )}
      </div>

      {/* Clear Laps Action with Inline Confirmation */}
      {hasLaps && (
        <div className="lap-panel-footer">
          {!showClearConfirm ? (
            <button
              type="button"
              className="btn-clear-laps-action"
              onClick={() => setShowClearConfirm(true)}
              aria-label="Clear recorded lap history"
            >
              <Trash2 size={13} />
              <span>CLEAR LAPS</span>
            </button>
          ) : (
            <div className="inline-confirm-box" role="alert">
              <div className="confirm-prompt">
                <AlertTriangle size={14} className="text-yellow" />
                <span>CLEAR ALL LAPS?</span>
              </div>
              <div className="confirm-btn-group">
                <button
                  type="button"
                  className="btn-confirm-cancel"
                  onClick={() => setShowClearConfirm(false)}
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  className="btn-confirm-clear"
                  onClick={handleConfirmClear}
                >
                  CLEAR
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

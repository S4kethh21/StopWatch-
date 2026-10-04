import React, { useMemo } from 'react';
import { Trash2, Zap, Clock } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

export default function LapList({ laps, onClearLaps }) {
  // Determine fastest and slowest laps
  const { fastestLap, slowestLap, hasComparison } = useMemo(() => {
    if (!laps || laps.length === 0) {
      return { fastestLap: null, slowestLap: null, hasComparison: false };
    }

    if (laps.length === 1) {
      return {
        fastestLap: laps[0],
        slowestLap: laps[0],
        hasComparison: false,
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
      hasComparison: fastest.id !== slowest.id,
    };
  }, [laps]);

  const hasLaps = laps && laps.length > 0;

  return (
    <section className="editorial-laps-section" id="lap-history-section" aria-label="Lap History">
      <div className="laps-container">
        {/* Section Header */}
        <div className="laps-header">
          <div className="laps-title-wrap">
            <h3 className="laps-title">LAPS</h3>
            {hasLaps && <span className="laps-counter">{laps.length}</span>}
          </div>

          {hasLaps && (
            <button
              type="button"
              className="btn-clear-laps-editorial"
              onClick={onClearLaps}
              aria-label="Clear all recorded laps"
            >
              <Trash2 size={12} />
              <span>CLEAR LAPS</span>
            </button>
          )}
        </div>

        {/* Laps List / Table */}
        {hasLaps ? (
          <div className="laps-table-wrapper">
            <div className="laps-table-header">
              <span className="col-th col-id">#</span>
              <span className="col-th col-lap">LAP TIME</span>
              <span className="col-th col-total">TOTAL TIME</span>
            </div>

            <div className="laps-rows-list">
              {laps.map((lap) => {
                const isFastest = hasComparison && lap.id === fastestLap?.id;
                const isSlowest = hasComparison && lap.id === slowestLap?.id;

                return (
                  <div
                    key={lap.id}
                    className={`lap-row-editorial ${isFastest ? 'is-fastest' : ''} ${
                      isSlowest ? 'is-slowest' : ''
                    }`}
                  >
                    <div className="row-col col-id">
                      <span className="lap-num-badge">
                        LAP {String(lap.lapNumber).padStart(2, '0')}
                      </span>
                      {isFastest && (
                        <span className="lap-pill pill-yellow">
                          <Zap size={9} /> FASTEST
                        </span>
                      )}
                      {isSlowest && <span className="lap-pill pill-gray">SLOWEST</span>}
                    </div>

                    <div className="row-col col-lap">
                      <span className="lap-time-value">{formatTime(lap.lapTime)}</span>
                    </div>

                    <div className="row-col col-total">
                      <span className="total-time-value">{formatTime(lap.totalTime)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance Analytics below table */}
            <div className="laps-summary-footer">
              <div className="summary-stat-box box-fastest">
                <span className="summary-label">FASTEST LAP</span>
                <span className="summary-value text-yellow">
                  {formatTime(fastestLap.lapTime)}
                  <span className="summary-sub">#{String(fastestLap.lapNumber).padStart(2, '0')}</span>
                </span>
              </div>

              <div className="summary-stat-box box-slowest">
                <span className="summary-label">SLOWEST LAP</span>
                <span className="summary-value text-white">
                  {formatTime(slowestLap.lapTime)}
                  <span className="summary-sub">#{String(slowestLap.lapNumber).padStart(2, '0')}</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="laps-empty-editorial">
            <Clock size={28} className="empty-clock-icon" strokeWidth={1.5} />
            <p className="empty-primary">No laps recorded yet</p>
            <p className="empty-secondary">
              Press <kbd>L</kbd> or tap the LAP button while running to record splits.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Trash2, Zap, Clock, AlertTriangle } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

export default function LapsScreen({
  laps,
  elapsedTime,
  onClearLaps,
  onNavigateStopwatch,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Compute Statistics
  const { fastestLap, slowestLap, hasComparison, totalLapsCount } = useMemo(() => {
    if (!laps || laps.length === 0) {
      return {
        fastestLap: null,
        slowestLap: null,
        hasComparison: false,
        totalLapsCount: 0,
      };
    }

    if (laps.length === 1) {
      return {
        fastestLap: laps[0],
        slowestLap: laps[0],
        hasComparison: false,
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
      hasComparison: fastest.id !== slowest.id,
      totalLapsCount: laps.length,
    };
  }, [laps]);

  const handleConfirmClear = () => {
    onClearLaps();
    setShowClearConfirm(false);
  };

  return (
    <div className="screen-container laps-screen-view">
      {/* Top Editorial Bar */}
      <header className="screen-header laps-header" role="banner">
        <button
          type="button"
          className="btn-back-nav"
          onClick={onNavigateStopwatch}
          aria-label="Return to stopwatch timer"
        >
          <ArrowLeft size={16} />
          <span>STOPWATCH</span>
        </button>

        <div className="header-center-title">
          <span className="brand-text-primary">LAPS</span>
        </div>

        <div className="header-meta-right">
          <span className="spec-text-yellow">TASK 02</span>
          <span className="spec-text-muted">RESULTS</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="laps-main-stage">
        <div className="laps-stage-inner">
          {/* Main Editorial Heading */}
          <div className="laps-hero-title-group">
            <h1 className="laps-heading-main">Your Times</h1>
            <p className="laps-heading-sub">
              Detailed split intervals, pace benchmarks, and session totals.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="editorial-stats-grid" aria-label="Timing Statistics">
            <div className="stat-grid-cell">
              <span className="stat-cell-label">TOTAL LAPS</span>
              <span className="stat-cell-value">
                {String(totalLapsCount).padStart(2, '0')}
              </span>
            </div>

            <div className="stat-grid-cell">
              <span className="stat-cell-label">FASTEST LAP</span>
              <span className="stat-cell-value text-yellow">
                {fastestLap ? formatTime(fastestLap.lapTime) : '--:--:--.--'}
              </span>
              {fastestLap && (
                <span className="stat-cell-sub">
                  #{String(fastestLap.lapNumber).padStart(2, '0')}
                </span>
              )}
            </div>

            <div className="stat-grid-cell">
              <span className="stat-cell-label">SLOWEST LAP</span>
              <span className="stat-cell-value">
                {slowestLap && hasComparison ? formatTime(slowestLap.lapTime) : (fastestLap ? formatTime(fastestLap.lapTime) : '--:--:--.--')}
              </span>
              {slowestLap && hasComparison && (
                <span className="stat-cell-sub">
                  #{String(slowestLap.lapNumber).padStart(2, '0')}
                </span>
              )}
            </div>

            <div className="stat-grid-cell">
              <span className="stat-cell-label">TOTAL TIME</span>
              <span className="stat-cell-value text-white">
                {formatTime(elapsedTime)}
              </span>
            </div>
          </div>

          {/* Lap History List */}
          <section className="laps-list-section" aria-label="Recorded Laps">
            <div className="laps-list-header">
              <span className="laps-list-title">LAP HISTORY</span>
              {totalLapsCount > 0 && !showClearConfirm && (
                <button
                  type="button"
                  className="btn-trigger-clear"
                  onClick={() => setShowClearConfirm(true)}
                  aria-label="Clear all recorded laps"
                >
                  <Trash2 size={13} />
                  <span>CLEAR LAPS</span>
                </button>
              )}
            </div>

            {/* Inline Confirmation for Clear Laps (No browser alert) */}
            {showClearConfirm && (
              <div className="inline-clear-confirm" role="alert">
                <div className="confirm-copy">
                  <AlertTriangle size={15} className="text-yellow" />
                  <span>Clear all recorded laps?</span>
                </div>
                <div className="confirm-buttons">
                  <button
                    type="button"
                    className="btn-inline-cancel"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    className="btn-inline-clear"
                    onClick={handleConfirmClear}
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            )}

            {/* Rows List */}
            {totalLapsCount > 0 ? (
              <div className="laps-records-table">
                <div className="records-header-row">
                  <span className="rec-col rec-col-num">#</span>
                  <span className="rec-col rec-col-split">LAP TIME</span>
                  <span className="rec-col rec-col-total">TOTAL TIME</span>
                </div>

                <div className="records-body">
                  {laps.map((lap) => {
                    const isFastest = hasComparison && lap.id === fastestLap?.id;
                    const isSlowest = hasComparison && lap.id === slowestLap?.id;

                    return (
                      <div
                        key={lap.id}
                        className={`record-row ${isFastest ? 'row-fastest-highlight' : ''}`}
                      >
                        <div className="rec-col rec-col-num">
                          <span className="lap-index">
                            {String(lap.lapNumber).padStart(2, '0')}
                          </span>
                          {isFastest && (
                            <span className="pill-badge-yellow">
                              <Zap size={9} /> FASTEST
                            </span>
                          )}
                          {isSlowest && (
                            <span className="pill-badge-gray">SLOWEST</span>
                          )}
                        </div>

                        <div className="rec-col rec-col-split">
                          <span className={`time-text ${isFastest ? 'text-yellow' : ''}`}>
                            {formatTime(lap.lapTime)}
                          </span>
                        </div>

                        <div className="rec-col rec-col-total">
                          <span className="time-text text-muted">
                            {formatTime(lap.totalTime)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="laps-empty-box">
                <Clock size={32} className="empty-clock" strokeWidth={1.5} />
                <p className="empty-heading">No laps recorded</p>
                <p className="empty-subtext">
                  Press <kbd>L</kbd> or tap LAP while the stopwatch is running to record splits.
                </p>
              </div>
            )}
          </section>

          {/* Bottom Screen Actions */}
          <div className="laps-screen-footer-actions">
            <button
              type="button"
              className="btn-back-to-timer"
              onClick={onNavigateStopwatch}
              aria-label="Return to stopwatch"
            >
              <ArrowLeft size={16} />
              <span>BACK TO STOPWATCH</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

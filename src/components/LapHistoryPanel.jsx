import React, { useState, useMemo } from 'react';
import { Trash2, AlertTriangle, Zap, Award } from 'lucide-react';
import { formatTime, formatLapTime } from '../utils/formatTime';

export default function LapHistoryPanel({
  laps = [],
  elapsedTime = 0,
  personalBest = null,
  isNewPersonalBest = false,
  onClearLaps,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Dynamic calculations: Fastest, Slowest, Average, Longest (for timeline bar)
  const stats = useMemo(() => {
    if (!laps || laps.length === 0) {
      return {
        fastestLap: null,
        slowestLap: null,
        averageLapTime: 0,
        longestLapTime: 0,
        totalLapsCount: 0,
        totalLapTime: 0,
      };
    }

    let fastest = laps[0];
    let slowest = laps[0];
    let sum = 0;
    let longest = laps[0].lapTime;

    for (let i = 0; i < laps.length; i++) {
      const l = laps[i];
      sum += l.lapTime;
      if (l.lapTime < fastest.lapTime) fastest = l;
      if (l.lapTime > slowest.lapTime) slowest = l;
      if (l.lapTime > longest) longest = l.lapTime;
    }

    const avg = sum / laps.length;

    return {
      fastestLap: fastest,
      slowestLap: slowest,
      averageLapTime: avg,
      longestLapTime: Math.max(longest, 1),
      totalLapsCount: laps.length,
      totalLapTime: sum,
    };
  }, [laps]);

  const handleConfirmClear = () => {
    onClearLaps();
    setShowClearConfirm(false);
  };

  const hasLaps = stats.totalLapsCount > 0;
  const hasMultipleLaps = stats.totalLapsCount > 1;

  return (
    <aside className="lap-history-panel" aria-label="Lap History and Session Statistics">
      {/* Panel Header */}
      <div className="lap-panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">LAP HISTORY</h2>
          <span className="panel-subtitle">RECORDED TIMES</span>
        </div>
        {hasLaps && (
          <span className="panel-count-tag" aria-label={`${stats.totalLapsCount} laps recorded`}>
            {String(stats.totalLapsCount).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Personal Best Persistent Banner */}
      {personalBest !== null && (
        <div className={`personal-best-strip ${isNewPersonalBest ? 'strip-celebrate' : ''}`}>
          <div className="pb-left">
            <Award size={13} className="text-yellow" />
            <span className="pb-label">
              {isNewPersonalBest ? 'NEW PERSONAL BEST' : 'PERSONAL BEST'}
            </span>
          </div>
          <span className="pb-value text-yellow">
            {formatLapTime(personalBest)}
          </span>
        </div>
      )}

      {/* Laps List & Visual Timeline */}
      <div className="lap-panel-body">
        {hasLaps ? (
          <div className="lap-scroll-container">
            <div className="lap-list-vertical" role="list">
              {laps.map((lap) => {
                const isFastest = hasMultipleLaps && lap.id === stats.fastestLap?.id;
                const isSlowest = hasMultipleLaps && lap.id === stats.slowestLap?.id;
                
                // Visual bar width relative to longest recorded lap
                const barPercent = Math.min(
                  100,
                  Math.max(8, Math.round((lap.lapTime / stats.longestLapTime) * 100))
                );

                return (
                  <div
                    key={lap.id}
                    className={`lap-item-row ${isFastest ? 'is-fastest-row' : ''} ${
                      isSlowest ? 'is-slowest-row' : ''
                    }`}
                    role="listitem"
                  >
                    {/* Lap Number & Badges */}
                    <div className="lap-row-left">
                      <span className="lap-label">
                        LAP {String(lap.lapNumber).padStart(2, '0')}
                      </span>
                      {isFastest && (
                        <span className="badge-fastest-yellow" title="Fastest session lap">
                          <Zap size={9} /> FASTEST
                        </span>
                      )}
                    </div>

                    {/* Subtle Visual Timeline Bar */}
                    <div className="lap-timeline-track" aria-hidden="true">
                      <div
                        className={`lap-timeline-bar ${isFastest ? 'bar-fastest' : ''}`}
                        style={{ width: `${barPercent}%` }}
                      />
                    </div>

                    {/* Formatted Lap Duration */}
                    <div className="lap-row-right">
                      <span
                        className={`lap-time-digits ${
                          isFastest ? 'text-yellow' : isSlowest ? 'text-muted' : 'text-white'
                        }`}
                      >
                        {formatLapTime(lap.lapTime)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Session Statistics Block */}
            <div className="session-statistics-module">
              <div className="session-stats-header">
                <span className="session-stats-pretitle">SESSION</span>
                <span className="session-stats-title">STATISTICS</span>
              </div>

              <div className="session-stats-grid">
                <div className="stat-stat-item">
                  <span className="stat-metric-label">TOTAL LAPS</span>
                  <span className="stat-metric-value text-white">
                    {String(stats.totalLapsCount).padStart(2, '0')}
                  </span>
                </div>

                <div className="stat-stat-item">
                  <span className="stat-metric-label">TOTAL TIME</span>
                  <span className="stat-metric-value text-white">
                    {formatTime(elapsedTime || stats.totalLapTime)}
                  </span>
                </div>

                <div className="stat-stat-item">
                  <span className="stat-metric-label">FASTEST</span>
                  <span className="stat-metric-value text-yellow">
                    {stats.fastestLap ? formatLapTime(stats.fastestLap.lapTime) : '--:--.--'}
                  </span>
                </div>

                <div className="stat-stat-item">
                  <span className="stat-metric-label">SLOWEST</span>
                  <span className="stat-metric-value text-muted">
                    {stats.slowestLap ? formatLapTime(stats.slowestLap.lapTime) : '--:--.--'}
                  </span>
                </div>

                <div className="stat-stat-item stat-item-wide">
                  <span className="stat-metric-label">AVERAGE</span>
                  <span className="stat-metric-value text-white">
                    {stats.averageLapTime > 0 ? formatLapTime(stats.averageLapTime) : '--:--.--'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lap-empty-state">
            <p className="empty-state-title">No laps recorded yet.</p>
            <p className="empty-state-hint">
              Start timing and press <kbd>L</kbd> or <span className="text-yellow">LAP</span> to record a split.
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
              aria-label="Clear recorded lap history without resetting stopwatch"
            >
              <Trash2 size={13} />
              <span>CLEAR LAPS</span>
            </button>
          ) : (
            <div className="inline-confirm-box" role="alert">
              <div className="confirm-prompt">
                <AlertTriangle size={14} className="text-yellow" />
                <span>CLEAR LAPS ONLY?</span>
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

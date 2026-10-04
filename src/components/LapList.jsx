import React, { useMemo } from 'react';
import { Trash2, Timer, Zap, Award, Clock } from 'lucide-react';
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
    <div className="lap-panel" aria-label="Lap history">
      {/* Panel Header */}
      <div className="lap-panel-header">
        <div className="lap-panel-title-group">
          <Clock size={16} className="lap-header-icon" />
          <h2 className="lap-panel-title">LAPS</h2>
          {hasLaps && (
            <span className="lap-count-tag" aria-label={`${laps.length} total laps`}>
              {laps.length}
            </span>
          )}
        </div>

        {/* Clear Laps Action */}
        {hasLaps && (
          <button
            type="button"
            className="btn-clear-laps"
            onClick={onClearLaps}
            aria-label="Clear lap history"
          >
            <Trash2 size={13} />
            <span>CLEAR LAPS</span>
          </button>
        )}
      </div>

      {/* Lap Table or Empty State */}
      <div className="lap-table-wrapper">
        {hasLaps ? (
          <div className="lap-table-container">
            <table className="lap-table">
              <thead>
                <tr>
                  <th scope="col" className="col-num">#</th>
                  <th scope="col" className="col-lap-time">LAP TIME</th>
                  <th scope="col" className="col-total-time">TOTAL TIME</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((lap) => {
                  const isFastest = hasComparison && lap.id === fastestLap?.id;
                  const isSlowest = hasComparison && lap.id === slowestLap?.id;

                  let rowModifier = '';
                  if (isFastest) rowModifier = 'row-fastest';
                  else if (isSlowest) rowModifier = 'row-slowest';

                  return (
                    <tr key={lap.id} className={`lap-row ${rowModifier}`}>
                      <td className="col-num">
                        <span className="lap-index-badge">
                          {String(lap.lapNumber).padStart(2, '0')}
                        </span>
                        {isFastest && (
                          <span className="lap-highlight-tag tag-fastest" title="Fastest Lap">
                            FASTEST
                          </span>
                        )}
                        {isSlowest && (
                          <span className="lap-highlight-tag tag-slowest" title="Slowest Lap">
                            SLOWEST
                          </span>
                        )}
                      </td>
                      <td className="col-lap-time">
                        <span className="time-tabular">{formatTime(lap.lapTime)}</span>
                      </td>
                      <td className="col-total-time">
                        <span className="time-tabular text-muted">{formatTime(lap.totalTime)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="lap-empty-state">
            <Timer size={32} className="empty-icon" strokeWidth={1.5} />
            <p className="empty-title">No laps recorded yet</p>
            <p className="empty-subtitle">
              Press <kbd>L</kbd> or the LAP button while running to log split times.
            </p>
          </div>
        )}
      </div>

      {/* Lap Performance Summary (Fastest / Slowest) */}
      {hasLaps && (
        <div className="lap-stats-summary" aria-label="Lap performance statistics">
          <div className="stat-card stat-fastest">
            <div className="stat-label-row">
              <Zap size={14} className="stat-icon text-cyan" />
              <span className="stat-label">FASTEST</span>
              <span className="stat-lap-ref">#{String(fastestLap.lapNumber).padStart(2, '0')}</span>
            </div>
            <div className="stat-value">{formatTime(fastestLap.lapTime)}</div>
          </div>

          <div className="stat-card stat-slowest">
            <div className="stat-label-row">
              <Award size={14} className="stat-icon text-rose" />
              <span className="stat-label">SLOWEST</span>
              <span className="stat-lap-ref">#{String(slowestLap.lapNumber).padStart(2, '0')}</span>
            </div>
            <div className="stat-value">{formatTime(slowestLap.lapTime)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

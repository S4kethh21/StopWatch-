import React, { useState } from 'react';
import { ArrowLeft, Trash2, ChevronDown, ChevronUp, Zap, Clock } from 'lucide-react';
import { formatTime, formatLapTime, formatSessionDate } from '../utils/formatTime';
import InfoGlyph from './InfoGlyph';

export default function SessionHistoryView({
  sessions = [],
  onDeleteSession,
  onBackToStopwatch,
  onOpenInfo,
}) {
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedSessionId((prev) => (prev === id ? null : id));
  };

  const handleConfirmDelete = (id) => {
    onDeleteSession(id);
    setDeletingId(null);
    if (expandedSessionId === id) {
      setExpandedSessionId(null);
    }
  };

  return (
    <div className="screen-container history-screen-view">
      {/* Top Editorial Navigation */}
      <header className="screen-header history-header" role="banner">
        <button
          type="button"
          className="btn-back-nav"
          onClick={onBackToStopwatch}
          aria-label="Return to stopwatch screen"
        >
          <ArrowLeft size={16} />
          <span>BACK TO STOPWATCH</span>
        </button>

        <div className="header-center-title">
          <span className="brand-text-primary">SESSION HISTORY</span>
        </div>

        <div className="header-meta-right">
          <button
            type="button"
            className="btn-info-circle"
            onClick={onOpenInfo}
            aria-label="About and Developer Information"
            title="About & Information (Press I)"
          >
            <InfoGlyph size={15} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="history-main-content">
        <div className="history-intro-bar">
          <div className="history-intro-meta">
            <span className="history-tag-yellow">SAVED TIMING SESSIONS</span>
            <p className="history-subtitle">
              Persistent record of your completed stopwatch runs and recorded split times.
            </p>
          </div>
          <span className="history-total-count">
            {sessions.length} {sessions.length === 1 ? 'SESSION' : 'SESSIONS'}
          </span>
        </div>

        {sessions.length === 0 ? (
          <div className="history-empty-state">
            <div className="history-empty-icon">
              <Clock size={36} className="text-yellow" />
            </div>
            <h3 className="empty-title">No saved sessions yet</h3>
            <p className="empty-description">
              When you reset the stopwatch after recording laps, choose <strong>SAVE</strong> to store your run history here.
            </p>
            <button
              type="button"
              className="btn-empty-return"
              onClick={onBackToStopwatch}
            >
              <span>GO TO STOPWATCH</span>
            </button>
          </div>
        ) : (
          <div className="history-sessions-list" role="list">
            {sessions.map((session) => {
              const { group, fullDate, timeStr } = formatSessionDate(session.timestamp);
              const isExpanded = expandedSessionId === session.id;
              const isDeleting = deletingId === session.id;

              // Find max lap time for visual timeline bars inside expanded details
              const maxLap = session.laps && session.laps.length > 0
                ? Math.max(...session.laps.map((l) => l.lapTime))
                : 1;

              return (
                <div
                  key={session.id}
                  className={`session-card-item ${isExpanded ? 'card-expanded' : ''}`}
                  role="listitem"
                >
                  <div className="session-card-main">
                    {/* Date & Group Heading */}
                    <div className="session-date-col">
                      <span className="session-group-tag text-yellow">{group}</span>
                      <div className="session-time-sub">
                        <span>{fullDate}</span>
                        <span className="sub-sep">&bull;</span>
                        <span>{timeStr}</span>
                      </div>
                    </div>

                    {/* Quick Stats: Laps and Total Duration */}
                    <div className="session-overview-col">
                      <span className="session-laps-tag">
                        {String(session.totalLaps).padStart(2, '0')} LAPS
                      </span>
                      <span className="session-duration-digits">
                        {formatTime(session.totalDuration)}
                      </span>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="session-metrics-col">
                      {session.fastestLap && (
                        <div className="metric-chip">
                          <span className="metric-chip-label">FASTEST</span>
                          <span className="metric-chip-val text-yellow">
                            {formatLapTime(session.fastestLap)}
                          </span>
                        </div>
                      )}
                      {session.averageLap && (
                        <div className="metric-chip">
                          <span className="metric-chip-label">AVERAGE</span>
                          <span className="metric-chip-val text-white">
                            {formatLapTime(session.averageLap)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions: View / Expand & Delete */}
                    <div className="session-actions-col">
                      <button
                        type="button"
                        className="btn-session-view"
                        onClick={() => toggleExpand(session.id)}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Hide session details' : 'View session details'}
                      >
                        <span>{isExpanded ? 'HIDE' : 'VIEW'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {!isDeleting ? (
                        <button
                          type="button"
                          className="btn-session-delete"
                          onClick={() => setDeletingId(session.id)}
                          aria-label="Delete this session"
                          title="Delete session"
                        >
                          <Trash2 size={14} />
                        </button>
                      ) : (
                        <div className="session-delete-confirm-box" role="alert">
                          <button
                            type="button"
                            className="btn-del-cancel"
                            onClick={() => setDeletingId(null)}
                          >
                            NO
                          </button>
                          <button
                            type="button"
                            className="btn-del-confirm"
                            onClick={() => handleConfirmDelete(session.id)}
                          >
                            DELETE
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Breakdown: All Laps with Visual Timeline */}
                  {isExpanded && (
                    <div className="session-expanded-body">
                      <div className="expanded-divider" />
                      <div className="expanded-laps-header">
                        <span className="expanded-title">RECORDED SPLIT BREAKDOWN</span>
                        <span className="expanded-count">{session.laps.length} LAPS</span>
                      </div>

                      {session.laps && session.laps.length > 0 ? (
                        <div className="expanded-laps-grid">
                          {session.laps.map((lap) => {
                            const isFastest = session.fastestLap && lap.lapTime === session.fastestLap;
                            const barPercent = Math.min(
                              100,
                              Math.max(6, Math.round((lap.lapTime / maxLap) * 100))
                            );

                            return (
                              <div
                                key={lap.id || lap.lapNumber}
                                className={`expanded-lap-row ${isFastest ? 'row-fastest' : ''}`}
                              >
                                <div className="lap-num-wrap">
                                  <span className="expanded-lap-num">
                                    LAP {String(lap.lapNumber).padStart(2, '0')}
                                  </span>
                                  {isFastest && (
                                    <span className="badge-fastest-mini">
                                      <Zap size={9} /> FASTEST
                                    </span>
                                  )}
                                </div>

                                <div className="expanded-bar-track">
                                  <div
                                    className={`expanded-bar-fill ${isFastest ? 'bar-yellow' : ''}`}
                                    style={{ width: `${barPercent}%` }}
                                  />
                                </div>

                                <span className={`expanded-lap-val ${isFastest ? 'text-yellow' : ''}`}>
                                  {formatLapTime(lap.lapTime)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="no-laps-note">No individual lap splits recorded for this session.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="screen-footer history-footer">
        <span className="footer-spec">STOPWATCH &bull; PRECISION TIME TRACKING</span>
        <button
          type="button"
          className="btn-footer-return"
          onClick={onBackToStopwatch}
        >
          RETURN TO STOPWATCH &rarr;
        </button>
      </footer>
    </div>
  );
}

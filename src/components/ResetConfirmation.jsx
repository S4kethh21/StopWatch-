import React, { useEffect, useRef } from 'react';
import { Bookmark, X } from 'lucide-react';
import { formatTime, formatLapTime } from '../utils/formatTime';

export default function ResetConfirmation({
  isOpen,
  elapsedTime = 0,
  laps = [],
  onCancel,
  onDiscard,
  onSaveAndReset,
}) {
  const saveBtnRef = useRef(null);

  // Focus primary action button on open
  useEffect(() => {
    if (isOpen && saveBtnRef.current) {
      saveBtnRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  // Compute fastest lap if available
  const fastestLap = laps.length > 0
    ? laps.reduce((fastest, l) => (l.lapTime < fastest.lapTime ? l : fastest), laps[0])
    : null;

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="dialog-box-editorial"
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="btn-dialog-close"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={15} />
        </button>

        <div className="dialog-content-wrap">
          <div className="dialog-badge-icon" aria-hidden="true">
            <Bookmark size={20} className="text-yellow" />
          </div>

          <div className="dialog-copy">
            <span className="dialog-pretitle">STOPWATCH SESSION</span>
            <h4 id="save-dialog-title" className="dialog-title-editorial">
              SAVE SESSION?
            </h4>
            <p id="save-dialog-desc" className="dialog-desc-editorial">
              Would you like to save this recorded session to Session History before resetting?
            </p>

            {/* Quick Session Stats Preview */}
            <div className="dialog-session-summary">
              <div className="summary-stat">
                <span className="summary-label">DURATION</span>
                <span className="summary-val text-white">{formatTime(elapsedTime)}</span>
              </div>
              <div className="summary-stat">
                <span className="summary-label">LAPS</span>
                <span className="summary-val text-white">{String(laps.length).padStart(2, '0')}</span>
              </div>
              {fastestLap && (
                <div className="summary-stat">
                  <span className="summary-label">FASTEST</span>
                  <span className="summary-val text-yellow">{formatLapTime(fastestLap.lapTime)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Explicit Actions: SAVE | DISCARD | CANCEL */}
        <div className="dialog-btn-group">
          <button
            type="button"
            className="btn-dialog-cancel-dark"
            onClick={onCancel}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="btn-dialog-discard"
            onClick={onDiscard}
          >
            DISCARD
          </button>
          <button
            ref={saveBtnRef}
            type="button"
            className="btn-dialog-confirm-yellow"
            onClick={onSaveAndReset}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

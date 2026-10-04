import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ResetConfirmation({ isOpen, onCancel, onConfirm }) {
  const cancelBtnRef = useRef(null);

  // Focus cancel button when dialog opens for safe UX
  useEffect(() => {
    if (isOpen && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
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

  return (
    <div
      className="dialog-overlay"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="dialog-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-desc"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
      >
        <button
          type="button"
          className="dialog-close-btn"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        <div className="dialog-header">
          <div className="dialog-icon-wrapper" aria-hidden="true">
            <AlertTriangle size={22} className="dialog-icon text-amber" />
          </div>
          <div>
            <h3 id="reset-dialog-title" className="dialog-title">
              Reset stopwatch?
            </h3>
            <p id="reset-dialog-desc" className="dialog-description">
              This will reset the current timer back to zero and clear all recorded laps.
            </p>
          </div>
        </div>

        <div className="dialog-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn btn-dialog-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-dialog-confirm"
            onClick={onConfirm}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

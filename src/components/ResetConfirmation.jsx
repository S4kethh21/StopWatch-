import React, { useEffect, useRef } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ResetConfirmation({ isOpen, onCancel, onConfirm }) {
  const cancelBtnRef = useRef(null);

  // Auto focus cancel button for safe keyboard UX
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
      className="dialog-backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="dialog-box-editorial"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-desc"
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
            <AlertCircle size={20} className="text-yellow" />
          </div>

          <div className="dialog-copy">
            <h4 id="reset-dialog-title" className="dialog-title-editorial">
              Reset stopwatch?
            </h4>
            <p id="reset-dialog-desc" className="dialog-desc-editorial">
              This action will reset the elapsed time back to 00:00:00.00 and clear all recorded laps.
            </p>
          </div>
        </div>

        <div className="dialog-btn-group">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn-dialog-cancel-dark"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-dialog-confirm-yellow"
            onClick={onConfirm}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function KeyboardHints() {
  return (
    <div className="keyboard-hints-editorial" aria-label="Keyboard Shortcuts">
      <div className="hints-inner">
        <span className="hints-title">SHORTCUTS:</span>
        <div className="hints-group">
          <span className="hint-pill">
            <kbd className="kbd-editorial">SPACE</kbd>
            <span className="kbd-action-text">START / PAUSE</span>
          </span>
          <span className="hint-bullet" aria-hidden="true">&bull;</span>
          <span className="hint-pill">
            <kbd className="kbd-editorial">L</kbd>
            <span className="kbd-action-text">RECORD LAP</span>
          </span>
          <span className="hint-bullet" aria-hidden="true">&bull;</span>
          <span className="hint-pill">
            <kbd className="kbd-editorial">R</kbd>
            <span className="kbd-action-text">RESET</span>
          </span>
        </div>
      </div>
    </div>
  );
}

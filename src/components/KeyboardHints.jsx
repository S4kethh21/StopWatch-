import React from 'react';
import { Command } from 'lucide-react';

export default function KeyboardHints() {
  return (
    <footer className="keyboard-hints" aria-label="Keyboard Shortcuts">
      <div className="hints-content">
        <span className="hints-label">
          <Command size={12} aria-hidden="true" />
          <span>SHORTCUTS</span>
        </span>
        <div className="hints-list">
          <div className="hint-item">
            <kbd className="kbd-key">SPACE</kbd>
            <span className="kbd-action">Start / Pause</span>
          </div>
          <span className="hint-separator" aria-hidden="true">&bull;</span>
          <div className="hint-item">
            <kbd className="kbd-key">L</kbd>
            <span className="kbd-action">Lap</span>
          </div>
          <span className="hint-separator" aria-hidden="true">&bull;</span>
          <div className="hint-item">
            <kbd className="kbd-key">R</kbd>
            <span className="kbd-action">Reset</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

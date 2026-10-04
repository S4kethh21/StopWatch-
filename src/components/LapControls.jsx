import React from 'react';
import { Flag } from 'lucide-react';

export default function LapControls({ isRunning, onRecordLap, lapCount = 0 }) {
  return (
    <div className="lap-controls" role="group" aria-label="Lap control">
      <button
        type="button"
        className="btn btn-lap"
        onClick={onRecordLap}
        disabled={!isRunning}
        aria-label="Record lap time"
      >
        <Flag size={18} className="btn-icon" />
        <span>LAP</span>
        {lapCount > 0 && (
          <span className="lap-counter-badge" aria-label={`${lapCount} laps recorded`}>
            {lapCount}
          </span>
        )}
      </button>
    </div>
  );
}

import React from 'react';
import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="pulse-header" role="banner">
      <div className="header-brand">
        <div className="brand-icon-wrapper" aria-hidden="true">
          <Activity className="brand-icon" size={20} />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">PULSE</h1>
          <span className="brand-subtitle">Precision Stopwatch</span>
        </div>
      </div>

      <div className="header-meta">
        <span className="task-badge" aria-label="Internship Task Two">
          <span className="badge-bullet" aria-hidden="true"></span>
          INTERNSHIP &bull; TASK 02
        </span>
      </div>
    </header>
  );
}

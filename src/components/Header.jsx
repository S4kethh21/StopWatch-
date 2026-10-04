import React from 'react';

export default function Header({ onScrollToLaps, onScrollToTop }) {
  return (
    <header className="editorial-header" role="banner">
      {/* Top Left Label */}
      <div className="header-meta-left">
        <span className="header-tag-yellow">STOPWATCH WEB APP</span>
        <span className="header-subtitle">Internship Task 02</span>
      </div>

      {/* Center Minimal Navigation */}
      <nav className="header-center-nav" aria-label="Main Navigation">
        <button
          type="button"
          className="nav-link"
          onClick={onScrollToTop}
          aria-label="Scroll to stopwatch overview"
        >
          STOPWATCH
        </button>
        <span className="nav-divider" aria-hidden="true">&bull;</span>
        <button
          type="button"
          className="nav-link"
          onClick={onScrollToLaps}
          aria-label="Scroll to lap history"
        >
          LAPS
        </button>
      </nav>

      {/* Top Right Label */}
      <div className="header-meta-right">
        <span className="header-tag-yellow">PRECISION</span>
        <span className="header-subtitle">TIME TRACKING</span>
        <span className="header-tech-spec" aria-hidden="true">2026 // ED-02</span>
      </div>
    </header>
  );
}

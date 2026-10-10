import React from 'react';
import StopwatchIllustration from './StopwatchIllustration';
import { ArrowRight } from 'lucide-react';
import InfoGlyph from './InfoGlyph';

export default function HomeScreen({ onNavigateStopwatch, onOpenInfo }) {
  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenInfo();
  };

  return (
    <div className="screen-container home-screen-view">
      {/* Editorial Top Bar */}
      <header className="screen-header home-header" role="banner">
        <div className="header-meta-left">
          <span className="brand-text-primary">STOPWATCH</span>
          <span className="brand-text-sub">PRECISION TIMING</span>
        </div>

        <div className="header-meta-right">
          <div className="header-right-actions">
            <div className="spec-text-block">
              <span className="spec-text-yellow">PRECISION</span>
              <span className="spec-text-muted">TIME TRACKING</span>
            </div>
            {/* Circular Info Button */}
            <button
              type="button"
              className="btn-info-circle"
              onClick={handleInfoClick}
              aria-label="About this stopwatch and developer information"
              title="About & Information (Press I)"
            >
              <InfoGlyph size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero: Left Editorial Typography, Right Precision Illustration */}
      <main className="home-main-content">
        <div className="home-left-col">
          <h1 className="home-hero-headline">
            <span className="text-yellow">Measure</span>
            <br />
            time with
            <br />
            precision.
          </h1>

          <p className="home-hero-subtitle">
            A simple, precise stopwatch for tracking
            <br className="sub-br" />
            time, laps and performance.
          </p>

          {/* Primary CTA (Navigates to Stopwatch without auto-starting) */}
          <div className="home-cta-wrap">
            <button
              type="button"
              className="btn-hero-cta"
              onClick={onNavigateStopwatch}
              aria-label="Open stopwatch screen"
            >
              <span>START STOPWATCH</span>
              <ArrowRight size={18} className="cta-arrow" />
            </button>

            <span className="home-cta-footnote">
              Precision timing &bull; Lap tracking &bull; Keyboard shortcuts
            </span>
          </div>
        </div>

        {/* Right Product Graphic */}
        <div className="home-right-col">
          <StopwatchIllustration />
        </div>
      </main>

      {/* Clean Footer without any task numbers */}
      <footer className="screen-footer home-footer">
        <span className="footer-edition">PRECISION TIME TRACKING</span>
        <span className="footer-shortcuts-hint">
          ENTER TO START &bull; PRESS <kbd>ENTER</kbd>
        </span>
      </footer>
    </div>
  );
}

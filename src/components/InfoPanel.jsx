import React, { useEffect } from 'react';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';

function LinkedinIcon({ size = 15, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 15, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon({ size = 15, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function InfoPanel({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="info-drawer-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <aside
        className="info-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="About Stopwatch and Developer Information"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="drawer-pretitle">ABOUT</span>
            <h2 className="drawer-main-title">STOPWATCH</h2>
          </div>
          <button
            type="button"
            className="btn-drawer-close"
            onClick={onClose}
            aria-label="Close information panel"
          >
            <X size={18} />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="drawer-scroll-body">
          {/* Section: About This Web App */}
          <section className="drawer-section">
            <h3 className="section-label">ABOUT THIS WEB APP</h3>
            <p className="section-text">
              A clean, precise stopwatch designed for simple time tracking,
              lap recording and performance timing.
            </p>
          </section>

          {/* Section: Features */}
          <section className="drawer-section">
            <h3 className="section-label">FEATURES</h3>
            <ul className="features-list">
              <li>Accurate stopwatch timing</li>
              <li>Lap tracking</li>
              <li>Fastest and slowest lap detection</li>
              <li>Pause and resume</li>
              <li>Keyboard shortcuts</li>
              <li>Responsive design</li>
              <li>Minimal distraction-free interface</li>
            </ul>
          </section>

          {/* Section: Developer */}
          <section className="drawer-section">
            <h3 className="section-label">DEVELOPER</h3>
            <h4 className="developer-name">Sakheth Reddy</h4>
            <p className="section-text developer-bio">
              I'm Sakheth Reddy, a Computer Science student interested in
              AI, creative technology and building useful digital experiences.
              I enjoy experimenting with AI-powered applications, interactive
              web experiences and practical technology projects.
            </p>
          </section>

          {/* Section: Explore My Work */}
          <section className="drawer-section">
            <h3 className="section-label">EXPLORE MY WORK</h3>
            <span className="sub-section-title">PORTFOLIO</span>
            <p className="section-text">
              Visit my personal portfolio to explore my projects,
              experiments and work.
            </p>
            <a
              href="https://sakethh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-portfolio-link"
              aria-label="Visit Sakheth Reddy personal portfolio (opens in new tab)"
            >
              <span>VISIT PORTFOLIO</span>
              <ArrowUpRight size={16} />
            </a>
          </section>

          {/* Section: Connect / Social Links */}
          <section className="drawer-section section-connect">
            <h3 className="section-label">CONNECT</h3>
            <div className="connect-links-grid">
              <a
                href="https://www.linkedin.com/in/sakheth-reddy-793530376"
                target="_blank"
                rel="noopener noreferrer"
                className="connect-link-item"
                aria-label="Connect on LinkedIn (opens in new tab)"
              >
                <LinkedinIcon size={15} className="connect-icon" />
                <span>LinkedIn</span>
                <ExternalLink size={12} className="connect-arrow" />
              </a>

              <a
                href="https://github.com/S4kethh21"
                target="_blank"
                rel="noopener noreferrer"
                className="connect-link-item"
                aria-label="View GitHub profile (opens in new tab)"
              >
                <GithubIcon size={15} className="connect-icon" />
                <span>GitHub</span>
                <ExternalLink size={12} className="connect-arrow" />
              </a>

              <a
                href="https://www.instagram.com/sakethh07"
                target="_blank"
                rel="noopener noreferrer"
                className="connect-link-item"
                aria-label="Follow on Instagram (opens in new tab)"
              >
                <InstagramIcon size={15} className="connect-icon" />
                <span>Instagram</span>
                <ExternalLink size={12} className="connect-arrow" />
              </a>
            </div>
          </section>
        </div>

        {/* Drawer Bottom Footnote */}
        <div className="drawer-footer">
          <span className="footer-spec">PRECISION TIME TRACKING</span>
          <span className="footer-close-hint">PRESS <kbd>ESC</kbd> TO CLOSE</span>
        </div>
      </aside>
    </div>
  );
}

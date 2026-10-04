import React from 'react';
import PhoneFrame from './PhoneFrame';
import { Play, List } from 'lucide-react';

export default function IntroPhone({ onStartStopwatch, onViewLaps, isRunning }) {
  return (
    <PhoneFrame headerLabel="INTRO" variant="intro" className="phone-intro">
      <div className="intro-screen-content">
        {/* Minimalist Stopwatch Geometric Vector Illustration */}
        <div className="intro-illustration" aria-hidden="true">
          <svg
            viewBox="0 0 160 160"
            className="intro-vector-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer dial ring */}
            <circle
              cx="80"
              cy="85"
              r="58"
              stroke="#2a2a2a"
              strokeWidth="2"
            />
            {/* Top crown button */}
            <rect
              x="74"
              y="15"
              width="12"
              height="8"
              rx="2"
              fill="#FFF000"
            />
            <rect
              x="77"
              y="23"
              width="6"
              height="6"
              fill="#777777"
            />
            {/* Side button */}
            <rect
              x="122"
              y="38"
              width="8"
              height="6"
              rx="1.5"
              transform="rotate(45 122 38)"
              fill="#444444"
            />
            {/* Inner dial tick marks */}
            <circle
              cx="80"
              cy="85"
              r="46"
              stroke="#1f1f1f"
              strokeWidth="1.5"
              strokeDasharray="3 7"
            />
            {/* Dynamic Accent Arc */}
            <path
              d="M 80 27 A 58 58 0 0 1 138 85"
              stroke="#FFF000"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Center pivot */}
            <circle
              cx="80"
              cy="85"
              r="4"
              fill="#FFF000"
            />
            {/* Stopwatch Hands */}
            <line
              x1="80"
              y1="85"
              x2="108"
              y2="57"
              stroke="#FFF000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="80"
              y1="85"
              x2="80"
              y2="105"
              stroke="#777777"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Editorial Headline */}
        <div className="intro-text-block">
          <h2 className="intro-headline">
            <span className="headline-accent">Measure</span>
            <br />
            time of your
            <br />
            Activities
          </h2>
          <p className="intro-description">
            Measure time with precision. Track laps, pauses and performance.
          </p>
        </div>

        {/* Bottom Interactive Buttons */}
        <div className="intro-actions">
          <button
            type="button"
            className="btn-intro-primary"
            onClick={onStartStopwatch}
            aria-label={isRunning ? 'Stopwatch already running' : 'Start stopwatch from welcome screen'}
          >
            <Play size={14} fill="currentColor" />
            <span>{isRunning ? 'RUNNING NOW' : 'START STOPWATCH'}</span>
          </button>

          <button
            type="button"
            className="btn-intro-secondary"
            onClick={onViewLaps}
            aria-label="View lap history table"
          >
            <List size={14} />
            <span>VIEW LAPS</span>
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

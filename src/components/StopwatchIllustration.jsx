import React from 'react';

export default function StopwatchIllustration() {
  // Generate 60 tick marks for an authentic high-precision dial
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = i * 6;
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 122 : 128;
    const r2 = 136;
    const rad = (angle - 90) * (Math.PI / 180);
    const x1 = 150 + r1 * Math.cos(rad);
    const y1 = 150 + r1 * Math.sin(rad);
    const x2 = 150 + r2 * Math.cos(rad);
    const y2 = 150 + r2 * Math.sin(rad);

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isMajor ? '#FFF000' : '#333333'}
        strokeWidth={isMajor ? 2 : 1}
        strokeLinecap="round"
      />
    );
  });

  return (
    <div className="home-graphic-wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 300 320"
        className="home-stopwatch-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Mechanical Crown & Pushers */}
        <rect x="142" y="6" width="16" height="12" rx="2" fill="#222222" stroke="#444444" strokeWidth="1.5" />
        <rect x="146" y="18" width="8" height="10" fill="#333333" />
        
        {/* Left Lap Pusher (Angled) */}
        <g transform="rotate(-32 150 160)">
          <rect x="144" y="10" width="12" height="10" rx="2" fill="#1c1c1c" stroke="#444444" strokeWidth="1.5" />
        </g>

        {/* Right Start/Stop Pusher (Angled) with Yellow Accent Ring */}
        <g transform="rotate(32 150 160)">
          <rect x="144" y="10" width="12" height="10" rx="2" fill="#1c1c1c" stroke="#FFF000" strokeWidth="1.5" />
        </g>

        {/* Outer Dial Case */}
        <circle cx="150" cy="160" r="142" stroke="#2a2a2a" strokeWidth="2" fill="#131313" />
        <circle cx="150" cy="160" r="139" stroke="#1c1c1c" strokeWidth="1" fill="#101010" />

        {/* Tick Marks */}
        {ticks}

        {/* Numerals for 60, 15, 30, 45 */}
        <text x="150" y="52" fill="#777777" fontSize="10" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" textAnchor="middle">60</text>
        <text x="254" y="164" fill="#777777" fontSize="10" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" textAnchor="middle">15</text>
        <text x="150" y="274" fill="#777777" fontSize="10" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" textAnchor="middle">30</text>
        <text x="46" y="164" fill="#777777" fontSize="10" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" textAnchor="middle">45</text>

        {/* Minimalist Sub-Dial for Minutes */}
        <circle cx="150" cy="108" r="30" stroke="#222222" strokeWidth="1.5" fill="#0d0d0d" />
        <circle cx="150" cy="108" r="2" fill="#FFF000" />
        <line x1="150" y1="108" x2="162" y2="96" stroke="#FFF000" strokeWidth="1.5" strokeLinecap="round" className="subdial-hand" />
        <text x="150" y="126" fill="#444444" fontSize="7" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" textAnchor="middle">30 MIN</text>

        {/* Technical Typography Accent on Dial Face */}
        <text x="150" y="196" fill="#555555" fontSize="8" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2" fontWeight="700" textAnchor="middle">
          PRECISION &bull; CAL 02
        </text>
        <text x="150" y="208" fill="#333333" fontSize="7" fontFamily="'JetBrains Mono', monospace" letterSpacing="1" textAnchor="middle">
          1/100 SEC ACCURACY
        </text>

        {/* Subtle Static Guide Ring */}
        <circle cx="150" cy="160" r="95" stroke="#181818" strokeWidth="1" strokeDasharray="4 4" />

        {/* Center Main Rotating Yellow Second Hand */}
        <g className="main-rotating-hand">
          <line x1="150" y1="184" x2="150" y2="42" stroke="#FFF000" strokeWidth="2" strokeLinecap="round" />
          <circle cx="150" cy="184" r="3" fill="#FFF000" />
          {/* Arrow Tip */}
          <polygon points="150,34 147,44 153,44" fill="#FFF000" />
        </g>

        {/* Center Pivot Point with Glowing Yellow Core */}
        <circle cx="150" cy="160" r="7" fill="#1a1a1a" stroke="#333333" strokeWidth="1.5" />
        <circle cx="150" cy="160" r="3.5" fill="#FFF000" className="pivot-pulse-dot" />
      </svg>
    </div>
  );
}

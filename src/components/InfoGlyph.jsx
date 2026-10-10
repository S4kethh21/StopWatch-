import React from 'react';

export default function InfoGlyph({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 10v9" />
      <path d="M10 10h2" />
      <path d="M9.5 19h5" />
    </svg>
  );
}

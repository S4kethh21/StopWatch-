# PULSE — Precision Stopwatch
> **Internship Task 02** &bull; Precision Productivity & Performance Stopwatch Web Application

![PULSE Stopwatch](https://img.shields.io/badge/Task-02-00d2ff?style=flat-square)
![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square)
![Vite 8](https://img.shields.io/badge/Vite-8-646cff?style=flat-square)
![Accuracy](https://img.shields.io/badge/Timer-performance.now()-10b981?style=flat-square)

---

## 1. Overview & Identity

**PULSE** is a precision stopwatch web application engineered for optimal performance, responsiveness, and accuracy. Built with modern React and Vite, it delivers zero-drift timing using hardware timestamps (`performance.now()`) and smooth display rendering via `requestAnimationFrame`.

### Key Highlights
- **High-Precision Timing Engine**: Uses timestamp delta calculations (`performance.now()`) with accumulated segment tracking, guaranteeing zero drift over extended timing sessions.
- **Microsecond / Centisecond Resolution**: Displays `HH:MM:SS.CC` (Hours, Minutes, Seconds, Centiseconds) in tabular monospace typography (`tabular-nums`) to prevent horizontal jitter.
- **Full Lap Tracking System**: Records both individual lap splits and total cumulative elapsed time.
- **Fastest & Slowest Lap Analytics**: Dynamically evaluates all recorded splits and provides visual badges and performance summary statistics.
- **State-Driven Ambient Dial Animation**: An animated glowing instrument dial responds dynamically to stopwatch state (`RUNNING`, `PAUSED`, `READY`).
- **Keyboard Shortcuts**: Full accessibility with Spacebar (Start/Pause), `L` (Lap), and `R` (Reset).
- **Inline Modal Reset Confirmation**: Safe, pop-up-free dialog protecting against accidental resets without using browser `alert()` or `confirm()`.
- **Edge-to-Edge Responsive Layout**: Fluid viewport design with `100svh`, tested from 320px mobile screens to 1920px+ ultra-wide desktop monitors.

---

## 2. Component Architecture

```
src/
├── components/
│   ├── Header.jsx              # Brand identity & internship metadata badge
│   ├── StopwatchDisplay.jsx    # Tabular time readout, instrument ring & status pill
│   ├── Controls.jsx            # Primary START, PAUSE, RESET buttons with state guards
│   ├── LapControls.jsx         # LAP button with real-time lap count indicator
│   ├── LapList.jsx             # Lap table, empty state, Clear Laps, and Fastest/Slowest stats
│   ├── ResetConfirmation.jsx   # Accessible inline modal dialog with keyboard trap
│   └── KeyboardHints.jsx       # Subtle footer displaying keyboard shortcuts
├── utils/
│   └── formatTime.js           # Pure time calculation & zero-padded string formatting
├── App.jsx                     # Timing loop, state management, and shortcut listeners
├── main.jsx                    # React root entry point
└── index.css                   # Custom midnight/charcoal design system & animations
```

---

## 3. Keyboard Shortcuts

| Shortcut | Action | Condition |
| :---: | :---: | :---: |
| <kbd>SPACE</kbd> | **Start / Pause** (Toggle) | Always available (outside inputs) |
| <kbd>L</kbd> | **Record Lap** | Active while timer is running |
| <kbd>R</kbd> | **Reset** | Prompts confirmation if time/laps exist |
| <kbd>ESC</kbd> | **Cancel Dialog** | Closes reset confirmation modal |

---

## 4. Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Production Preview
```bash
npm run preview
```

---

## 5. Quality & Compliance Checklist

- [x] **Accurate Timing Engine**: `performance.now()` delta math with `requestAnimationFrame`.
- [x] **Single Timing Loop**: Strict guard prevents duplicate loops on multiple Start clicks.
- [x] **Format**: `HH:MM:SS.CC` with tabular figures (`font-variant-numeric: tabular-nums`).
- [x] **Lap System**: Split time, Total time, Newest lap on top, Fastest & Slowest identification.
- [x] **Reset Confirmation**: Custom accessible dialog without browser `alert`/`confirm`.
- [x] **Micro-interactions**: Hover lifts, active returns, focus rings, disabled opacities.
- [x] **Accessibility**: Semantic HTML, ARIA attributes, keyboard control, and `prefers-reduced-motion` support.
- [x] **Zero Linter Warnings**: Verified with Oxlint.

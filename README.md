# STOPWATCH — PRECISION TIME TRACKING
> **Minimalist Digital Product** &bull; High-Contrast Precision Stopwatch with Real-Time Lap Analytics, Session History, Focus Mode & Personal Best Tracking.

![Stopwatch](https://img.shields.io/badge/Stopwatch-Precision-FFF000?style=flat-square&labelColor=111111)
![React 19](https://img.shields.io/badge/React-19-F5F5F5?style=flat-square&labelColor=111111)
![Vite 8](https://img.shields.io/badge/Vite-8-777777?style=flat-square&labelColor=111111)
![Engine](https://img.shields.io/badge/Engine-performance.now()-FFF000?style=flat-square&labelColor=111111)

---

## 1. Application Architecture & Product Flow

```
HOME SCREEN
     │
     └── ENTER / "START STOPWATCH →" (Navigates to Stopwatch; timer remains at 00:00:00.00 READY)
            ↓
     STOPWATCH SCREEN
     ├── Left/Center: High-Precision Hero Stopwatch (60–65%)
     └── Right: Live Lap History + Visual Timeline + Dynamic Statistics (35–40%)
            │
            ├── FOCUS MODE (Expands timer to centered zen view, hides secondary UI)
            ├── SESSION HISTORY (View saved sessions, lap breakdowns, delete runs)
            ├── SETTINGS (Countdown 3s/5s, Subtle Web Audio sound, Reduced Motion)
            ├── ⓘ ABOUT PANEL (Features, Shortcuts, Developer bio, Portfolio, Socials)
            └── RESET & SAVE SESSION (Prompt to Save, Discard, or Cancel)
```

---

## 2. Core Features

- **Accurate Timing Engine**:
  - Millisecond precision calculated via `performance.now()` timestamp deltas.
  - Zero cumulative drift over long sessions. Single-loop execution guarded with `requestAnimationFrame`.
- **Live Lap History & Visual Timeline**:
  - Live split recording with newest laps displayed first.
  - Relative visual bars reflecting lap length scaled against the longest recorded lap.
  - Dynamic metrics: `TOTAL LAPS`, `TOTAL TIME`, `FASTEST`, `SLOWEST`, `AVERAGE`.
- **Persistent Personal Best**:
  - Tracks fastest all-time lap split in `localStorage` under `stopwatch_app_personal_best`.
  - Subtle celebration feedback when a new personal best is achieved.
- **Session History & Save Option**:
  - When resetting an active session, users can `SAVE`, `DISCARD`, or `CANCEL`.
  - Saved sessions stored under `stopwatch_app_sessions` with date, duration, laps, and individual split breakdowns.
- **Focus Mode**:
  - One-click or <kbd>F</kbd> toggle to enter an ultra-minimalist focus timer view.
  - Keeps timing uninterrupted while stripping out all secondary distractions.
- **Optional Lead-in Countdown**:
  - Configurable 3-second or 5-second countdown with visual number countdown and acoustic ticks before timing begins.
- **Subtle Audio Feedback**:
  - Synthesized Web Audio API sound chimes for start, pause, lap, countdown, and reset.
  - Respects browser autoplay and user preferences.
- **Information Drawer**:
  - Features developer information for **Sakheth Reddy**, direct portfolio link (`https://saketh-portfolio-delta.vercel.app/`), and social channels.

---

## 3. Keyboard Shortcuts

| Shortcut | Context | Action |
| :---: | :---: | :---: |
| <kbd>ENTER</kbd> | **Home** | Navigate to Stopwatch (*never starts timer automatically*) |
| <kbd>SPACE</kbd> | **Stopwatch** | Start / Pause / Resume toggle |
| <kbd>L</kbd> | **Stopwatch** | Record split lap |
| <kbd>R</kbd> | **Stopwatch** | Reset / Prompt Save Session dialog |
| <kbd>F</kbd> | **Stopwatch** | Toggle Focus Mode |
| <kbd>H</kbd> | **Stopwatch** | Open Session History view |
| <kbd>S</kbd> | **Stopwatch** | Open Settings modal |
| <kbd>I</kbd> | **Global** | Toggle About / Information drawer |
| <kbd>ESC</kbd> | **Global** | Close active modals / return to Stopwatch / return to Home |

---

## 4. Development & Build

```bash
npm install       # Install dependencies
npm run dev       # Start local development server
npm run build     # Compile optimized production bundle
npm run preview   # Preview production build
```

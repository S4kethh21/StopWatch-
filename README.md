# STOPWATCH — PRECISION TIME TRACKING
> **Minimalist Digital Product** &bull; High-Contrast Precision Stopwatch with Real-Time Lap Analytics

![Stopwatch](https://img.shields.io/badge/Stopwatch-Precision-FFF000?style=flat-square&labelColor=111111)
![React 19](https://img.shields.io/badge/React-19-F5F5F5?style=flat-square&labelColor=111111)
![Vite 8](https://img.shields.io/badge/Vite-8-777777?style=flat-square&labelColor=111111)
![Timing](https://img.shields.io/badge/Engine-performance.now()-FFF000?style=flat-square&labelColor=111111)

---

## 1. Application Architecture & Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← HOME                         STOPWATCH               ⓘ   │
│                                                             │
│          STOPWATCH                    LAP HISTORY            │
│        (60% - 65% width)            (35% - 40% width)        │
│                                                             │
│        00 : 00 : 00 . 00             LAP 04   00:09.31     │
│                                       LAP 03   00:13.58     │
│        ● READY                        LAP 02   00:08.42     │
│                                       LAP 01   00:07.21     │
│        ┌──────────────┐                                      │
│        │    START     │               FASTEST   00:07.21     │
│        └──────────────┘               SLOWEST   00:13.58     │
│                                       TOTAL     04           │
│          LAP       RESET                                     │
│                                       CLEAR LAPS             │
└─────────────────────────────────────────────────────────────┘
```

- **Home Screen**: Fullscreen landing screen with editorial typography ("*Measure time with precision*"), animated mechanical dial illustration, `START STOPWATCH →` CTA, and `ⓘ` info trigger.
- **Stopwatch Screen**:
  - **Left / Center (60–65%)**: Oversized thin typography timer (`HH : MM : SS . CC`), dynamic status badge (`READY`, `RUNNING`, `PAUSED`), and primary controls.
  - **Right (35–40%)**: Live-updating Lap History sidebar with animated row insertion, dynamic `FASTEST` badge detection, session statistics, and inline `CLEAR LAPS` confirmation.
  - **Header ⓘ Action**: Circular button opening the slide-over About & Developer information drawer.
- **Responsive Stacking**: Automatically stacks vertically on mobile devices (768px and below).

---

## 2. Component Structure

```
src/
├── components/
│   ├── HomeScreen.jsx             # Screen 1: Editorial landing & animated dial
│   ├── StopwatchScreen.jsx        # Screen 2: 2-column side-by-side layout
│   ├── StopwatchDisplay.jsx       # Oversized thin typography readout & status
│   ├── StopwatchControls.jsx      # Primary yellow START & secondary LAP/RESET
│   ├── LapHistoryPanel.jsx        # Right-side live lap list & analytics
│   ├── StopwatchIllustration.jsx  # Precision animated vector product graphic
│   ├── InfoPanel.jsx              # Side drawer with about, features, developer & links
│   └── ResetConfirmation.jsx      # Safe inline reset modal
├── utils/
│   └── formatTime.js              # Hardware timestamp formatting & parsing
├── App.jsx                        # Screen routing state & core timing engine
├── main.jsx                       # Application entry point
└── index.css                      # Minimalist design system (#111111 / #FFF000 / #F5F5F5)
```

---

## 3. High-Precision Timing Engine

- **Timestamp Delta Calculation**:
  $$\text{elapsed} = \text{accumulatedElapsed} + (\text{performance.now()} - \text{startTimestamp})$$
- Zero drift over extended runtimes.
- Single-loop protection with `requestAnimationFrame`.
- Formatted as `HH : MM : SS . CC` with `tabular-nums` monospace stability.

---

## 4. Keyboard Shortcuts

| Shortcut | Context | Action |
| :---: | :---: | :---: |
| <kbd>ENTER</kbd> | **Home** | Navigates to Stopwatch screen **without starting** the timer |
| <kbd>SPACE</kbd> | **Stopwatch** | Start / Pause toggle |
| <kbd>L</kbd> | **Stopwatch** | Record lap (updates right-side panel live) |
| <kbd>R</kbd> | **Stopwatch** | Prompt reset confirmation dialog |
| <kbd>ESC</kbd> | **Global** | Closes Info drawer / confirmation modal or returns to Home |

---

## 5. Development & Build

```bash
npm install       # Install dependencies
npm run dev       # Start local development server
npm run build     # Compile production build
npm run preview   # Preview production bundle
```

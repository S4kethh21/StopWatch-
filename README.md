# STOPWATCH WEB APPLICATION — INTERNSHIP TASK 02
> **Screen-by-Screen Minimalist Application** &bull; HOME &rarr; STOPWATCH &rarr; LAPS

![Stopwatch Task 02](https://img.shields.io/badge/Task-02-FFF000?style=flat-square&labelColor=111111)
![React 19](https://img.shields.io/badge/React-19-F5F5F5?style=flat-square&labelColor=111111)
![Vite 8](https://img.shields.io/badge/Vite-8-777777?style=flat-square&labelColor=111111)
![Timing](https://img.shields.io/badge/Engine-performance.now()-FFF000?style=flat-square&labelColor=111111)

---

## 1. Application Flow & Architecture

The application is engineered as a clean, screen-by-screen single-page application with dedicated views:

```
┌────────────────────────────────────────────────────────┐
│                    SCREEN 1: HOME                      │
│   • Editorial headline ("Measure time with precision")  │
│   • Animated minimalist product illustration           │
│   • Primary CTA: START STOPWATCH →                     │
└───────────────────────────┬────────────────────────────┘
                            │
                      START STOPWATCH
                            ↓
┌────────────────────────────────────────────────────────┐
│                 SCREEN 2: STOPWATCH                    │
│   • Top navigation: ← HOME                             │
│   • 120–180px oversized thin timer (HH:MM:SS.CC)       │
│   • Primary START / PAUSE / RESUME button (Yellow)     │
│   • Secondary LAP & RESET buttons                      │
│   • Navigation CTA: VIEW LAPS →                        │
└───────────────────────────┬────────────────────────────┘
                            │
                        VIEW LAPS
                            ↓
┌────────────────────────────────────────────────────────┐
│               SCREEN 3: LAPS / RESULTS                 │
│   • Top navigation: ← STOPWATCH                        │
│   • Statistics grid: Total, Fastest, Slowest, Overall  │
│   • Lap history table with fastest badges              │
│   • Actions: ← BACK TO STOPWATCH, CLEAR LAPS           │
└────────────────────────────────────────────────────────┘
```

---

## 2. Component Structure

```
src/
├── components/
│   ├── HomeScreen.jsx             # Screen 1: Editorial landing & animated dial
│   ├── StopwatchScreen.jsx        # Screen 2: Central hero timer viewport
│   ├── LapsScreen.jsx             # Screen 3: Laps, results & analytics grid
│   ├── StopwatchDisplay.jsx       # 120-180px thin typography readout & status
│   ├── StopwatchControls.jsx      # Touch-friendly primary & secondary buttons
│   ├── StopwatchIllustration.jsx  # Precision animated vector product graphic
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
- Formatted as `HH:MM:SS.CC` with `tabular-nums` monospace stability.

---

## 4. Keyboard Shortcuts

| Shortcut | Action | Condition |
| :---: | :---: | :---: |
| <kbd>SPACE</kbd> | **Start / Pause** (Toggle) | Launches timer on Home; controls stopwatch on timer view |
| <kbd>L</kbd> | **Record Lap** | Active while timer is running |
| <kbd>R</kbd> | **Reset** | Prompts confirmation if time/laps exist |
| <kbd>ESC</kbd> | **Back / Dismiss** | Returns to previous screen or closes modal |

---

## 5. Development & Build

```bash
npm install       # Install dependencies
npm run dev       # Start local development server
npm run build     # Compile production build
npm run preview   # Preview production bundle
```

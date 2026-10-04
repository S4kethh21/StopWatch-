# PRECISION STOPWATCH — INTERNSHIP TASK 02
> **Minimalist Editorial Product Showcase** &bull; High-Contrast Precision Stopwatch Web Application

![Stopwatch Task 02](https://img.shields.io/badge/Task-02-FFF000?style=flat-square&labelColor=111111)
![React 19](https://img.shields.io/badge/React-19-F5F5F5?style=flat-square&labelColor=111111)
![Vite 8](https://img.shields.io/badge/Vite-8-777777?style=flat-square&labelColor=111111)
![Accuracy](https://img.shields.io/badge/Accuracy-performance.now()-FFF000?style=flat-square&labelColor=111111)

---

## 1. Visual Direction & Design Language

Designed with a high-contrast editorial aesthetic inspired by modern digital product case studies:
- **Palette**: Deep charcoal canvas (`#111111`), secondary dark surface (`#171717`), bold neon yellow accent (`#FFF000`), crisp white (`#F5F5F5`), and muted gray (`#777777`).
- **Typography**: Editorial typography using `Space Grotesk`, `Inter`, and `JetBrains Mono` with oversized thin numerical weights and high typographic hierarchy.
- **3-Phone Mockup Showcase**:
  - **Left Phone (Intro)**: Welcome screen with geometric stopwatch vector illustration, headline ("*Measure time of your Activities*"), and direct action triggers.
  - **Center Phone (Hero Stopwatch)**: Primary interactive stopwatch with oversized stacked digits (`00h`, `59m`, `47s`, `.CC`), running indicator in `#FFF000`, and large yellow touch controls.
  - **Right Phone (Active Times)**: Live split times feed, fastest lap highlighting in neon yellow, and synchronised action controls.

---

## 2. Component Architecture

```
src/
├── components/
│   ├── Header.jsx              # Editorial top bar with project metadata & navigation
│   ├── PhoneFrame.jsx          # Reusable realistic smartphone mockup with hardware details
│   ├── IntroPhone.jsx          # Left phone welcome screen with vector illustration
│   ├── StopwatchDisplay.jsx    # Center phone stacked typography timer & status indicator
│   ├── StopwatchControls.jsx   # Center phone yellow primary & dark outlined actions
│   ├── ActivePhone.jsx         # Right phone active split times & live feed
│   ├── LapList.jsx             # Minimalist lap history table & fastest/slowest analysis
│   ├── ResetConfirmation.jsx   # Custom inline modal dialog with keyboard accessibility
│   └── KeyboardHints.jsx       # Subtle keyboard shortcuts reference footer
├── utils/
│   └── formatTime.js           # High-precision time calculation & format helpers
├── App.jsx                     # State management, timestamp loop, and keyboard listeners
├── main.jsx                    # Application entry point
└── index.css                   # Editorial design system (#111111 / #FFF000 / #F5F5F5)
```

---

## 3. High-Precision Timing Engine

- **Hardware Timestamps**: Calculates elapsed time using `performance.now()` deltas to guarantee zero drift:
  $$\text{elapsed} = \text{accumulatedElapsed} + (\text{performance.now()} - \text{startTimestamp})$$
- **Smooth Display Loops**: Uses `requestAnimationFrame` with single-loop execution guards.
- **Format**: `HH:MM:SS.CC` with `tabular-nums` formatting to prevent horizontal shifting.
- **Lap Tracking**: Accurate lap split calculation ($t_{\text{current}} - t_{\text{prev}}$) and total elapsed time tracking.

---

## 4. Keyboard Shortcuts

| Key | Action | Details |
| :---: | :---: | :---: |
| <kbd>SPACE</kbd> | **Start / Pause** | Toggles stopwatch state (bypasses input fields) |
| <kbd>L</kbd> | **Record Lap** | Active while timer is running |
| <kbd>R</kbd> | **Reset** | Prompts inline confirmation dialog |
| <kbd>ESC</kbd> | **Cancel** | Dismisses confirmation modal |

---

## 5. Development & Deployment

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

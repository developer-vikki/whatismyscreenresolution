# ⚡ CYBER-RESOLUTION // Deep Screen & Browser Telemetry Interrogator

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A cyberpunk hacker-style web dashboard and hardware forensics workstation for real-time screen resolution extraction, GPU interrogations, display refresh rate benchmarking, interactive multi-device comparison, fullscreen dead-pixel calibration, and live terminal CLI forensics.

---

## 📸 Overview & Experience

**CYBER-RESOLUTION** transforms standard browser viewport queries into a deep cybernetic diagnostics station. Built with a high-contrast dark sci-fi aesthetic, CRT scanline emulation, real-time matrix rain background, synthesized 8-bit Web Audio UI feedback, and over 50+ deep telemetry probes.

### 🌟 Key Highlights
- 🎯 **Accurate Resolution Matrix**: Distinguishes between Logical CSS Viewport, Physical Display Resolution (accounting for Device Pixel Ratio / DPR scaling), and Available Screen Workspaces.
- 🔬 **50+ Hardware & Browser Telemetry Probes**: Extracts WebGL unmasked GPU renderer info, CPU cores, memory limits, battery state, audio hardware characteristics, touch points, color gamut, HDR capabilities, and network connection parameters.
- ⚡ **Real-Time Display Refresh Rate (FPS)**: Dynamic `requestAnimationFrame` sampling engine for detecting 60Hz, 90Hz, 120Hz, 144Hz, 240Hz+ high-refresh gaming displays.
- 📱 **Interactive Resolution Comparator**: Compare your active screen against a catalog of 30+ device presets (iPhone 16 Pro Max, Galaxy S24 Ultra, Pixel 9, MacBook Pro 16", iPad Pro M4, Studio Display 5K, 4K/8K TVs, Ultrawides) with live PPI and diagonal aspect ratio calculations.
- 💻 **Integrated Cyber Terminal CLI**: Fully interactive shell with custom commands (`res`, `gpu`, `screen`, `net`, `dpr`, `export`, `matrix`, `benchmark`, `test`, `help`).
- 🎨 **Dead Pixel & Calibration Suite**: Fullscreen diagnostic mode supporting 8 color purities (Red, Green, Blue, White, Black, Magenta, Cyan, Yellow), gradient sweeps, checkerboard patterns, and keyboard navigation.
- 💾 **Multi-Format Dossier Export**: Instant export of diagnostic dossiers to raw JSON, formatted JSON, Markdown inspection report, or formatted ASCII system logs.
- 🔊 **Synthesized Web Audio Engine**: Zero external audio files; 100% procedural sound synthesis using the HTML5 Web Audio API oscillator nodes.

---

## 🛠️ Feature Modules

```
CYBER-RESOLUTION
 ├── 🖥️  Resolution Hero          -> Logical vs. Physical vs. Available Res + DPR + Aspect Ratio
 ├── 📊  Telemetry Dossier (50+)   -> 6 Security Matrix Cards (Display, GPU, Audio, Net, OS, Storage)
 ├── 📐  Resolution Suite          -> Device Comparison + PPI Calculator + Visual Aspect Radar
 ├── 💻  Hacker Terminal CLI       -> Built-in shell with command-line diagnostics
 ├── 🎯  Dead Pixel Tester         -> Fullscreen OLED/LCD screen testing & color purities
 └── 💾  Dossier Exporter          -> JSON / ASCII / Markdown diagnostic export
```

### 1. 🖥️ Screen & Display Diagnostics
- **Logical Resolution**: Viewport CSS dimensions (`window.screen.width` × `window.screen.height`).
- **Physical Pixel Matrix**: True hardware render pixels scaled by `window.devicePixelRatio`.
- **Available Canvas**: Usable workspace excluding OS docks/taskbars (`availWidth`, `availHeight`).
- **Window Positioning**: Live window offsets (`screenX`, `screenY`) and browser frame outer bounds.
- **Color Architecture**: Color depth, pixel depth, HDR dynamic range detection, Wide Color Gamut (`P3` / `sRGB`).
- **Orientation Matrix**: `screen.orientation` type and live rotation angle tracking.

### 2. 🎮 Hardware & WebGL Forensics
- **GPU Interrogation**: Unmasked WebGL renderer & vendor retrieval (`WEBGL_debug_renderer_info`).
- **WebGL Limits**: Maximum texture dimensions, max viewport dimensions, max renderbuffer samples, WebGPU support detection.
- **CPU & RAM Metrics**: Hardware concurrency logical core count (`navigator.hardwareConcurrency`) and estimated RAM ceiling (`navigator.deviceMemory`).
- **Battery Diagnostics**: Live charge percentage, charging state, and discharge ETA via Battery API.
- **Gamepad & Storage**: Connected controller detection and IndexedDB/StorageManager quota usage.

### 3. 🌐 Network & Geolocation Matrix
- **Connection Type**: 4G, 5G, Wi-Fi, Ethernet classification via Network Information API.
- **Bandwidth & Latency**: Downlink speed estimation (Mbps) and Round-Trip Time (RTT ms).
- **IP & Geolocation**: Client IP resolution, City, Region, Country, ISP, and ASN detection.

### 4. 🎛️ Audio & Speech Synthesis
- **Web Audio Context**: Hardware audio sample rate (e.g., 48,000 Hz) and max channel allocation.
- **Speech Engine**: Synthesis voice count and supported system voice profiles.

---

## ⌨️ Cyber Terminal Commands

Open the **Hacker Terminal CLI** tab inside the dashboard to execute commands directly:

| Command | Action |
| :--- | :--- |
| `help` | Lists all available terminal commands |
| `res` / `resolution` | Dumps current display resolution and device pixel ratio |
| `gpu` | Queries unmasked WebGL GPU hardware specs and max texture size |
| `screen` | Detailed breakdown of viewport, available screen, and color depth |
| `net` / `ip` | Network latency, downlink bandwidth, IP, and geolocation |
| `audio` | Queries system audio sample rate and audio channels |
| `fps` / `refresh` | Runs display refresh rate benchmark |
| `test` / `deadpixel` | Launches fullscreen dead pixel diagnostic tester |
| `export` | Opens the dossier export modal |
| `clear` / `cls` | Clears the terminal screen buffer |
| `matrix` | Toggles CRT scanline retro post-processing |
| `about` | Displays system build info and copyright manifest |

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack ready)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Fonts**: [Geist & Geist Mono](https://vercel.com/font)
- **Audio**: Web Audio API (Synthesized oscillators)
- **Graphics**: HTML5 Canvas (Matrix rain) & WebGL (GPU forensics)
- **Package Manager**: [pnpm](https://pnpm.io/) (v11+)

---

## 📁 Project Structure

```
whatismyscreenresolution/
├── app/
│   ├── favicon.ico             # Cyberpunk icon
│   ├── globals.css             # CRT scanlines, matrix glows, and theme styles
│   ├── layout.tsx              # Root layout, fonts, and SEO metadata
│   └── page.tsx                # Dashboard view controller & Matrix canvas
├── components/
│   ├── CyberLoader.tsx         # Glitch boot sequence animation
│   ├── CyberNavbar.tsx         # Real-time FPS monitor & status bar
│   ├── CyberTerminal.tsx       # Interactive hacker CLI shell
│   ├── DeadPixelTester.tsx     # Fullscreen color purity & calibration tool
│   ├── ExportModal.tsx         # JSON / ASCII / MD export dialog
│   ├── Icons.tsx               # Cyberpunk SVG icon library
│   ├── ResolutionHero.tsx      # Main screen resolution visualizer
│   ├── ResolutionSuite.tsx     # Device comparator & PPI calculator
│   └── TelemetryGrid.tsx       # 50+ categorized telemetry matrix cards
├── lib/
│   ├── cyberAudio.ts           # Procedural Web Audio API sound generator
│   ├── presets.ts              # 30+ device resolution database
│   └── telemetry.ts            # Client-side hardware extraction engine
├── public/                     # Static assets
├── package.json                # Project manifest & dependencies
└── tsconfig.json               # TypeScript configuration
```

---

## 🏁 Getting Started

### Prerequisites
- **Node.js**: `18.18.0` or later
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/developer-vikki/whatismyscreenresolution.git
   cd whatismyscreenresolution
   ```

2. **Install dependencies**:
   ```bash
   pnpm install

   ```

3. **Start the local development server**:
   ```bash
   pnpm dev

   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to enter the cybernetics workstation.

---

## 🔨 Available Scripts

| Script | Description |
| :--- | :--- |
| `pnpm dev` | Starts Next.js development server with hot-reloading |
| `pnpm build` | Builds optimized production bundle |
| `pnpm start` | Starts production Next.js server |
| `pnpm lint` | Runs ESLint analysis across codebase |

---

## 🔒 Privacy & Client-Side Execution

- All hardware interrogation probes run **100% client-side** in your browser sandbox.
- No hardware fingerprints, telemetry, or personal screen data are persisted or sent to external logging servers.
- Safe for benchmarking, display calibration, and development viewport inspection.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

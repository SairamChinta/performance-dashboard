# Performance-Critical Real-Time Data Visualization Dashboard

A **high-performance real-time dashboard** built with **Next.js 14 (App Router)** and **TypeScript**, capable of rendering and updating over **10,000 live data points at 60 FPS** — with **no chart libraries** and zero UI lag.  

This project demonstrates expertise in **React performance**, **Canvas rendering**, and **Next.js modern architecture**.

## Live Link
https://performance-dashboard-rho-bay.vercel.app/

## Quick Start

### 1. Clone & Install
git clone https://github.com/SairamChinta/performance-dashboard.git
cd performance-dashboard
npm install

### 2. Run Development Server
npm run dev

### 3. Production Build
npm run build
npm start

### Overview
This dashboard continuously streams simulated time-series data and renders it in real time using Canvas for high-speed visualization and SVG overlays for crisp UI elements like axes and labels.

Built entirely from scratch, without Chart.js, D3, or any external charting library — demonstrating true frontend performance engineering.

### Key Features
Feature	Description
60 FPS Rendering	Smooth GPU-accelerated updates using requestAnimationFrame
10,000+ Data Points	Real-time streaming and rendering every 100ms
Pan & Zoom Interactivity	Explore data dynamically with drag and scroll
Auto-Follow Mode	Automatically follows live data updates
5s Auto Resume	Automatically resumes "Follow Live" mode after inactivity
Canvas + SVG Hybrid	Canvas for speed, SVG for crisp UI overlays
Performance Monitor	Displays FPS and memory metrics in real time
Memory Safe	No leaks, tested for continuous long sessions
Responsive UI	Adapts to all screen sizes seamlessly

### Tech Stack
Layer	Technology
Framework	Next.js 14 (App Router)
Language	TypeScript
Rendering	HTML5 Canvas + SVG
State Management	React Hooks + Context API
Styling	TailwindCSS
Data Flow	Custom Hooks (no external libs)
Deployment	Vercel
Performance Profiling	React Profiler, Chrome DevTools

### Architecture Overview
Hybrid Rendering Architecture

React  →  Manages state, events, and interactivity
Canvas →  Renders 10k+ data points at 60fps
SVG    →  Displays crisp axes, labels, and overlays

### Architecture Principles
React handles state and user interactions only (no large DOM updates).

Canvas draws data directly to GPU layers for high frame rates.

SVG layers handle axes, grid lines, and textual overlays.

Data generation, rendering, and viewport transformations are fully decoupled for performance and scalability.

### Performance Optimizations
Optimization	Technique
Frame Rendering	requestAnimationFrame() loop for 60 FPS sync
Data Handling	Sliding window model to prevent memory growth
Re-renders	useMemo, useCallback, React.memo for stability
Canvas Scaling	Uses devicePixelRatio for crisp HD rendering
Viewport	Dynamic fit via ResizeObserver
Auto Follow	5s inactivity-based resume timer after user interaction
Memory Management	Cleanup via useEffect and ref-safe timeouts
Responsiveness	Real-time container-based resizing

### Key Components
File	Description
LineChart.tsx	Core canvas renderer handling 10k+ points
useDataStream.ts	Generates live simulated data stream
useChartRenderer.ts	Optimized rendering hook for Canvas
usePerformanceMonitor.ts	FPS and memory monitor hook
TimeRangeSelector.tsx	Time range controls and Follow Live toggle
DataTable.tsx	Virtualized data table for large sets

### Core Concepts
1. React Manages State, Canvas Does the Drawing
React controls data and interactivity, but does not render 10,000 DOM elements.
Heavy drawing is handled by Canvas via the 2D API for maximum performance.

2. Real-Time Data Stream
New data points arrive every 100ms, and old points are removed, creating a sliding window of 10,000 points.
This ensures constant memory usage and real-time updates.

3. Viewport Transformation
Functions like fitViewport, pan, and zoomAt map real-world time and values into pixel coordinates, enabling smooth zooming and panning.

4. Auto-Follow Mechanism
When users interact (pan or zoom):

setManual(true);
setTimeout(() => setManual(false), 5000);
After 5 seconds of inactivity, the chart automatically resumes “Follow Live” mode — similar to TradingView behavior.

### Performance Validation
Benchmark Results
Metric	Target	Achieved
FPS	60	60 FPS steady
Latency	<100ms	~45ms
Memory Growth	<1MB/hour	0.6MB/hour
Data Points	10,000	Stable at 10,000+
Frame Drops	None	Zero over 1 hour run

### Folder Structure
```bash
performance-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── data/
│   │       └── route.ts
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── charts/
│   │   ├── LineChart.tsx
│   ├── controls/
│   │   └── TimeRangeSelector.tsx
│   ├── ui/
│   │   ├── DataTable.tsx
│   │   └── PerformanceMonitor.tsx
│   └── providers/
│       └── DataProvider.tsx
│
├── hooks/
│   ├── useDataStream.ts
│   ├── useChartRenderer.ts
│   ├── usePerformanceMonitor.ts
│   └── useVirtualization.ts
│
├── lib/
│   ├── dataGenerator.ts
│   ├── canvasUtils.ts
│   ├── performanceUtils.ts
│   ├── viewport.ts
│   └── types.ts
│
├── public/
│   └── screenshots/
│       ├── chart.png
│       ├── stats.png
│       └── table.png
│
├── README.md
├── PERFORMANCE.md
├── next.config.js
└── tsconfig.json

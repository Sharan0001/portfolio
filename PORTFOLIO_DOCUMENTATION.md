# Sharan V — AI Systems Engineer Portfolio
## Complete Technical Documentation

**Author:** Sharan V  
**Framework:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion  
**Date:** February 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project Architecture](#3-project-architecture)
4. [Design System](#4-design-system)
5. [Page Structure](#5-page-structure)
6. [Core Sections — Detailed Breakdown](#6-core-sections--detailed-breakdown)
7. [Animated Background Components](#7-animated-background-components)
8. [UI Utility Components](#8-ui-utility-components)
9. [Data Layer](#9-data-layer)
10. [CSS Architecture](#10-css-architecture)
11. [Key Design Decisions](#11-key-design-decisions)
12. [Running the Project](#12-running-the-project)
13. [Deployment Guide](#13-deployment-guide)

---

## 1. Project Overview

This is a personal portfolio website designed for **Sharan V**, an AI Systems Engineer specializing in Decision Intelligence, Computer Vision, and Explainable AI. The site showcases three production-grade AI systems with interactive demonstrations, animated backgrounds, and a modern dark-mode SaaS aesthetic.

### Goals
- **Establish professional identity** as an AI systems engineer (not just a ML model builder)
- **Showcase depth** through expandable project cards with architecture diagrams
- **Demonstrate live AI reasoning** via an interactive Decision Intelligence demo
- **Create visual impact** with 8 unique animated background layers themed around AI/ML

### Design Philosophy
- **Dark mode default** with graphite/steel-blue/teal palette
- **SaaS-grade aesthetic** inspired by Stripe, Linear, Vercel
- **No AI clichés** — no neon purple, no cyberpunk, no skill bars
- **Readability first** — all animated backgrounds are subtle, behind content

---

## 2. Tech Stack & Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | React framework (App Router) |
| `react` | 19.2.3 | UI rendering library |
| `react-dom` | 19.2.3 | DOM rendering |
| `framer-motion` | 12.34.3 | Animations, transitions, scroll-linked effects |
| `lucide-react` | 0.575.0 | Icon library (minimal, tree-shakeable) |
| `clsx` | 2.1.1 | Conditional CSS class merging |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 4.x | Utility-first CSS framework (v4 with `@theme`) |
| `@tailwindcss/postcss` | 4.x | PostCSS integration for Tailwind |
| `typescript` | 5.x | Static typing |
| `eslint` + `eslint-config-next` | 9.x / 16.1.6 | Linting |

---

## 3. Project Architecture

```
portfolio/
├── public/
│   ├── avatar.jpeg              # AI avatar (3D cartoon-style)
│   └── Sharan_V_Resume.pdf      # Downloadable resume
├── src/
│   ├── app/
│   │   ├── globals.css           # Design system + animations (213 lines)
│   │   ├── layout.tsx            # Root layout (Inter font, dark mode, SEO)
│   │   └── page.tsx              # Single-page assembly (all sections)
│   ├── components/
│   │   ├── hero/
│   │   │   └── Hero.tsx          # Hero section with avatar + typing animation
│   │   ├── systems/
│   │   │   ├── SystemsShowcase.tsx   # Project cards wrapper
│   │   │   ├── SystemCard.tsx        # Expandable project card
│   │   │   └── ArchitectureDiagram.tsx # SVG architecture visualization
│   │   ├── demo/
│   │   │   └── DecisionDemo.tsx      # Interactive risk engine demo
│   │   ├── philosophy/
│   │   │   └── PhilosophySection.tsx  # Click-to-reveal philosophy cards
│   │   ├── tech/
│   │   │   └── TechDepth.tsx         # Layered tech stack with tooltips
│   │   ├── timeline/
│   │   │   └── Timeline.tsx          # Vertical timeline (3 years)
│   │   ├── contact/
│   │   │   └── Contact.tsx           # Social links + resume download
│   │   └── ui/                       # Animated background components
│   │       ├── NeuralBackground.tsx   # Canvas particle network
│   │       ├── FloatingIcons.tsx      # Floating AI/ML SVG icons
│   │       ├── DataFlowLines.tsx      # Animated data pipeline streams
│   │       ├── PulseRings.tsx         # Teal radar/signal rings
│   │       ├── GeometricShapes.tsx    # Floating hexagons/diamonds
│   │       ├── CircuitBoard.tsx       # PCB traces with traveling dots
│   │       ├── DataRain.tsx           # Rising mathematical symbols
│   │       ├── GradientMesh.tsx       # Shifting gradient orbs
│   │       └── CursorGlow.tsx         # Mouse-following radial glow
│   └── data/
│       ├── projects.ts           # 3 project definitions
│       ├── philosophy.ts         # 4 engineering philosophy cards
│       └── tech-stack.ts         # 5-layer technology breakdown
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## 4. Design System

### Color Palette

Defined as CSS custom properties in `globals.css` using Tailwind v4's `@theme inline` syntax:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-graphite` | `#0F1115` | Page background |
| `--color-graphite-light` | `#161A20` | Card backgrounds, alternating sections |
| `--color-graphite-lighter` | `#1C2028` | Hover states, subtle fills |
| `--color-graphite-border` | `#2A2E36` | Borders, dividers |
| `--color-steel` | `#3A6EA5` | Primary accent (links, badges, highlights) |
| `--color-steel-dim` | `#2D5A8A` | Hover accent |
| `--color-teal` | `#2F6F6F` | Secondary accent (demo section) |
| `--color-teal-dim` | `#245858` | Hover secondary |
| `--color-warm` | `#D6D3D1` | Warm neutral text |
| `--color-text-primary` | `#F5F5F5` | Headings, primary text |
| `--color-text-muted` | `#9CA3AF` | Body text, descriptions |
| `--color-text-dim` | `#6B7280` | Labels, metadata |

### Typography

| Font | Stack | Usage |
|------|-------|-------|
| **Inter** | `'Inter', system-ui, sans-serif` | All body/heading text |
| **JetBrains Mono** | `'JetBrains Mono', 'Fira Code', monospace` | Code, labels, badges |

---

## 5. Page Structure

**File:** `src/app/page.tsx`

The site is a **single-page application** assembled from 7 sections with gradient dividers:

```
<main>
  <CursorGlow />               ← Mouse-following glow (global)
  <FloatingIcons />             ← Fixed AI/ML icons (global, z-0)
  <div z-10>
    <Hero />                    ← Avatar + typing animation
    ── section-divider ──
    <SystemsShowcase />         ← 3 expandable project cards
    ── section-divider ──
    <DecisionDemo />            ← Interactive risk engine
    ── section-divider ──
    <PhilosophySection />       ← 4 engineering approach cards
    ── section-divider ──
    <TechDepth />               ← Layered tech stack
    ── section-divider ──
    <Timeline />                ← 3-year progression
    ── section-divider ──
    <Contact />                 ← Social links + resume
  </div>
</main>
```

**Layout file** (`layout.tsx`) provides:
- Inter font via `next/font/google`
- `<html className="dark">` for dark mode
- SEO metadata (title, description, viewport)

---

## 6. Core Sections — Detailed Breakdown

### 6.1 Hero Section

**File:** `src/components/hero/Hero.tsx` (~207 lines)

The Hero is a full-viewport section with three visual layers:

**Layer 1 — Backgrounds:**
- Animated CSS grid (`animated-grid` class with `grid-drift` keyframe)
- Canvas-based `NeuralBackground` particle network
- Gradient overlay fading to graphite at the bottom

**Layer 2 — Content (left side):**
- **Typing animation** — Cycles through 3 roles:
  - "AI Systems Engineer"
  - "Decision Intelligence Builder"
  - "Applied Machine Learning Developer"
- Uses `useState` + `useEffect` to type characters at 60ms, delete at 35ms, with 2s hold
- Blinking cursor indicator (CSS `animate-pulse`)
- **Main heading** — "Designing *Intelligent Systems*, Not Just Models."
  - "Intelligent Systems" uses `shimmer-text` CSS class for gradient animation
- **CTAs** — View Systems (anchor to #systems), Download Resume (PDF link), GitHub

**Layer 3 — Avatar (right side, desktop only):**
- 288px circular avatar image (`/avatar.jpeg`)
- **Rotating conic-gradient glow ring** — `conic-gradient(steel → teal → steel)` with 12s rotation
- **Two orbital rings** — Small dots orbiting at 16s (clockwise) and 22s (counter-clockwise)
- **Float animation** — Gentle 5s up-down bob (±8px)
- **"Open to Opportunities"** badge — Slides in after 1.2s delay

**Scroll indicator:** Bouncing arrow at bottom center

---

### 6.2 Intelligent Systems (Projects)

**Files:**
- `src/components/systems/SystemsShowcase.tsx` — Wrapper with title + DataFlowLines background
- `src/components/systems/SystemCard.tsx` — Expandable card component
- `src/components/systems/ArchitectureDiagram.tsx` — SVG architecture visualization

**Three projects showcased:**

| # | Project | Domain |
|---|---------|--------|
| 1 | PPE Compliance Intelligence | Computer Vision |
| 2 | AI Document Intelligence Platform | NLP |
| 3 | Project Delay Risk & Decision Intelligence | Decision Intelligence |

**SystemCard features:**
- Collapsed state: domain badge, project name, one-line description, tech tags
- **Expand/collapse** on click (Framer Motion `AnimatePresence`)
- **View toggle:** "System View" (architecture diagram + engineering decisions) vs "Technical View" (tradeoffs)
- **ArchitectureDiagram:** SVG with numbered layer nodes, animated flowing arrows between layers

---

### 6.3 Decision Intelligence Demo

**File:** `src/components/demo/DecisionDemo.tsx` (~260 lines)

An **interactive counterfactual reasoning demo** that simulates a risk engine.

**How it works:**
1. Base risk score = 73 (HIGH)
2. Three toggleable interventions:
   - **Add Resource** → −18% risk
   - **Reduce Dependencies** → −14% risk
   - **Improve Process** → −11% risk
3. Toggling interventions updates the score in real-time
4. Risk level transitions: HIGH (≥70) → MEDIUM (≥40) → LOW
5. Color changes: Red → Amber → Green
6. Each intervention shows an **explainability text** describing which ML features are affected

**Technical approach:**
- `useState` manages active interventions as `Record<string, boolean>`
- `useCallback` for toggle handler optimization
- Animated risk bar and score with Framer Motion `animate` prop
- `AnimatePresence` for explanation text transitions

**Background:** `PulseRings` — teal concentric radar rings

---

### 6.4 Engineering Philosophy

**File:** `src/components/philosophy/PhilosophySection.tsx` (~87 lines)

Four click-to-reveal cards showing engineering principles:

| Card | Icon | Philosophy |
|------|------|-----------|
| Systems Over Models | Layers | Building complete systems, not just training models |
| Explainability First | Eye | If AI can't explain itself, it shouldn't be deployed |
| Every Decision is a Tradeoff | GitBranch | Documenting technical tradeoffs explicitly |
| Deployment is the Goal | Cpu | Every system designed for production from day one |

**Interaction:** Click a card to expand/collapse the detail section using `AnimatePresence` with height animation.

**Background:** `GeometricShapes` — Floating hexagons, diamonds, triangles, plus signs

---

### 6.5 Technical Depth

**File:** `src/components/tech/TechDepth.tsx` (~110 lines)

Technology stack organized by **5 system layers**, each with color-coded indicators:

| Layer | Color | Technologies |
|-------|-------|-------------|
| AI Layer | Steel Blue | YOLOv8, SHAP, LIME, XGBoost, Scikit-learn, Hugging Face, LangChain |
| Data Layer | Teal | Pandas, NumPy, Synthetic Data, Feature Engineering, SQL |
| Backend Layer | Brown | FastAPI, Flask, REST APIs, WebSockets, Celery |
| Frontend Layer | Green | React, Next.js, TypeScript, Tailwind CSS, Framer Motion |
| Infrastructure | Purple | Docker, GitHub Actions, Vercel, Render, PostgreSQL |

**Interaction:** Hover any technology badge to see a **tooltip** with specific usage context (e.g., "YOLOv8: Used for real-time PPE detection with custom-trained models on construction site imagery").

**Background:** `CircuitBoard` — PCB traces with glowing traveling dots

---

### 6.6 Engineering Evolution (Timeline)

**File:** `src/components/timeline/Timeline.tsx` (~102 lines)

A **vertical timeline** with 3 entries representing skill progression:

| Year | Focus | Project |
|------|-------|---------|
| Year 1 | Computer Vision Systems | PPE Compliance Intelligence |
| Year 2 | Document Intelligence | AI Document Intelligence Platform |
| Year 3 | Decision Intelligence Architecture | Project Delay Risk & Decision Intelligence |

**Layout:** Alternating left/right on desktop (even items on left with right-aligned text, odd items on right). Single-column with left border on mobile.

**Animations:** Each entry slides up with `whileInView` trigger and staggered delays.

**Background:** `DataRain` — Rising mathematical symbols (∑, ∂, λ, π, 0, 1)

---

### 6.7 Contact Section

**File:** `src/components/contact/Contact.tsx` (~92 lines)

**Elements:**
- **Avatar** — 80px circular image with `glow-border` animation and green online indicator
- **Heading** — "Get in Touch" + "Let's build something intelligent together."
- **Social links** — GitHub, LinkedIn, Email (as styled button links)
- **Resume download** — Primary CTA linking to `/Sharan_V_Resume.pdf`
- **Footer** — "Built with intention. Designed for clarity." + copyright

**Links:**
- GitHub: `https://github.com/Sharan0001`
- LinkedIn: `https://linkedin.com/in/sharan-v-profile`
- Email: `sharansworking@gmail.com`

**Background:** `GradientMesh` — Soft shifting gradient orbs (steel blue + teal)

---

## 7. Animated Background Components

Every section has a unique animated background. All are `pointer-events-none` and sit behind content (section-container has `z-index: 5`).

### Summary Table

| Component | Section | Technology | Description |
|-----------|---------|------------|-------------|
| `NeuralBackground` | Hero | Canvas 2D | 45 floating particles connected by proximity lines. Particles drift with random velocity vectors. Connections drawn when distance < 120px. Steel blue color at 20% opacity. |
| `FloatingIcons` | Global (fixed) | Framer Motion SVG | 6 AI/ML themed SVG icons (neural layer, data cluster, tensor, decision tree, graph network, data grid). Each floats independently on a multi-point animation path over 10-18s cycles. 10% opacity. |
| `DataFlowLines` | Systems | SVG + CSS Animation | 4 dashed horizontal paths with dots traveling along them at different speeds (8-18s). Paths span full viewport width at different vertical positions. |
| `PulseRings` | Decision Demo | Canvas 2D | 6 concentric circles expanding outward from right-center. Teal colored. Each ring fades from 8% to 0% opacity as it expands. New rings spawn continuously. |
| `GeometricShapes` | Philosophy | Framer Motion SVG | 6 SVG shapes (hexagon, diamond, triangle, plus, concentric circles, grid) positioned absolutely. Each floats, rotates, and scales on 9-13s animation cycles. 15% opacity. |
| `CircuitBoard` | Tech Depth | Canvas 2D | 12 randomly generated PCB traces (orthogonal line segments). Static traces at 6% opacity. Glowing dots travel along each trace path. Node dots at intersections. |
| `DataRain` | Timeline | Canvas 2D | 35 mathematical characters (01∑∏∫λΔΘ∂∇αβγηπσω) floating upward at varying speeds. Size 10-14px monospace. Respawn at bottom when reaching top. 5-17% opacity. |
| `GradientMesh` | Contact | Canvas 2D | 3 radial gradient orbs (steel blue + teal) that slowly orbit and shift position using sine/cosine functions. Each orb has radius 160-200px at 6% opacity. |

### Canvas Performance Notes
- All canvas components use `requestAnimationFrame` for smooth 60fps rendering
- All handle `resize` events and use `devicePixelRatio` for crisp rendering on Retina displays
- All clean up animation frames and event listeners in `useEffect` cleanup

---

## 8. UI Utility Components

### CursorGlow (`ui/CursorGlow.tsx`)
- A 500×500px radial gradient that follows the mouse cursor
- Uses `mousemove` event listener on `window`
- Hidden on touch devices via initial opacity 0, shown on first mouse move
- Fixed positioning, `z-index: 0`, `pointer-events: none`
- Color: `rgba(58, 110, 165, 0.08)` — extremely subtle steel blue glow

---

## 9. Data Layer

### Projects (`data/projects.ts`)
Each project has the following TypeScript interface:

```typescript
interface Project {
  id: string;
  title: string;
  domain: string;
  oneLiner: string;
  tech: string[];
  problem: string;
  architecture: string[];    // System architecture layers
  engineeringDecisions: {
    decision: string;
    reasoning: string;
  }[];
  tradeoffs: {
    choice: string;
    alternative: string;
    reason: string;
  }[];
}
```

### Philosophy Cards (`data/philosophy.ts`)
```typescript
interface PhilosophyCard {
  title: string;
  icon: string;     // Maps to Lucide icon name
  summary: string;  // Visible in collapsed state
  detail: string;   // Revealed on click
}
```

### Tech Stack (`data/tech-stack.ts`)
```typescript
interface TechLayer {
  layer: string;
  items: {
    name: string;
    usage: string;   // Contextual tooltip content
  }[];
}
```

---

## 10. CSS Architecture

**File:** `src/app/globals.css` (213 lines)

### CSS Features

| Feature | Class/Keyframe | Description |
|---------|---------------|-------------|
| **Animated Grid** | `.animated-grid` + `@keyframes grid-drift` | Subtle drifting grid lines (steel blue 6% opacity, 60px spacing, 20s cycle) |
| **Cursor Glow** | `.cursor-glow` | 500px radial gradient following cursor |
| **Tech Badge** | `.tech-badge` | Styled inline badge with hover effect |
| **Card Shine** | `.card-shine` | Moving light sweep on hover (left→right gradient) |
| **Shimmer Text** | `.shimmer-text` + `@keyframes shimmer` | Animated gradient text (steel→teal→steel) with 4s cycle for accent headings |
| **Glow Pulse** | `.glow-border` + `@keyframes glow-pulse` | Pulsing box-shadow animation (3s cycle) |
| **Flow Arrow** | `.flow-arrow` + `@keyframes flow-pulse` | Opacity pulsing for architecture diagram arrows |
| **Section Container** | `.section-container` | Max-width 1200px, centered, with `z-index: 5` |
| **Section Divider** | `.section-divider` | 1px gradient line (transparent → steel → teal → transparent) |
| **Scrollbar** | `::-webkit-scrollbar` | Custom 6px scrollbar matching theme |
| **Selection** | `::selection` | Steel blue highlight on text selection |

---

## 11. Key Design Decisions

### Why Single-Page?
For a portfolio, a single-page scroll is optimal — recruiters/hiring managers want to scan quickly. Dedicated project sub-pages can be added later if needed.

### Why Canvas for Backgrounds?
Canvas-based animations (NeuralBackground, CircuitBoard, PulseRings, DataRain, GradientMesh) are more performant than DOM-based animations for many moving elements. They run on the GPU and don't trigger layout reflows.

### Why Not Traditional Skill Bars?
The TechDepth section uses contextual tooltips instead of percentage bars because:
1. Skill percentages are meaningless (75% of Python means nothing)
2. Contextual usage demonstrates real-world application
3. Organized by system layer, not arbitrary proficiency

### Why Framer Motion?
- Provides `whileInView` for scroll-triggered animations (no Intersection Observer boilerplate)
- `AnimatePresence` handles exit animations
- Layout animations for accordion cards
- Works natively with React and SSR

### Avatar Over Architecture Diagram
The hero originally used an SVG architecture diagram. Replacing it with the AI avatar makes the site feel more personal and memorable. The architecture concepts are already demonstrated in the Systems section.

---

## 12. Running the Project

### Prerequisites
- Node.js 18+ and npm

### Development
```bash
# Navigate to project
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 13. Deployment Guide

### Vercel (Recommended)
1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js — no configuration needed
4. Custom domain can be added in project settings

### Netlify
1. Push to GitHub
2. Import project, set build command to `npm run build`
3. Set output directory to `.next`

### Manual
1. Run `npm run build`
2. Upload `.next/` directory to any Node.js hosting
3. Run `npm start` with `PORT` environment variable

---

## File Size Summary

| Category | Files | Total Lines (approx) |
|----------|-------|---------------------|
| Core App (layout, page, css) | 3 | ~280 |
| Section Components | 7 | ~980 |
| UI/Animation Components | 9 | ~720 |
| Data Files | 3 | ~320 |
| **Total** | **24** | **~2,300** |

---

*This document was generated on February 25, 2026. For the latest code, refer to the source files in the `portfolio/src/` directory.*

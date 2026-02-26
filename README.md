# Sharan — AI Systems Engineer Portfolio

> **"Designing Intelligent Systems, Not Just Models."**

A production-grade portfolio website showcasing three AI/ML systems with full architectural depth, evaluation rigor, and interview-ready engineering explanations. Built with Next.js 16, React 19, Framer Motion, and a custom dark-mode design system.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Page Sections](#page-sections)
- [Data Layer](#data-layer)
- [Component Reference](#component-reference)
- [Animated Backgrounds](#animated-backgrounds)
- [Featured Projects](#featured-projects)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Design Principles](#design-principles)

---

## Live Demo

```
http://localhost:3000
```

---

## Tech Stack

| Layer          | Technology                                                               |
|----------------|--------------------------------------------------------------------------|
| **Framework**  | Next.js 16.1.6 (App Router, Turbopack)                                  |
| **UI Library** | React 19.2.3 + TypeScript 5                                             |
| **Styling**    | Tailwind CSS 4 + custom CSS variables (dark-mode design system)          |
| **Animations** | Framer Motion 12.34 (scroll-triggered, layout, spring physics)           |
| **Icons**      | Lucide React 0.575                                                       |
| **Font**       | Inter (Google Fonts, `next/font` optimized)                              |
| **Utilities**  | clsx (conditional classNames)                                            |

---

## Project Architecture

```
portfolio/
├── public/
│   └── avatar.jpeg              # AI avatar image (3D cartoon style)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout — Inter font, metadata, dark mode
│   │   ├── page.tsx             # Main page — section composition
│   │   ├── globals.css          # Design system tokens + base styles
│   │   └── favicon.ico
│   ├── components/              # Feature components (10 directories)
│   │   ├── hero/                # Hero section with avatar showcase
│   │   ├── systems/             # Project cards (3-tab: System/Technical/Evaluation)
│   │   ├── demo/                # Interactive Decision Intelligence demo
│   │   ├── evaluation/          # Evaluation components (metrics, bars, panel)
│   │   ├── philosophy/          # Engineering philosophy cards
│   │   ├── tech/                # Technical depth / stack visualization
│   │   ├── lifecycle/           # Model lifecycle pipeline
│   │   ├── timeline/            # Career/learning timeline
│   │   ├── contact/             # Contact section with links
│   │   └── ui/                  # Reusable UI + animated backgrounds (9 files)
│   └── data/                    # Static data layer (typed TypeScript)
│       ├── projects.ts          # Project definitions (3 projects)
│       ├── evaluation.ts        # Evaluation data (metrics, decisions, limitations)
│       ├── philosophy.ts        # Engineering philosophy cards
│       └── tech-stack.ts        # Tech stack by layer
└── package.json
```

---

## Page Sections

The portfolio is a single-page application with **8 sections**, each with its own animated background:

| #  | Section                            | Component               | Background Animation        |
|----|------------------------------------|--------------------------|-----------------------------|
| 1  | **Hero**                           | `Hero.tsx`               | `NeuralBackground` + grid   |
| 2  | **Intelligent Systems**            | `SystemsShowcase.tsx`    | `DataFlowLines`             |
| 3  | **Decision Intelligence Demo**     | `DecisionDemo.tsx`       | `PulseRings`                |
| 4  | **Engineering Philosophy**         | `PhilosophySection.tsx`  | `GeometricShapes`           |
| 5  | **Technical Depth**                | `TechDepth.tsx`          | `CircuitBoard`              |
| 6  | **Model Lifecycle**                | `ModelLifecycle.tsx`     | —                           |
| 7  | **Timeline**                       | `Timeline.tsx`           | `DataRain`                  |
| 8  | **Contact**                        | `Contact.tsx`            | `GradientMesh`              |

**Section composition** is in `src/app/page.tsx` — each section is separated by a `<div className="section-divider" />`.

---

## Data Layer

All content is driven by strongly-typed TypeScript data files in `src/data/`. No hardcoded strings in components.

### `projects.ts` — Project Definitions

Defines the `ProjectData` interface and 3 project entries:

```typescript
interface ProjectData {
  id: string;                    // "ppe" | "doc-intel" | "delay-risk"
  name: string;                  // Display name
  domain: string;                // E.g. "Computer Vision · Safety Compliance"
  stack: string[];               // Tech badges
  impact: string;                // One-line impact statement
  problem: string;               // Problem description (System View)
  architectureLayers: string[];  // Architecture diagram steps
  engineeringDecisions: string[];// Key decisions (Technical View)
  deploymentStack: string[];     // Deployment platforms
  tradeoffs: string[];           // Known trade-offs
  liveUrl?: string;              // Optional live demo URL
  githubUrl?: string;            // Optional GitHub URL
}
```

### `evaluation.ts` — Evaluation Intelligence

The most data-rich file (~250 lines). Contains per-project evaluation data extracted from actual project READMEs and source code:

```typescript
interface ProjectEvaluation {
  projectId: string;
  metrics: Metric[];                    // Model type, thresholds, class counts
  featureImportance?: FeatureImportance[]; // Per-feature risk direction + importance
  engineeringDecisions: EngineeringDecisionDetail[]; // Decision/Reasoning/Tradeoff/Production
  limitations: Limitation[];            // Categorized: data | model | deployment | scalability
  interviewDefense: InterviewDefense[]; // Q&A pairs for interview preparation
  deploymentNotes: DeploymentNote[];    // Platform, cold start, model artifacts
}
```

**Engineering Decisions** are structured with 4 fields each:
- `decision` — What was decided
- `reasoning` — Why this approach was chosen
- `tradeoff` — What was sacrificed
- `productionImplication` — How it would change in production

**Interview Defense** contains 4–5 Q&A pairs per project, e.g.:
- *"Why not use GPT-4 for document extraction?"*
- *"Why Logistic Regression over XGBoost?"*
- *"Why 60/40 rule-ML weighting?"*

### `philosophy.ts` — Engineering Philosophy

4 philosophy cards with title, summary, and detailed explanation:
1. Deterministic + Probabilistic Hybrid Thinking
2. Explainability Before Accuracy
3. Architecture Over Notebooks
4. Systems Thinking Over Model Obsession

### `tech-stack.ts` — Technical Stack

Technologies organized by layer (AI, Data, Backend, Frontend, Infrastructure) with per-project usage notes.

---

## Component Reference

### Hero (`src/components/hero/Hero.tsx`)
- Animated title with staggered letter reveal
- AI avatar (288px circular frame) with rotating conic-gradient glow ring, orbiting dots, and "Open to Opportunities" status badge
- CTA buttons (Resume, GitHub)
- `NeuralBackground` particle network + animated grid overlay

### SystemsShowcase (`src/components/systems/SystemsShowcase.tsx`)
- Renders all 3 projects as expandable `SystemCard` components
- `DataFlowLines` animated background with traveling dots along pipeline paths

### SystemCard (`src/components/systems/SystemCard.tsx`)
**3-tab expandable project card** — the core of the portfolio's technical depth:

| Tab            | Content                                                                                |
|----------------|----------------------------------------------------------------------------------------|
| System View    | Problem statement + Architecture diagram (animated layered flow)                        |
| Technical View | Key engineering decisions + Deployment stack + Trade-offs                                |
| **Evaluation** | Metrics grid, feature importance bars, structured decisions (WHY/TRADEOFF/PRODUCTION), limitations, deployment notes, collapsible interview defense Q&A |

The Evaluation tab uses:
- `MetricCard` — Individual metric display (label/value/note)
- `FeatureImportanceBars` — Animated horizontal bars with risk direction (↑risk/↓risk)
- `EvaluationPanel` — Full assembly of all evaluation sub-components

### DecisionDemo (`src/components/demo/DecisionDemo.tsx`)
**Interactive what-if risk engine** demonstrating counterfactual reasoning from the Delay Risk project:

- **3 intervention toggles**: Add Resource, Reduce Dependencies, Improve Process
- **Separate scoring channels**: Rule Score (base 82/100) and ML Probability (base 0.68)
- **Live hybrid formula**: `0.6 × RuleScore + 0.4 × MLProb × 100 = FinalScore`
- Each toggle shows dual impact: `Rule −15 · ML −12%`
- 3-column breakdown card (Rule Score / ML Prob / Final) with animated values
- Explanation panel showing which features are affected by each intervention

### EvaluationPanel (`src/components/evaluation/EvaluationPanel.tsx`)
Assembles 6 sub-sections for each project:
1. **Metrics Grid** — 2–3 column grid of `MetricCard` components
2. **Feature Importance** — Animated `FeatureImportanceBars` with scroll-triggered fill
3. **Engineering Decisions From the Build** — Structured cards with colored labels (WHY / TRADEOFF / PRODUCTION)
4. **Known Limitations** — Categorized by type (data, model, deployment, scalability)
5. **System Performance & Deployment** — 2-column deployment notes grid
6. **Interview Defense** — Collapsible Q&A accordion

### ModelLifecycle (`src/components/lifecycle/ModelLifecycle.tsx`)
**5-stage animated pipeline** showing the end-to-end model lifecycle:

```
Data In → Feature Eng → Model Train → Evaluate → Deploy
```

Plus 3 annotation cards:
- **No Black Boxes** — Every decision accompanied by an explanation
- **Deterministic by Default** — Same input → same output
- **Limitations Documented** — Every project documents what it can't do

### PhilosophySection (`src/components/philosophy/PhilosophySection.tsx`)
- 4 expandable philosophy cards with flip animation on hover/click
- `GeometricShapes` background (floating hexagons, diamonds, triangles)

### TechDepth (`src/components/tech/TechDepth.tsx`)
- Tech stack visualization organized by layer (AI → Data → Backend → Frontend → Infrastructure)
- `CircuitBoard` animated background with PCB traces and traveling dots

### Timeline (`src/components/timeline/Timeline.tsx`)
- Career and learning timeline with animated entry transitions
- `DataRain` background (rising math symbols: ∑, ∂, λ, π, binary)

### Contact (`src/components/contact/Contact.tsx`)
- Call-to-action section with GitHub, LinkedIn, Resume, and Email links
- AI avatar (80px) with glow-border pulse and green online indicator
- `GradientMesh` background (shifting glow orbs)

---

## Animated Backgrounds

Every section has a unique animated background component in `src/components/ui/`:

| Component           | Effect                                                    | Used In         |
|----------------------|----------------------------------------------------------|-----------------|
| `NeuralBackground`   | Particle network with connecting lines                    | Hero            |
| `DataFlowLines`      | Horizontal pipeline paths with traveling dots             | Systems         |
| `PulseRings`         | Concentric teal radar rings pulsing outward               | DecisionDemo    |
| `GeometricShapes`    | Floating hexagons, diamonds, and triangles                | Philosophy      |
| `CircuitBoard`       | PCB traces with glowing traveling dots                    | TechDepth       |
| `DataRain`           | Rising math symbols (∑, ∂, λ, π, 01)                     | Timeline        |
| `GradientMesh`       | Soft shifting glow orbs with blur                         | Contact         |
| `FloatingIcons`      | Global floating AI/ML icons (fixed, pointer-events-none) | Full page       |
| `CursorGlow`         | Subtle radial glow following cursor position              | Full page       |

All backgrounds use Framer Motion for animation and are rendered with `pointer-events-none` + low opacity to not interfere with content readability.

---

## Featured Projects

### 1. PPE Compliance Intelligence
| Aspect      | Detail                                                             |
|-------------|---------------------------------------------------------------------|
| Domain      | Computer Vision · Safety Compliance                                 |
| Model       | YOLOv8 (custom-trained, 8 PPE classes)                              |
| Key Feature | Heuristic compliance scoring (compliant / total detections)         |
| Stack       | YOLO, Python, Docker, OpenCV, NumPy                             |
| Deployment  | Render (Docker container)                                       |
| Live        | [ppe-compliance-dashboard.onrender.com](https://ppe-compliance-dashboard.onrender.com/) |

### 2. AI Document Intelligence Platform
| Aspect      | Detail                                                             |
|-------------|---------------------------------------------------------------------|
| Domain      | NLP · Document Processing                                           |
| Model       | Hybrid clause detection (keyword rules + Sentence Transformer)      |
| Key Feature | No LLM — deliberate choice for deterministic, auditable outputs     |
| Stack       | FastAPI, Sentence Transformers, pdfplumber, OCR, SQLite, React, TS  |
| Deployment  | Vercel (Frontend), Hugging Face Spaces (Backend)                    |
| Live        | [ai-document-intelligence-frontend.vercel.app](https://ai-document-intelligence-frontend.vercel.app/) |

### 3. Project Delay Risk & Decision Intelligence
| Aspect      | Detail                                                             |
|-------------|---------------------------------------------------------------------|
| Domain      | Decision Intelligence · Predictive AI                               |
| Model       | Logistic Regression + Random Forest, hybrid scoring (60% rules + 40% ML) |
| Key Feature | Explainable what-if counterfactual reasoning                        |
| Stack       | FastAPI, React, TypeScript, Scikit-learn, Pandas, Framer Motion     |
| Deployment  | Render (Backend), Vercel (Frontend)                                 |
| Live        | [project-delay-risk-ai-frontend.vercel.app](https://project-delay-risk-ai-frontend.vercel.app) |

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

### Deploy

The app is optimized for **Vercel** deployment:

```bash
npx vercel
```

Or deploy to any platform supporting Next.js (Netlify, Railway, etc.).

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout with Inter font + SEO metadata
│   ├── page.tsx                 # Section composition (8 sections)
│   ├── globals.css              # Design tokens (--color-graphite, --color-steel, etc.)
│   └── favicon.ico
├── components/
│   ├── hero/
│   │   └── Hero.tsx             # Hero with avatar, CTA, neural background
│   ├── systems/
│   │   ├── SystemsShowcase.tsx  # Project grid wrapper
│   │   ├── SystemCard.tsx       # 3-tab expandable card (System/Technical/Evaluation)
│   │   └── ArchitectureDiagram.tsx # Animated layer diagram
│   ├── demo/
│   │   └── DecisionDemo.tsx     # Interactive hybrid risk engine with live formula
│   ├── evaluation/
│   │   ├── MetricCard.tsx       # Individual metric display
│   │   ├── FeatureImportanceBars.tsx # Animated importance bars
│   │   └── EvaluationPanel.tsx  # Full evaluation assembly
│   ├── philosophy/
│   │   └── PhilosophySection.tsx # 4 philosophy cards
│   ├── tech/
│   │   └── TechDepth.tsx        # Tech stack by layer
│   ├── lifecycle/
│   │   └── ModelLifecycle.tsx   # 5-stage pipeline + principle cards
│   ├── timeline/
│   │   └── Timeline.tsx         # Career timeline
│   ├── contact/
│   │   └── Contact.tsx          # Contact links with avatar
│   └── ui/
│       ├── NeuralBackground.tsx # Particle network animation
│       ├── DataFlowLines.tsx    # Pipeline path animation
│       ├── PulseRings.tsx       # Radar ring animation
│       ├── GeometricShapes.tsx  # Floating geometric shapes
│       ├── CircuitBoard.tsx     # PCB trace animation
│       ├── DataRain.tsx         # Rising math symbols
│       ├── GradientMesh.tsx     # Shifting glow orbs
│       ├── FloatingIcons.tsx    # Global floating AI icons
│       └── CursorGlow.tsx       # Cursor-following glow
└── data/
    ├── projects.ts              # 3 project definitions
    ├── evaluation.ts            # Metrics, decisions, limitations, interview Q&A
    ├── philosophy.ts            # 4 philosophy cards
    └── tech-stack.ts            # Tech stack by layer
```

---

## Design Principles

### Visual System
- **Color palette**: Dark graphite base (`#0F1117`) with steel blue (`#3A6EA5`) and teal (`#2F6F6F`) accents
- **Typography**: Inter (Google Fonts), monospace for technical labels
- **Cards**: Glassmorphism with `card-shine` hover effect and subtle borders
- **Animations**: Scroll-triggered via `whileInView`, spring physics, staggered delays

### Engineering Philosophy
- **Data-driven rendering**: All content from typed `.ts` files — zero hardcoded strings
- **Component isolation**: Each section is self-contained with its own background animation
- **Accessibility**: Semantic HTML, proper heading hierarchy, keyboard-navigable
- **Performance**: `next/font` optimization, lazy animation (viewport-triggered only), Turbopack dev server

### Content Philosophy
- Every engineering decision answers **WHY** (reasoning), **WHAT WAS SACRIFICED** (tradeoff), and **HOW IT CHANGES IN PRODUCTION** (implication)
- Known limitations are documented per project — not hidden
- Interview defense anticipates the hardest questions ("Why not LLM?", "Why synthetic data?", "Why Logistic Regression over XGBoost?")

---

## License

Private portfolio project. All rights reserved.

export interface ProjectData {
  id: string;
  name: string;
  domain: string;
  stack: string[];
  impact: string;
  problem: string;
  architectureLayers: string[];
  engineeringDecisions: string[];
  deploymentStack: string[];
  tradeoffs: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: ProjectData[] = [
  {
    id: "ppe",
    name: "PPE Compliance Intelligence",
    domain: "Computer Vision · Safety Compliance",
    stack: ["YOLO", "Python", "Docker", "OpenCV", "NumPy"],
    impact: "Real-time PPE detection with automated compliance scoring for construction sites.",
    problem:
      "Manual PPE inspections on construction sites are slow, inconsistent, and error-prone. Safety managers can't monitor every worker continuously. Non-compliance goes undetected until incidents occur.",
    architectureLayers: [
      "Image Input (Upload / Webcam)",
      "YOLOv8 Object Detection",
      "Class-level Detection (8 PPE classes)",
      "Compliance Scoring Engine",
      "Risk & Action Panel",
      "Export (Annotated Image + JSON)",
    ],
    engineeringDecisions: [
      "Used YOLOv8 custom-trained model on PPE dataset for real-time multi-class detection.",
      "Heuristic compliance scoring: ratio of compliant vs. non-compliant detections per frame.",
      "Streamlit chosen for rapid prototyping with built-in webcam support and zero frontend overhead.",
      "Confidence threshold set at 0.40 — balances false positives against missed detections in cluttered scenes.",
    ],
    deploymentStack: ["Render", "Docker"],
    tradeoffs: [
      "Single-frame analysis — no temporal tracking of workers across frames.",
      "Heuristic compliance scoring — not a formal safety audit methodology.",
      "Migrated from Streamlit to Flask/Render due to OpenCV library conflicts on Streamlit Cloud.",
    ],
    liveUrl: "https://ppe-compliance-dashboard.onrender.com/",
  },
  {
    id: "doc-intel",
    name: "AI Document Intelligence Platform",
    domain: "NLP · Document Processing",
    stack: [
      "FastAPI",
      "Sentence Transformers",
      "pdfplumber",
      "OCR (Tesseract)",
      "SQLite",
      "React",
      "TypeScript",
    ],
    impact: "Automated invoice and contract extraction with clause detection and risk assessment.",
    problem:
      "Organizations process thousands of invoices and contracts manually. Key fields are buried in unstructured PDFs. Contract risks (missing clauses, unfavorable terms) go unnoticed until legal issues arise.",
    architectureLayers: [
      "PDF Upload (Digital + Scanned)",
      "Text Extraction (pdfplumber + OCR fallback)",
      "Document Classification (Invoice vs. Contract)",
      "Field Extraction (Regex + Heuristic)",
      "Clause Detection (Rule-based + Semantic)",
      "Risk Assessment Engine",
      "SQLite Persistence + Deduplication",
      "React Dashboard",
    ],
    engineeringDecisions: [
      "Dual extraction pipeline: pdfplumber for digital PDFs, Tesseract OCR for scanned documents.",
      "Hybrid clause classification: keyword-based rules for speed + Sentence Transformer embeddings for semantic matching.",
      "Content-hash deduplication prevents duplicate document processing.",
      "Rule-based risk scoring with configurable severity levels — no black-box ML for compliance-sensitive outputs.",
    ],
    deploymentStack: ["Vercel (Frontend)", "Hugging Face Spaces (Backend)", "FastAPI", "SQLite"],
    tradeoffs: [
      "Field extraction is regex-based — limited generalization to unusual document formats.",
      "Semantic clause detection requires sentence-transformers model loading (slower cold start).",
      "No LLM integration — deliberate choice for deterministic, auditable outputs.",
    ],
    liveUrl: "https://ai-document-intelligence-frontend.vercel.app/",
  },
  {
    id: "delay-risk",
    name: "Project Delay Risk & Decision Intelligence",
    domain: "Decision Intelligence · Predictive AI",
    stack: [
      "FastAPI",
      "React",
      "TypeScript",
      "Scikit-learn",
      "Pandas",
      "Framer Motion",
      "Pydantic",
    ],
    impact: "Hybrid ML + Rules risk scoring with explainable what-if analysis for project management.",
    problem:
      "Project delays cost organizations billions annually. Traditional tools report what happened but don't anticipate what will happen or explain why. A red status doesn't tell you whether the issue is resource bottlenecks, dependency coupling, or quality-driven rework.",
    architectureLayers: [
      "Project Simulator (Synthetic Data)",
      "Data Pipeline + Validation (Pydantic)",
      "Feature Engineering (7 task-level signals)",
      "ML Layer (Logistic Regression + Random Forest)",
      "Rules Engine (5 domain rules)",
      "Hybrid Risk Scoring (60% Rules + 40% ML)",
      "Explainability Module",
      "What-if Counterfactual Engine",
      "Action Recommendation System",
      "FastAPI Backend",
      "React + TypeScript Frontend",
    ],
    engineeringDecisions: [
      "Hybrid scoring: 60% rule-based + 40% ML. Rules provide guaranteed explainability; ML captures non-linear patterns.",
      "Deterministic system: identical inputs produce identical outputs. Critical for audit trails.",
      "Explainability as a first-order requirement — every risk score accompanied by rule-triggered explanations and ML feature contributions.",
      "What-if simulation: counterfactual reasoning with three scenarios (Add Resource, Reduce Dependencies, Improve Process).",
      "Decision support over analytics density — the UI answers 'what should I do?' not just 'what happened?'",
    ],
    deploymentStack: ["Render (Backend)", "Vercel (Frontend)", "REST API"],
    tradeoffs: [
      "Synthetic data only — system hasn't processed real project management data.",
      "Heuristic what-if — feature mutations, not causal models.",
      "In-memory persistence — restarting clears analysis history.",
      "ML trained on simulated samples — coefficients reflect synthetic patterns.",
    ],
    liveUrl: "https://project-delay-risk-ai-frontend.vercel.app",
  },
];

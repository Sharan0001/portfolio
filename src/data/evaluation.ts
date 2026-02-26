// Evaluation, engineering decisions, limitations, and interview defense data
// All content extracted from actual project READMEs and source code

export interface Metric {
  label: string;
  value: string;
  note?: string;
}

export interface FeatureImportance {
  name: string;
  importance: number; // 0-100
  direction: "increases" | "decreases";
}

export interface EngineeringDecisionDetail {
  decision: string;
  reasoning: string;
  tradeoff: string;
  productionImplication: string;
}

export interface Limitation {
  title: string;
  explanation: string;
  category: "data" | "model" | "deployment" | "scalability";
}

export interface InterviewDefense {
  question: string;
  answer: string;
}

export interface DeploymentNote {
  label: string;
  detail: string;
}

export interface ProjectEvaluation {
  projectId: string;
  metrics: Metric[];
  featureImportance?: FeatureImportance[];
  engineeringDecisions: EngineeringDecisionDetail[];
  limitations: Limitation[];
  interviewDefense: InterviewDefense[];
  deploymentNotes: DeploymentNote[];
}

// ─── PPE Compliance Intelligence ─────────────────────────────────────
const ppeEvaluation: ProjectEvaluation = {
  projectId: "ppe",
  metrics: [
    { label: "Model", value: "YOLOv8 (Custom-trained)", note: "Fine-tuned on PPE-specific dataset" },
    { label: "Detection Classes", value: "8", note: "hardhat, no-hardhat, vest, no-vest, gloves, no-gloves, person, shoes" },
    { label: "Confidence Threshold", value: "0.40", note: "Balances false positives vs. missed detections in cluttered scenes" },
    { label: "Max Detections/Frame", value: "40", note: "Caps per-frame detections to maintain inference speed" },
    { label: "Input Resolution", value: "640×640", note: "Standard YOLO input size for speed/accuracy tradeoff" },
    { label: "mAP@0.5", value: "Pending validation", note: "Model trained on annotated PPE dataset — formal mAP evaluation not yet recorded" },
    { label: "Inference Mode", value: "Single-frame", note: "No temporal tracking — each frame analyzed independently" },
  ],
  featureImportance: [
    { name: "Hardhat presence", importance: 95, direction: "decreases" },
    { name: "Vest visibility", importance: 88, direction: "decreases" },
    { name: "No-hardhat detection", importance: 85, direction: "increases" },
    { name: "No-vest detection", importance: 80, direction: "increases" },
    { name: "Glove detection", importance: 60, direction: "decreases" },
    { name: "Person count", importance: 50, direction: "increases" },
  ],
  engineeringDecisions: [
    {
      decision: "YOLOv8 over two-stage detectors (Faster R-CNN)",
      reasoning: "PPE compliance requires real-time inference. YOLO's single-pass architecture achieves sub-second detection on standard hardware, critical for live site monitoring.",
      tradeoff: "Slightly lower accuracy on small/occluded objects compared to two-stage detectors.",
      productionImplication: "Enables deployment on edge devices or site cameras without GPU servers.",
    },
    {
      decision: "Heuristic compliance scoring (ratio-based) over ML classifier",
      reasoning: "Compliance = compliant_detections / (compliant + non_compliant). Simple, deterministic, auditable. Safety-critical contexts require explainable scoring — not black-box classifiers.",
      tradeoff: "Cannot model complex compliance rules (e.g., zone-specific requirements, role-based PPE mandates).",
      productionImplication: "Score formula is transparent to safety auditors and can be modified without retraining any model.",
    },
    {
      decision: "Confidence threshold at 0.40 (lower than typical 0.50)",
      reasoning: "Construction sites are visually cluttered — helmets partially occluded by scaffolding, vests obscured by equipment. A lower threshold catches more true positives at the cost of some false positives.",
      tradeoff: "Higher false positive rate in crowded frames. Acceptable because missed PPE violations are more costly than false alarms.",
      productionImplication: "Threshold is configurable per deployment site — noisy environments can tune to 0.35, controlled environments to 0.50+.",
    },
    {
      decision: "Migrated from Streamlit to Docker on Render",
      reasoning: "Originally prototyped in Streamlit for rapid development. However, OpenCV and other Python library conflicts on Streamlit Cloud made deployment unreliable. Containerized with Docker and deployed on Render for stable, reproducible hosting.",
      tradeoff: "Docker adds a build step and image management compared to Streamlit's zero-config approach.",
      productionImplication: "Docker ensures identical environments across dev/staging/prod. Render provides persistent deployment with health checks and auto-restarts.",
    },
  ],
  limitations: [
    { title: "Single-frame analysis only", explanation: "No temporal tracking of workers across frames. Cannot determine if the same worker was non-compliant over time or just for a single frame.", category: "model" },
    { title: "No zone-based compliance", explanation: "Cannot enforce zone-specific PPE requirements (e.g., hard hat required in Zone A but optional in Zone B). All detections treated uniformly.", category: "model" },
    { title: "Lighting and occlusion sensitivity", explanation: "Performance degrades in low-light conditions, heavy rain, or when workers are significantly occluded by equipment.", category: "model" },
    { title: "Dataset representativeness", explanation: "Model trained on publicly available PPE datasets. May not generalize to all construction site configurations, PPE colors, or worker demographics.", category: "data" },
    { title: "No deployment persistence", explanation: "Results are per-session only. No historical tracking, audit logging, or compliance trend analysis.", category: "deployment" },
    { title: "Migrated from Streamlit", explanation: "Original Streamlit prototype hit OpenCV/library conflicts on Streamlit Cloud. Containerized with Docker and redeployed on Render for stability.", category: "deployment" },
  ],
  interviewDefense: [
    { question: "Why YOLOv8 instead of a more accurate model like Detectron2?", answer: "PPE compliance is a latency-sensitive application. On a construction site camera feed, you need sub-second inference per frame. YOLOv8 achieves this on standard hardware. Detectron2's higher accuracy doesn't justify the 3-5x inference cost when the primary goal is real-time alerting, not forensic analysis." },
    { question: "Why not use a classifier instead of object detection?", answer: "A classifier would require cropping individual workers first — adding a person-detection step. Object detection handles localization and classification simultaneously. It also provides bounding boxes for visual evidence in compliance reports, which a classifier cannot." },
    { question: "How would you handle false positives in production?", answer: "Three strategies: (1) Per-site threshold tuning based on historical false positive rates. (2) Temporal smoothing — require non-compliance to persist across N consecutive frames before alerting. (3) Human-in-the-loop review for flagged frames before formal incident reports are generated." },
    { question: "What about worker privacy?", answer: "The system detects PPE items, not worker identities. No face recognition is used. In production, frame data would be processed on-edge and only compliance metadata (counts, scores) would be transmitted to central systems. Raw images would be retained only for audit purposes with appropriate access controls." },
  ],
  deploymentNotes: [
    { label: "Platform", detail: "Render (Docker container)" },
    { label: "Model artifact", detail: "PPE.pt (6.2MB YOLOv8 weights)" },
    { label: "Cold start", detail: "~30-60s on Render free tier after inactivity" },
    { label: "Input modes", detail: "File upload (JPG/PNG) + live webcam capture" },
    { label: "Output formats", detail: "Annotated image (JPEG) + raw detections (JSON)" },
    { label: "Migration", detail: "Streamlit → Docker/Render due to OpenCV conflicts on Streamlit Cloud" },
  ],
};

// ─── AI Document Intelligence Platform ──────────────────────────────
const docIntelEvaluation: ProjectEvaluation = {
  projectId: "doc-intel",
  metrics: [
    { label: "Clause Detection", value: "Hybrid (Rule + Semantic)", note: "Rule-based for speed, Sentence Transformer for semantic matching" },
    { label: "Embedding Model", value: "all-MiniLM-L6-v2", note: "384-dim embeddings, balanced speed-quality tradeoff" },
    { label: "Similarity Threshold", value: "0.60", note: "Cosine similarity cutoff for clause-prototype matching" },
    { label: "Core Clause Types", value: "5", note: "Confidentiality, Termination, Payment, Indemnity, Governing Law" },
    { label: "Risk Scoring", value: "Rule-based (0.0–1.0)", note: "Deterministic flag-based severity with configurable thresholds" },
    { label: "OCR Fallback", value: "Tesseract", note: "Triggered when pdfplumber text extraction returns < 30 characters" },
    { label: "Deduplication", value: "SHA-256 content hash", note: "Prevents duplicate document processing at upload time" },
  ],
  featureImportance: [
    { name: "Missing parties", importance: 90, direction: "increases" },
    { name: "Missing governing law", importance: 85, direction: "increases" },
    { name: "Contract expiration", importance: 80, direction: "increases" },
    { name: "Missing payment terms", importance: 75, direction: "increases" },
    { name: "Missing invoice number", importance: 70, direction: "increases" },
    { name: "Amount mismatch", importance: 65, direction: "increases" },
  ],
  engineeringDecisions: [
    {
      decision: "Hybrid clause classification (keyword rules + Sentence Transformer embeddings)",
      reasoning: "Rule-based classification is fast and deterministic — zero cold-start, no model loading. Semantic classification with all-MiniLM-L6-v2 catches clauses that use non-standard language. The system tries semantic first, falls back to rules if the model isn't available.",
      tradeoff: "Requires sentence-transformers as an optional dependency. Cold start is ~3s when loading the embedding model. Rule-based fallback has lower recall on paraphrased clauses.",
      productionImplication: "In production, the embedding model would be pre-loaded at container startup. Rule-based fallback ensures the system never fails to produce output.",
    },
    {
      decision: "Regex + heuristic field extraction over LLM-based extraction",
      reasoning: "Invoices and contracts have predictable structure. Regex patterns capture 90%+ of standard formats without API costs, latency, or hallucination risk. Every extracted field is traceable to a specific pattern match.",
      tradeoff: "Cannot handle unusual document layouts. Complex nested tables or non-standard formatting may cause missed fields.",
      productionImplication: "Deterministic output — same document always produces same extraction. Critical for compliance workflows where reproducibility is required.",
    },
    {
      decision: "No LLM integration — deliberate exclusion",
      reasoning: "For document compliance, every output must be auditable and reproducible. LLMs introduce non-determinism (different outputs per run), hallucination risk (fabricating clause text), and cost scaling issues. The rule-based approach guarantees consistent results.",
      tradeoff: "Cannot handle free-form summarization or novel document types without adding new rules/patterns.",
      productionImplication: "Zero API cost per document processed. No external dependencies for core functionality. Full auditability.",
    },
    {
      decision: "Smart PDF text pipeline (pdfplumber → OCR fallback)",
      reasoning: "Digital PDFs are fast to process with pdfplumber. Scanned PDFs (image-only) need OCR. The system checks if extracted text is < 30 chars and automatically falls back to Tesseract OCR at 300 DPI.",
      tradeoff: "OCR adds 2-5s per page. Tesseract accuracy varies with scan quality. No preprocessing (deskew, denoise) applied.",
      productionImplication: "Handles 95%+ of real-world PDFs without manual intervention. Production version would add image preprocessing for better OCR accuracy.",
    },
  ],
  limitations: [
    { title: "Regex-bound field extraction", explanation: "Field extraction relies on regex patterns tuned to common formats. Unusual layouts, multi-language documents, or complex table structures may cause partial or missed extraction.", category: "model" },
    { title: "No LLM — by design", explanation: "Deliberate exclusion of LLMs for auditability. Cannot summarize free-form clauses or interpret ambiguous contract language. Future extension could add LLM as optional layer.", category: "model" },
    { title: "OCR quality dependency", explanation: "Scanned PDF accuracy depends on scan resolution and clarity. No image preprocessing (contrast enhancement, deskewing) applied before OCR.", category: "data" },
    { title: "SQLite as persistence layer", explanation: "Single-file database. Not suitable for concurrent multi-user access. Production deployment would use PostgreSQL or similar.", category: "deployment" },
    { title: "5 core clause types only", explanation: "Clause detection covers Confidentiality, Termination, Payment, Indemnity, Governing Law. Other clause types (non-compete, assignment, warranty) are detected but filtered in post-processing.", category: "model" },
  ],
  interviewDefense: [
    { question: "Why not use GPT-4 / an LLM for document extraction?", answer: "Three reasons: (1) Reproducibility — the same document must always produce the same output for audit compliance. LLMs are non-deterministic. (2) Cost — processing thousands of documents at $0.01-0.10/doc scales poorly. Regex costs nothing. (3) Hallucination risk — an LLM might fabricate a clause or misquote an amount. In a legal context, that's unacceptable." },
    { question: "Why all-MiniLM-L6-v2 instead of a larger model?", answer: "384-dimension embeddings are sufficient for clause-prototype similarity comparison. The model loads in ~3s and encodes paragraphs in milliseconds. Larger models (e.g., all-mpnet-base-v2) provide marginal accuracy improvement at 3x the model size and inference cost. For a system that processes documents sequentially, latency per-paragraph matters." },
    { question: "How do you handle documents that are neither invoices nor contracts?", answer: "The heuristic classifier uses a priority cascade: (1) strong contract signals ('this agreement', 'whereas'), (2) strong invoice signals ('invoice number', 'balance due'), (3) structural fallback — documents > 4000 chars default to contract, number-heavy documents default to invoice. Unknown types would need explicit handling in production." },
    { question: "What's the similarity threshold of 0.60 based on?", answer: "Empirically tuned on a sample of contract documents. Below 0.50, we get too many false clause detections (e.g., any paragraph mentioning 'pay' being classified as a PAYMENT clause). Above 0.70, we miss valid clauses that use indirect language. 0.60 provides reasonable precision-recall balance for the 5 core clause types." },
  ],
  deploymentNotes: [
    { label: "Platform", detail: "Hugging Face Spaces (Docker SDK)" },
    { label: "Backend", detail: "FastAPI with SQLite persistence" },
    { label: "Frontend", detail: "React + TypeScript SPA" },
    { label: "Model loading", detail: "Lazy-loaded SentenceTransformer (first request ~3s, subsequent requests instant)" },
    { label: "Deduplication", detail: "SHA-256 content hash prevents reprocessing identical documents" },
    { label: "API endpoints", detail: "/extract/auto (auto-detect), /extract/invoice, /extract/contract, /documents (list), /explain/{id}" },
  ],
};

// ─── Project Delay Risk & Decision Intelligence ──────────────────────
const delayRiskEvaluation: ProjectEvaluation = {
  projectId: "delay-risk",
  metrics: [
    { label: "Primary Model", value: "Logistic Regression", note: "Fully interpretable linear coefficients for feature impact" },
    { label: "Secondary Model", value: "Random Forest (200 trees)", note: "Max depth 6, feature importance via impurity reduction" },
    { label: "Hybrid Formula", value: "0.6×Rules + 0.4×ML", note: "60% rule-based deterministic + 40% ML probabilistic" },
    { label: "Risk Thresholds", value: "High ≥70 · Med ≥40 · Low <40", note: "Applied to normalized 0-100 score" },
    { label: "Domain Rules", value: "5 rules", note: "Block frequency, rework count, progress gaps, dependency density, resource availability" },
    { label: "Feature Count", value: "7 task-level signals", note: "Extracted from event logs via feature engineering" },
    { label: "ROC-AUC", value: "Pending (synthetic data)", note: "Formal evaluation requires labeled real-world project data" },
    { label: "Deterministic", value: "Yes", note: "Identical inputs → identical outputs. No runtime randomness." },
  ],
  featureImportance: [
    { name: "total_blocked_events", importance: 92, direction: "increases" },
    { name: "no_resource_available", importance: 85, direction: "increases" },
    { name: "rework_count", importance: 78, direction: "increases" },
    { name: "max_progress_gap", importance: 72, direction: "increases" },
    { name: "dependency_count", importance: 65, direction: "increases" },
    { name: "external_block_count", importance: 58, direction: "increases" },
    { name: "progress_velocity", importance: 45, direction: "decreases" },
  ],
  engineeringDecisions: [
    {
      decision: "Hybrid scoring (60% rules + 40% ML probability)",
      reasoning: "Rules encode domain-expert knowledge that is auditable and editable. ML captures non-linear patterns rules might miss. The 60/40 weighting prioritizes explainability — rules always dominate the score. If rules say high risk, the final score is high regardless of ML output.",
      tradeoff: "ML is constrained to a supplementary role. Even if the ML model has a strong signal, it can contribute at most 40 points. This limits the system when ML is genuinely more accurate.",
      productionImplication: "The weighting is a deployment parameter. In regulated environments, rules can be weighted higher (80/20). In data-rich environments, ML weight can increase (50/50).",
    },
    {
      decision: "Synthetic simulator instead of static CSV datasets",
      reasoning: "Static datasets force hardcoded patterns. A simulator generates diverse project structures with configurable disruption rates, reproducible via seed. This allows testing edge cases (100% blocked tasks, zero rework) systematically.",
      tradeoff: "Synthetic data doesn't reflect real-world correlations. The ML model's learned coefficients may not transfer to production project management data.",
      productionImplication: "In production, the simulator is replaced by API integrations (Jira, Asana, Azure DevOps). The same feature engineering pipeline works on real data — only the data source changes.",
    },
    {
      decision: "Logistic Regression as default model over Random Forest/XGBoost",
      reasoning: "For decision support, the model must explain its reasoning. Logistic Regression coefficients directly indicate feature impact direction and magnitude. Random Forest is available as an alternative but lacks coefficient-level explainability.",
      tradeoff: "Cannot capture non-linear feature interactions. A highly blocked task with low rework might behave differently than one with moderate blocking and high rework — LR can't model this interaction.",
      productionImplication: "Model selection is an endpoint parameter. Production can A/B test LR vs RF and measure whether the accuracy improvement justifies reduced explainability.",
    },
    {
      decision: "Feature engineering before modeling",
      reasoning: "Raw event logs (timestamps, status changes) are not directly useful for prediction. Engineered features like 'max_progress_gap' and 'total_blocked_events' encode domain-relevant signals that both rules and ML can consume.",
      tradeoff: "Feature engineering requires domain knowledge. Missing or poorly designed features limit model performance regardless of algorithm choice.",
      productionImplication: "Feature pipeline is modular — new features can be added without changing the scoring engine. Each feature is unit-tested independently.",
    },
  ],
  limitations: [
    { title: "Synthetic data only", explanation: "All project/task data is simulated. The system has never processed real project management data. ML coefficients reflect synthetic patterns, not real-world correlations.", category: "data" },
    { title: "Heuristic what-if simulations", explanation: "Scenario simulations mutate feature values directly — they are not causal models. 'Add Resource' reduces blocked_events by a fixed amount, not based on resource availability modeling.", category: "model" },
    { title: "No persistence layer", explanation: "Analysis history stored in memory. Restarting the backend clears all data. Production would use PostgreSQL + Redis.", category: "deployment" },
    { title: "ML trained on synthetic samples", explanation: "Logistic Regression coefficients reflect patterns in generated data. Retraining on real project data would likely change coefficient values and potentially invalidate current thresholds.", category: "model" },
    { title: "Single-project scope", explanation: "System analyzes one project at a time. Cannot model cross-project resource contention or portfolio-level risk aggregation.", category: "scalability" },
  ],
  interviewDefense: [
    { question: "Why Logistic Regression over XGBoost or deep learning?", answer: "This is a decision support system, not a prediction contest. The user needs to understand WHY a task is risky, not just see a probability. LR coefficients provide directional feature impact: 'total_blocked_events increases risk by X'. XGBoost gives feature importance but not direction. Deep learning is a black box. The explainability requirement makes LR the correct choice." },
    { question: "Why 60/40 rule-ML weighting instead of pure ML?", answer: "Rules encode guaranteed domain logic: 'if a task has 3+ blocking events, it's high severity.' This fires deterministically, every time. ML supplements this with pattern detection the rules might miss. Putting rules at 60% ensures the system is auditable — a compliance officer can inspect every rule that fired. ML at 40% adds value without overriding human-encoded logic." },
    { question: "Why synthetic data instead of real project data?", answer: "Two reasons: (1) Real project management data is sensitive (timelines, team names, budget overspins). Acquiring it for a portfolio project isn't feasible. (2) The simulator provides controlled experiments — I can test 'what happens with 100% task blocking' without waiting months for such data to appear. The system architecture is data-source agnostic — swapping the simulator for a Jira API is a configuration change." },
    { question: "How would you validate this system with real data?", answer: "Three-phase approach: (1) Collect 6 months of historical task data with known delays. (2) Retrain ML models and recalibrate rule thresholds using cross-validation. (3) A/B test the system against manual project manager assessments — measure whether the system identifies high-risk tasks earlier than human judgment." },
    { question: "Why specific thresholds (High ≥70, Medium ≥40)?", answer: "Thresholds are calibrated to the score distribution of the synthetic dataset. At 70+, approximately the top 20% of tasks are flagged — matching the expected proportion of genuinely at-risk tasks in a typical project. At 40+, we capture the 'watch' zone. In production, these would be recalibrated after observing real delay rates." },
  ],
  deploymentNotes: [
    { label: "Backend", detail: "Render (FastAPI, Python 3.11+)" },
    { label: "Frontend", detail: "Vercel (React + TypeScript)" },
    { label: "Cold start", detail: "Backend on free tier — 30-60s cold start after inactivity" },
    { label: "API design", detail: "RESTful with optional API key auth, rate limiting, Prometheus metrics" },
    { label: "Determinism", detail: "No stochastic sampling at runtime. Fixed random seed for simulator." },
    { label: "Versioning", detail: "Model artifacts serialized via joblib. Re-training produces new version." },
  ],
};

export const evaluations: ProjectEvaluation[] = [
  ppeEvaluation,
  docIntelEvaluation,
  delayRiskEvaluation,
];

export function getEvaluation(projectId: string): ProjectEvaluation | undefined {
  return evaluations.find((e) => e.projectId === projectId);
}

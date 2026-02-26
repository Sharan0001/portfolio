export interface TechItem {
    name: string;
    usage: string;
}

export interface TechLayer {
    layer: string;
    items: TechItem[];
}

export const techStack: TechLayer[] = [
    {
        layer: "AI Layer",
        items: [
            { name: "Logistic Regression", usage: "Delay risk probability estimation with interpretable coefficients (Project 3)." },
            { name: "Random Forest", usage: "Non-linear delay risk prediction with feature importance analysis (Project 3)." },
            { name: "Feature Engineering", usage: "Extracted 7 task-level signals from event logs — blocking events, rework, stagnation gaps (Project 3)." },
            { name: "Sentence Transformers", usage: "Semantic clause classification in contracts using cosine similarity against prototype embeddings (Project 2)." },
            { name: "YOLO", usage: "Custom-trained YOLOv8 model for 8-class PPE detection on construction site images (Project 1)." },
        ],
    },
    {
        layer: "Data Layer",
        items: [
            { name: "Pandas", usage: "Feature aggregation, event log processing, and data pipeline operations across all projects." },
            { name: "SQL / SQLite", usage: "Document persistence with deduplication (Project 2), analysis history storage." },
            { name: "Pydantic", usage: "Schema validation for API payloads, data pipeline input validation (Projects 2 & 3)." },
        ],
    },
    {
        layer: "Backend Layer",
        items: [
            { name: "FastAPI", usage: "REST API backend for both Document Intelligence and Delay Risk systems — async endpoints, Swagger docs." },
            { name: "REST APIs", usage: "Clean endpoint design: /analyze, /history, /stats, /health, /metrics across projects." },
            { name: "Model Versioning", usage: "Interchangeable ML models (Logistic Regression ↔ Random Forest) with same interface (Project 3)." },
        ],
    },
    {
        layer: "Frontend Layer",
        items: [
            { name: "React", usage: "SPA frontend for Delay Risk system — task tables, slide-out panels, what-if comparisons." },
            { name: "TypeScript", usage: "Full type safety across frontend codebases — interfaces for API responses, component props." },
            { name: "Tailwind CSS", usage: "Dark-themed UI with custom color palette, responsive layouts, utility-first styling." },
        ],
    },
    {
        layer: "Infrastructure",
        items: [
            { name: "Vercel", usage: "Frontend deployment for the Delay Risk system with automatic preview deployments." },
            { name: "Render", usage: "Backend API hosting for the Delay Risk system with free-tier deployment." },
            { name: "Hugging Face Spaces", usage: "Model hosting and demo deployment for PPE and Document Intelligence projects." },
        ],
    },
];

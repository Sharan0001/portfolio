export interface PhilosophyCard {
    title: string;
    summary: string;
    detail: string;
    icon: string;
}

export const philosophyCards: PhilosophyCard[] = [
    {
        title: "Deterministic + Probabilistic Hybrid Thinking",
        summary: "Combine the reliability of rules with the adaptivity of ML.",
        detail:
            "Domain-expert knowledge should be explicit, auditable, and guaranteed to fire. ML fills in the gaps where rules can't generalize. The result is a system where you know exactly why a decision was made — and can override it when the rules are wrong.",
        icon: "Layers",
    },
    {
        title: "Explainability Before Accuracy",
        summary: "A 95% accurate model you can't explain is worse than an 85% one you can.",
        detail:
            "In production AI systems, stakeholders need to trust outputs before acting on them. Every risk score, every recommendation, every classification should come with a clear reason. I design systems where explainability is a first-order requirement, not an afterthought.",
        icon: "Eye",
    },
    {
        title: "Architecture Over Notebooks",
        summary: "Notebooks explore. Systems deliver.",
        detail:
            "A Jupyter notebook proves a concept. A modular, tested, API-backed system delivers value. I build with separation of concerns from day one — pipelines, engines, APIs, and UIs as distinct layers. Each module is testable, replaceable, and independently deployable.",
        icon: "GitBranch",
    },
    {
        title: "Systems Thinking Over Model Obsession",
        summary: "The model is 20% of the system. The other 80% is what makes it useful.",
        detail:
            "Data validation, feature engineering, scoring logic, explainability, action recommendations, and user interfaces — these are what turn a trained model into a decision support tool. I focus on the full system, not just the .fit() call.",
        icon: "Cpu",
    },
];

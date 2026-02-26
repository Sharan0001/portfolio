"use client";

import { motion } from "framer-motion";
import DataRain from "@/components/ui/DataRain";

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    project: string;
}

const timeline: TimelineItem[] = [
    {
        year: "Phase I",
        title: "Computer Vision Systems",
        description:
            "Built a real-time PPE detection system using YOLOv8. Learned to bridge model training with production-style UI and compliance scoring.",
        project: "PPE Compliance Intelligence",
    },
    {
        year: "Phase II",
        title: "Document Intelligence",
        description:
            "Designed an NLP pipeline for invoice and contract analysis. Combined OCR, regex extraction, semantic embeddings, and rule-based risk assessment into a unified API.",
        project: "AI Document Intelligence Platform",
    },
    {
        year: "Phase III",
        title: "Decision Intelligence Architecture",
        description:
            "Architected a full decision support system: synthetic data → feature engineering → hybrid ML + rules → explainability → counterfactual simulation → React frontend. Deployed end-to-end.",
        project: "Project Delay Risk & Decision Intelligence",
    },
];

export default function Timeline() {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            <DataRain />
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="font-mono text-xs text-[var(--color-steel)] tracking-wider uppercase block mb-3">
                        Progression
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
                        Engineering Evolution
                    </h2>
                </motion.div>

                {/* Vertical timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px bg-[var(--color-graphite-border)]" />

                    <div className="space-y-16">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className={`relative flex items-start gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                            >
                                {/* Dot */}
                                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-steel)] border-2 border-[var(--color-graphite)] z-10 mt-1.5" />

                                {/* Content */}
                                <div
                                    className={`ml-12 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                                        }`}
                                >
                                    <span className="font-mono text-xs text-[var(--color-steel)] tracking-wider uppercase">
                                        {item.year}
                                    </span>
                                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mt-1 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-2">
                                        {item.description}
                                    </p>
                                    <span className="text-xs text-[var(--color-text-dim)] font-mono">
                                        {item.project}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

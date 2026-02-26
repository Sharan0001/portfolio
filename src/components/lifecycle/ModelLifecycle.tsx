"use client";

import { motion } from "framer-motion";
import { Database, Cpu, BarChart3, Shield, Rocket, ArrowRight } from "lucide-react";

const stages = [
    {
        icon: Database,
        label: "Data In",
        detail: "Ingest & validate",
        color: "var(--color-steel)",
    },
    {
        icon: Cpu,
        label: "Feature Eng",
        detail: "Signal extraction",
        color: "var(--color-teal)",
    },
    {
        icon: BarChart3,
        label: "Model Train",
        detail: "LR / RF / YOLO",
        color: "var(--color-steel)",
    },
    {
        icon: Shield,
        label: "Evaluate",
        detail: "Metrics & limits",
        color: "var(--color-warm)",
    },
    {
        icon: Rocket,
        label: "Deploy",
        detail: "Serve & monitor",
        color: "var(--color-teal)",
    },
];

export default function ModelLifecycle() {
    return (
        <section className="py-20 lg:py-28">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="font-mono text-xs text-[var(--color-teal)] tracking-wider uppercase block mb-3">
                        End-to-End
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)]">
                        Model Lifecycle — How I Ship AI
                    </h2>
                    <p className="mt-3 text-sm text-[var(--color-text-muted)] max-w-xl">
                        Every project follows this pipeline. Not just training a model —
                        engineering the full loop from data ingestion to production monitoring.
                    </p>
                </motion.div>

                {/* Pipeline flow */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
                    {stages.map((stage, i) => {
                        const Icon = stage.icon;
                        return (
                            <div key={stage.label} className="flex items-center min-w-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="flex flex-col items-center text-center flex-shrink-0"
                                >
                                    <div
                                        className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-2 border"
                                        style={{
                                            borderColor: stage.color,
                                            backgroundColor: "var(--color-graphite)",
                                        }}
                                    >
                                        <Icon
                                            className="w-6 h-6 lg:w-7 lg:h-7"
                                            style={{ color: stage.color }}
                                        />
                                    </div>
                                    <div className="text-xs font-semibold text-[var(--color-text-primary)]">
                                        {stage.label}
                                    </div>
                                    <div className="text-[10px] text-[var(--color-text-dim)] mt-0.5">
                                        {stage.detail}
                                    </div>
                                </motion.div>

                                {/* Arrow connector */}
                                {i < stages.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        whileInView={{ opacity: 0.4, scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.1 + 0.15 }}
                                        className="mx-2 lg:mx-4 flex-shrink-0"
                                    >
                                        <ArrowRight className="w-4 h-4 text-[var(--color-text-dim)]" />
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Annotation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"
                >
                    <div className="p-4 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)]">
                        <div className="text-[10px] font-mono text-[var(--color-steel)] uppercase tracking-wider mb-1">
                            No Black Boxes
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                            Every model decision is accompanied by an explanation — rule-triggered flags,
                            feature contributions, or confidence scores.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)]">
                        <div className="text-[10px] font-mono text-[var(--color-teal)] uppercase tracking-wider mb-1">
                            Deterministic by Default
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                            Same input → same output. No stochastic sampling at inference time.
                            Critical for audit trails and compliance-sensitive workflows.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)]">
                        <div className="text-[10px] font-mono text-[var(--color-warm)] uppercase tracking-wider mb-1">
                            Limitations Documented
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                            Every project documents what it can&apos;t do. Knowing the boundary between
                            system confidence and uncertainty is the mark of production readiness.
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, AlertCircle, Shield, Server } from "lucide-react";
import MetricCard from "./MetricCard";
import FeatureImportanceBars from "./FeatureImportanceBars";
import type { ProjectEvaluation } from "@/data/evaluation";

interface Props {
    evaluation: ProjectEvaluation;
}

export default function EvaluationPanel({ evaluation }: Props) {
    const [openDefense, setOpenDefense] = useState<number | null>(null);

    return (
        <div className="space-y-8">
            {/* ─── Metrics Grid ─── */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
                    Model &amp; Evaluation Metrics
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {evaluation.metrics.map((m, i) => (
                        <MetricCard
                            key={m.label}
                            label={m.label}
                            value={m.value}
                            note={m.note}
                            index={i}
                        />
                    ))}
                </div>
            </div>

            {/* ─── Feature Importance ─── */}
            {evaluation.featureImportance && evaluation.featureImportance.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
                        Feature Importance
                    </h4>
                    <div className="p-4 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]">
                        <FeatureImportanceBars features={evaluation.featureImportance} />
                    </div>
                </div>
            )}

            {/* ─── Engineering Decisions From the Build ─── */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[var(--color-steel)]" />
                    Engineering Decisions From the Build
                </h4>
                <div className="space-y-3">
                    {evaluation.engineeringDecisions.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.06 }}
                            className="p-4 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]"
                        >
                            <div className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                {d.decision}
                            </div>
                            <div className="grid gap-2">
                                <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                    <span className="font-mono text-[var(--color-steel)] mr-1.5">WHY</span>
                                    {d.reasoning}
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                    <span className="font-mono text-[var(--color-warm)] mr-1.5">TRADEOFF</span>
                                    {d.tradeoff}
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                    <span className="font-mono text-[var(--color-teal)] mr-1.5">PRODUCTION</span>
                                    {d.productionImplication}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Known Limitations ─── */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[var(--color-warm)]" />
                    Known Limitations
                </h4>
                <div className="grid gap-2">
                    {evaluation.limitations.map((l, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="flex gap-3 p-3 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]"
                        >
                            <span className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider mt-0.5 flex-shrink-0 w-20">
                                {l.category}
                            </span>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-text-primary)] mb-0.5">
                                    {l.title}
                                </div>
                                <div className="text-xs text-[var(--color-text-dim)] leading-relaxed">
                                    {l.explanation}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Deployment & Performance Notes ─── */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-[var(--color-teal)]" />
                    System Performance &amp; Deployment
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    {evaluation.deploymentNotes.map((n, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]">
                            <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-1">
                                {n.label}
                            </div>
                            <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                {n.detail}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Interview Defense ─── */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
                    Interview Defense: Why This Architecture?
                </h4>
                <div className="space-y-2">
                    {evaluation.interviewDefense.map((q, i) => (
                        <div
                            key={i}
                            className="rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)] overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenDefense(openDefense === i ? null : i)}
                                className="w-full text-left p-3 flex items-center gap-2 cursor-pointer"
                            >
                                <motion.div
                                    animate={{ rotate: openDefense === i ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-dim)]" />
                                </motion.div>
                                <span className="text-sm text-[var(--color-text-primary)]">
                                    {q.question}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openDefense === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-3 pb-3 pl-9 text-xs text-[var(--color-text-muted)] leading-relaxed">
                                            {q.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleLeft, ToggleRight, TrendingDown, AlertTriangle, Lightbulb } from "lucide-react";
import clsx from "clsx";
import PulseRings from "@/components/ui/PulseRings";

interface Scenario {
    id: string;
    label: string;
    description: string;
    ruleReduction: number;
    mlReduction: number;
    explanation: string;
}

const scenarios: Scenario[] = [
    {
        id: "resource",
        label: "Add Resource",
        description: "Allocate additional resources to the task",
        ruleReduction: 15,
        mlReduction: 0.12,
        explanation:
            "Reducing no_resource_available and total_blocked_events features. Resource allocation directly addresses the most common delay driver.",
    },
    {
        id: "dependencies",
        label: "Reduce Dependencies",
        description: "Decouple task from external blockers",
        ruleReduction: 10,
        mlReduction: 0.10,
        explanation:
            "Reducing dependency count and external_block features. Fewer dependencies mean fewer coordination bottlenecks.",
    },
    {
        id: "process",
        label: "Improve Process",
        description: "Reduce rework cycles and progress gaps",
        ruleReduction: 8,
        mlReduction: 0.08,
        explanation:
            "Reducing rework_count and max_progress_gap features. Better processes catch issues earlier, before they cascade.",
    },
];

export default function DecisionDemo() {
    const [active, setActive] = useState<Record<string, boolean>>({});

    // Base values
    const baseRuleScore = 82;
    const baseMlProb = 0.68;

    // Compute reductions
    const ruleReduction = Object.entries(active)
        .filter(([, v]) => v)
        .reduce((sum, [key]) => {
            const s = scenarios.find((sc) => sc.id === key);
            return sum + (s?.ruleReduction ?? 0);
        }, 0);

    const mlReduction = Object.entries(active)
        .filter(([, v]) => v)
        .reduce((sum, [key]) => {
            const s = scenarios.find((sc) => sc.id === key);
            return sum + (s?.mlReduction ?? 0);
        }, 0);

    const currentRuleScore = Math.max(0, baseRuleScore - ruleReduction);
    const currentMlProb = Math.max(0, Math.min(1, baseMlProb - mlReduction));
    const finalScore = Math.round(0.6 * currentRuleScore + 0.4 * currentMlProb * 100);
    const activeScenarios = scenarios.filter((s) => active[s.id]);

    const toggle = useCallback((id: string) => {
        setActive((prev) => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const getRiskColor = (risk: number) => {
        if (risk >= 70) return "var(--color-risk-high, #EF4444)";
        if (risk >= 40) return "var(--color-risk-medium, #F59E0B)";
        return "var(--color-risk-low, #10B981)";
    };

    const getRiskLevel = (risk: number) => {
        if (risk >= 70) return "HIGH";
        if (risk >= 40) return "MEDIUM";
        return "LOW";
    };

    const totalReduction = Math.max(0, 73 - finalScore);

    return (
        <section className="relative py-24 lg:py-32 bg-[var(--color-graphite-light)] overflow-hidden">
            <PulseRings />
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="font-mono text-xs text-[var(--color-teal)] tracking-wider uppercase block mb-3">
                        Interactive Demo
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
                        Decision Intelligence in Action
                    </h2>
                    <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
                        Toggle interventions to see how the hybrid risk engine responds. This demonstrates
                        counterfactual reasoning — simulating &ldquo;what would happen if&rdquo; without
                        affecting the baseline.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-4">
                            Intervention Controls
                        </div>

                        {scenarios.map((scenario) => (
                            <button
                                key={scenario.id}
                                onClick={() => toggle(scenario.id)}
                                className={clsx(
                                    "w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                                    active[scenario.id]
                                        ? "bg-[var(--color-graphite)] border-[var(--color-teal)] shadow-sm shadow-[rgba(47,111,111,0.15)]"
                                        : "bg-[var(--color-graphite)] border-[var(--color-graphite-border)] hover:border-[var(--color-graphite-lighter)]"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                                {scenario.label}
                                            </span>
                                            <span className="text-xs text-[var(--color-teal)]">
                                                Rule −{scenario.ruleReduction} · ML −{Math.round(scenario.mlReduction * 100)}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-dim)]">
                                            {scenario.description}
                                        </p>
                                    </div>
                                    {active[scenario.id] ? (
                                        <ToggleRight className="w-6 h-6 text-[var(--color-teal)] flex-shrink-0" />
                                    ) : (
                                        <ToggleLeft className="w-6 h-6 text-[var(--color-text-dim)] flex-shrink-0" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </motion.div>

                    {/* Right: Risk Output */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        {/* Risk Score Card */}
                        <div className="p-6 rounded-xl bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-4 h-4 text-[var(--color-text-dim)]" />
                                <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider">
                                    Risk Assessment
                                </span>
                            </div>

                            {/* Score display */}
                            <div className="flex items-end gap-4 mb-4">
                                <motion.span
                                    key={finalScore}
                                    initial={{ scale: 1.15, opacity: 0.7 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-bold tabular-nums"
                                    style={{ color: getRiskColor(finalScore) }}
                                >
                                    {finalScore}
                                </motion.span>
                                <div className="pb-2">
                                    <div className="text-xs text-[var(--color-text-dim)]">/ 100</div>
                                    <motion.div
                                        key={getRiskLevel(finalScore)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs font-mono font-medium mt-0.5"
                                        style={{ color: getRiskColor(finalScore) }}
                                    >
                                        {getRiskLevel(finalScore)}
                                    </motion.div>
                                </div>
                                {totalReduction > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-1 ml-auto text-sm text-emerald-400"
                                    >
                                        <TrendingDown className="w-4 h-4" />
                                        <span>−{totalReduction} pts</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Risk bar */}
                            <div className="w-full h-2 bg-[var(--color-graphite-lighter)] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    animate={{
                                        width: `${finalScore}%`,
                                        backgroundColor: getRiskColor(finalScore),
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>

                            <div className="flex justify-between mt-2 text-[10px] font-mono text-[var(--color-text-dim)]">
                                <span>LOW</span>
                                <span>MEDIUM</span>
                                <span>HIGH</span>
                            </div>
                        </div>

                        {/* Hybrid Formula Card */}
                        <div className="p-5 rounded-xl bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]">
                            <div className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-3">
                                Hybrid Score Breakdown
                            </div>

                            {/* Score components */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="text-center p-2.5 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)]">
                                    <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase mb-1">Rule Score</div>
                                    <motion.div
                                        key={currentRuleScore}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-lg font-bold tabular-nums text-[var(--color-text-primary)]"
                                    >
                                        {currentRuleScore}
                                    </motion.div>
                                    <div className="text-[10px] text-[var(--color-text-dim)]">/ 100</div>
                                </div>
                                <div className="text-center p-2.5 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)]">
                                    <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase mb-1">ML Prob</div>
                                    <motion.div
                                        key={currentMlProb.toFixed(2)}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-lg font-bold tabular-nums text-[var(--color-text-primary)]"
                                    >
                                        {currentMlProb.toFixed(2)}
                                    </motion.div>
                                    <div className="text-[10px] text-[var(--color-text-dim)]">0.0 – 1.0</div>
                                </div>
                                <div className="text-center p-2.5 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-steel-dim)]">
                                    <div className="text-[10px] font-mono text-[var(--color-steel)] uppercase mb-1">Final</div>
                                    <motion.div
                                        key={finalScore}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-lg font-bold tabular-nums"
                                        style={{ color: getRiskColor(finalScore) }}
                                    >
                                        {finalScore}
                                    </motion.div>
                                    <div className="text-[10px] text-[var(--color-text-dim)]">blended</div>
                                </div>
                            </div>

                            {/* Live formula */}
                            <div className="p-3 rounded-lg bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)] font-mono text-xs">
                                <div className="flex items-center gap-1 flex-wrap text-[var(--color-text-muted)]">
                                    <span className="text-[var(--color-steel)]">0.6</span>
                                    <span>×</span>
                                    <motion.span
                                        key={currentRuleScore}
                                        initial={{ color: "#fff" }}
                                        animate={{ color: "#9CA3AF" }}
                                        transition={{ duration: 0.5 }}
                                        className="tabular-nums"
                                    >
                                        {currentRuleScore}
                                    </motion.span>
                                    <span>+</span>
                                    <span className="text-[var(--color-teal)]">0.4</span>
                                    <span>×</span>
                                    <motion.span
                                        key={currentMlProb.toFixed(2)}
                                        initial={{ color: "#fff" }}
                                        animate={{ color: "#9CA3AF" }}
                                        transition={{ duration: 0.5 }}
                                        className="tabular-nums"
                                    >
                                        {currentMlProb.toFixed(2)}
                                    </motion.span>
                                    <span>× 100</span>
                                    <span>=</span>
                                    <motion.span
                                        key={finalScore}
                                        initial={{ scale: 1.2, color: "#fff" }}
                                        animate={{ scale: 1, color: getRiskColor(finalScore) }}
                                        transition={{ duration: 0.3 }}
                                        className="font-bold tabular-nums"
                                    >
                                        {finalScore}
                                    </motion.span>
                                </div>
                            </div>

                            <div className="mt-2.5 text-[10px] font-mono text-[var(--color-text-dim)] text-center">
                                Hybrid deterministic + probabilistic scoring
                            </div>
                        </div>

                        {/* Explanations */}
                        <div className="p-5 rounded-xl bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]">
                            <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-4 h-4 text-[var(--color-text-dim)]" />
                                <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider">
                                    Explanation
                                </span>
                            </div>

                            <AnimatePresence mode="wait">
                                {activeScenarios.length === 0 ? (
                                    <motion.p
                                        key="default"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-sm text-[var(--color-text-dim)] italic"
                                    >
                                        Toggle an intervention to see how the engine explains the risk change.
                                    </motion.p>
                                ) : (
                                    <motion.div
                                        key={activeScenarios.map((s) => s.id).join("-")}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="space-y-3"
                                    >
                                        {activeScenarios.map((s) => (
                                            <div key={s.id} className="text-sm">
                                                <span className="font-medium text-[var(--color-teal)]">{s.label}:</span>
                                                <span className="text-[var(--color-text-muted)] ml-2">{s.explanation}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

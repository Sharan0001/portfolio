"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { ProjectData } from "@/data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";
import EvaluationPanel from "@/components/evaluation/EvaluationPanel";
import { getEvaluation } from "@/data/evaluation";

interface Props {
    project: ProjectData;
    index: number;
}

export default function SystemCard({ project, index }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [view, setView] = useState<"system" | "technical" | "evaluation">("system");
    const evaluation = getEvaluation(project.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full"
        >
            <div
                className={clsx(
                    "rounded-xl border transition-all duration-300 card-shine",
                    expanded
                        ? "bg-[var(--color-graphite-light)] border-[var(--color-steel-dim)] shadow-lg shadow-[rgba(58,110,165,0.08)]"
                        : "bg-[var(--color-graphite-light)] border-[var(--color-graphite-border)] hover:border-[var(--color-steel-dim)] hover:shadow-md hover:shadow-[rgba(58,110,165,0.05)]"
                )}
            >
                {/* Collapsed Header */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full text-left p-6 lg:p-8 cursor-pointer"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-mono text-xs text-[var(--color-steel)] tracking-wider uppercase">
                                    {project.domain}
                                </span>
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 text-xs text-[var(--color-teal)] hover:text-[var(--color-text-primary)] transition-colors"
                                    >
                                        Live <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>

                            <h3 className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                                {project.name}
                            </h3>

                            <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                                {project.impact}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="tech-badge">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-1"
                        >
                            <ChevronDown className="w-5 h-5 text-[var(--color-text-dim)]" />
                        </motion.div>
                    </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 lg:px-8 pb-8 border-t border-[var(--color-graphite-border)]">
                                {/* View Toggle */}
                                <div className="flex gap-2 mt-6 mb-6">
                                    {(["system", "technical", "evaluation"] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setView(tab)}
                                            className={clsx(
                                                "px-4 py-2 text-xs font-medium rounded-md transition-all duration-200",
                                                view === tab
                                                    ? "bg-[var(--color-steel)] text-white"
                                                    : "bg-[var(--color-graphite)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                                            )}
                                        >
                                            {tab === "system" ? "System View" : tab === "technical" ? "Technical View" : "Evaluation"}
                                        </button>
                                    ))}
                                </div>

                                {view === "system" ? (
                                    <div className="space-y-6">
                                        {/* Problem */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 uppercase tracking-wider">
                                                Problem
                                            </h4>
                                            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                                                {project.problem}
                                            </p>
                                        </div>

                                        {/* Architecture Diagram */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
                                                Architecture
                                            </h4>
                                            <ArchitectureDiagram layers={project.architectureLayers} />
                                        </div>
                                    </div>
                                ) : view === "technical" ? (
                                    <div className="space-y-6">
                                        {/* Engineering Decisions */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
                                                Key Engineering Decisions
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.engineeringDecisions.map((d, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-[var(--color-text-muted)]">
                                                        <span className="text-[var(--color-steel)] mt-0.5 flex-shrink-0">→</span>
                                                        <span className="leading-relaxed">{d}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Deployment */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
                                                Deployment
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.deploymentStack.map((d) => (
                                                    <span key={d} className="tech-badge">{d}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Trade-offs */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
                                                Trade-offs
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.tradeoffs.map((t, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-[var(--color-text-muted)]">
                                                        <span className="text-[var(--color-warm)] mt-0.5 flex-shrink-0">⚖</span>
                                                        <span className="leading-relaxed">{t}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : evaluation ? (
                                    <EvaluationPanel evaluation={evaluation} />
                                ) : (
                                    <p className="text-sm text-[var(--color-text-dim)] italic">Evaluation data not available for this project.</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

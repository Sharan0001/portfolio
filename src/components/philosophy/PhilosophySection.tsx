"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Eye, GitBranch, Cpu } from "lucide-react";
import { philosophyCards } from "@/data/philosophy";
import GeometricShapes from "@/components/ui/GeometricShapes";

const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-5 h-5" />,
    Eye: <Eye className="w-5 h-5" />,
    GitBranch: <GitBranch className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
};

export default function PhilosophySection() {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            <GeometricShapes />
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="font-mono text-xs text-[var(--color-steel)] tracking-wider uppercase block mb-3">
                        Approach
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
                        How I Build AI Systems
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {philosophyCards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <button
                                onClick={() => setExpanded(expanded === i ? null : i)}
                                className="w-full text-left p-6 rounded-xl bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)] hover:border-[var(--color-steel-dim)] transition-all duration-300 cursor-pointer group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-[var(--color-graphite)] text-[var(--color-steel)] group-hover:bg-[rgba(58,110,165,0.1)] transition-colors">
                                        {iconMap[card.icon]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 leading-snug">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                            {card.summary}
                                        </p>

                                        <AnimatePresence>
                                            {expanded === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="mt-3 pt-3 text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-graphite-border)]">
                                                        {card.detail}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

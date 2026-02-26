"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStack } from "@/data/tech-stack";
import clsx from "clsx";
import CircuitBoard from "@/components/ui/CircuitBoard";

const layerColors: Record<string, string> = {
    "AI Layer": "var(--color-steel)",
    "Data Layer": "var(--color-teal)",
    "Backend Layer": "#8B7355",
    "Frontend Layer": "#6B8E6B",
    "Infrastructure": "#7B6B8E",
};

export default function TechDepth() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <section className="relative py-24 lg:py-32 bg-[var(--color-graphite-light)] overflow-hidden">
            <CircuitBoard />
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="font-mono text-xs text-[var(--color-steel)] tracking-wider uppercase block mb-3">
                        Stack
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
                        Technical Depth
                    </h2>
                    <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
                        Not skill bars. Each technology listed here was used in a production context,
                        across real system layers.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {techStack.map((layer, li) => (
                        <motion.div
                            key={layer.layer}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: li * 0.08 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: layerColors[layer.layer] || "var(--color-steel)" }}
                                />
                                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
                                    {layer.layer}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {layer.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="relative"
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <div
                                            className={clsx(
                                                "px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 cursor-default",
                                                hoveredItem === item.name
                                                    ? "bg-[var(--color-graphite)] border-[var(--color-steel-dim)] text-[var(--color-text-primary)]"
                                                    : "bg-[var(--color-graphite)] border-[var(--color-graphite-border)] text-[var(--color-text-muted)]"
                                            )}
                                        >
                                            {item.name}
                                        </div>

                                        <AnimatePresence>
                                            {hoveredItem === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute z-30 bottom-full left-0 mb-2 w-72 p-3 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)] shadow-xl shadow-black/30"
                                                >
                                                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                                        {item.usage}
                                                    </p>
                                                    <div
                                                        className="absolute bottom-0 left-4 translate-y-1/2 rotate-45 w-2 h-2 border-r border-b border-[var(--color-graphite-border)]"
                                                        style={{ background: "var(--color-graphite)" }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

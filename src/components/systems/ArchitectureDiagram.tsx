"use client";

import { motion } from "framer-motion";

interface Props {
    layers: string[];
}

export default function ArchitectureDiagram({ layers }: Props) {
    return (
        <div className="relative py-2">
            <div className="flex flex-col gap-0">
                {layers.map((layer, i) => (
                    <div key={i} className="flex flex-col items-center">
                        {/* Node */}
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="w-full max-w-md"
                        >
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)] hover:border-[var(--color-steel-dim)] transition-colors duration-200 group">
                                <span className="font-mono text-xs text-[var(--color-steel)] opacity-50 group-hover:opacity-100 transition-opacity w-5 text-right">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
                                    {layer}
                                </span>
                            </div>
                        </motion.div>

                        {/* Arrow */}
                        {i < layers.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.08 + 0.1 }}
                                className="py-1"
                            >
                                <svg width="12" height="16" viewBox="0 0 12 16" className="flow-arrow">
                                    <path
                                        d="M6 0 L6 12 M2 9 L6 14 L10 9"
                                        stroke="var(--color-steel)"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        opacity="0.4"
                                    />
                                </svg>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

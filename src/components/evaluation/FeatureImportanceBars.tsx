"use client";

import { motion } from "framer-motion";
import type { FeatureImportance } from "@/data/evaluation";

interface Props {
    features: FeatureImportance[];
}

export default function FeatureImportanceBars({ features }: Props) {
    return (
        <div className="space-y-3">
            {features.map((f, i) => (
                <div key={f.name} className="group">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">
                            {f.name}
                        </span>
                        <span
                            className="text-[10px] font-mono"
                            style={{
                                color:
                                    f.direction === "increases"
                                        ? "var(--color-risk-high, #EF4444)"
                                        : "var(--color-risk-low, #10B981)",
                            }}
                        >
                            {f.direction === "increases" ? "↑ risk" : "↓ risk"}
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--color-graphite-lighter)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${f.importance}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                            style={{
                                backgroundColor:
                                    f.direction === "increases"
                                        ? "var(--color-steel)"
                                        : "var(--color-teal)",
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

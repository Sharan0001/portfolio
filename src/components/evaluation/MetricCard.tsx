"use client";

import { motion } from "framer-motion";

interface Props {
    label: string;
    value: string;
    note?: string;
    index?: number;
}

export default function MetricCard({ label, value, note, index = 0 }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 rounded-lg bg-[var(--color-graphite)] border border-[var(--color-graphite-border)]"
        >
            <div className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5">
                {label}
            </div>
            <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                {value}
            </div>
            {note && (
                <div className="text-[11px] text-[var(--color-text-dim)] mt-1.5 leading-relaxed">
                    {note}
                </div>
            )}
        </motion.div>
    );
}

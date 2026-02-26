"use client";

import { motion } from "framer-motion";

/* Animated data flow lines — simulate data pipelines and processing streams */
export default function DataFlowLines() {
    const lines = [
        { x1: "0%", y1: "20%", x2: "100%", y2: "35%", delay: 0 },
        { x1: "0%", y1: "50%", x2: "100%", y2: "45%", delay: 1.5 },
        { x1: "0%", y1: "80%", x2: "100%", y2: "70%", delay: 3 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-steel)" stopOpacity="0" />
                        <stop offset="40%" stopColor="var(--color-steel)" stopOpacity="0.08" />
                        <stop offset="60%" stopColor="var(--color-teal)" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="dotGrad">
                        <stop offset="0%" stopColor="var(--color-steel)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0.4" />
                    </linearGradient>
                </defs>

                {lines.map((line, i) => (
                    <g key={i}>
                        {/* Static path */}
                        <line
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="url(#flowGradient)"
                            strokeWidth="1"
                            strokeDasharray="4 8"
                        />
                        {/* Animated dot traveling along the line */}
                        <motion.circle
                            r="2"
                            fill="url(#dotGrad)"
                            animate={{
                                cx: ["0%", "100%"],
                                cy: [line.y1, line.y2],
                            }}
                            transition={{
                                duration: 12 + i * 3,
                                repeat: Infinity,
                                delay: line.delay,
                                ease: "linear",
                            }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, FileDown } from "lucide-react";
import NeuralBackground from "@/components/ui/NeuralBackground";

const roles = [
    "AI Systems Engineer",
    "Decision Intelligence Builder",
    "Applied Machine Learning Developer",
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        } else if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, roleIndex]);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Animated grid */}
            <div className="absolute inset-0 animated-grid" />

            {/* Neural particle network */}
            <NeuralBackground />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-graphite)]" />

            <div className="section-container relative z-10 w-full py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Typography */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        {/* Name */}
                        <div className="mb-2">
                            <span className="font-mono text-2xl lg:text-3xl font-bold tracking-[0.15em] uppercase shimmer-text">
                                Sharan V
                            </span>
                        </div>

                        {/* Role typing */}
                        <div className="mb-6">
                            <span className="font-mono text-sm tracking-wider text-[var(--color-steel)] uppercase">
                                {displayed}
                                <span className="inline-block w-0.5 h-4 bg-[var(--color-steel)] ml-0.5 animate-pulse align-middle" />
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                            Designing{" "}
                            <span className="shimmer-text">Intelligent Systems</span>,
                            <br />
                            Not Just Models.
                        </h1>

                        <p className="text-lg text-[var(--color-text-muted)] max-w-xl mb-10 leading-relaxed">
                            AI Systems Engineer focused on Decision Intelligence, Computer Vision,
                            and Explainable AI. Building systems that explain their reasoning,
                            not just their predictions.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#systems"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-steel)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-steel-dim)] transition-colors duration-200"
                            >
                                View Systems
                                <ArrowDown className="w-4 h-4" />
                            </a>
                            <a
                                href="/Sharan_V_Resume.pdf"
                                download="Sharan_V_Resume.pdf"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-graphite-border)] text-[var(--color-text-primary)] rounded-lg font-medium text-sm hover:bg-[var(--color-graphite-light)] transition-colors duration-200"
                            >
                                <FileDown className="w-4 h-4" />
                                Download Resume
                            </a>
                            <a
                                href="https://github.com/Sharan0001"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-graphite-border)] text-[var(--color-text-muted)] rounded-lg font-medium text-sm hover:bg-[var(--color-graphite-light)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Avatar showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <motion.div
                                className="absolute -inset-3 rounded-full"
                                style={{
                                    background: "conic-gradient(from 0deg, var(--color-steel), var(--color-teal), var(--color-steel))",
                                    opacity: 0.2,
                                    filter: "blur(12px)",
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Orbital dots */}
                            <motion.div
                                className="absolute -inset-6 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-steel)]" style={{ opacity: 0.6 }} />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-teal)]" style={{ opacity: 0.4 }} />
                            </motion.div>
                            <motion.div
                                className="absolute -inset-10 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-steel)]" style={{ opacity: 0.3 }} />
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--color-teal)]" style={{ opacity: 0.25 }} />
                            </motion.div>
                            {/* Avatar container */}
                            <motion.div
                                className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-[var(--color-graphite-border)] shadow-2xl shadow-[rgba(58,110,165,0.15)]"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img
                                    src="/avatar.jpeg"
                                    alt="Sharan V — AI Systems Engineer"
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Subtle bottom gradient fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-graphite)] via-transparent to-transparent opacity-30" />
                            </motion.div>
                            {/* Status badge */}
                            <motion.div
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[var(--color-graphite-light)] border border-[var(--color-graphite-border)] text-[10px] font-mono text-[var(--color-steel)] tracking-wider uppercase whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                Open to Opportunities
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown className="w-5 h-5 text-[var(--color-text-dim)]" />
            </motion.div>
        </section>
    );
}

/* Abstract architecture visualization for the right side */
function HeroArchViz() {
    const nodes = [
        { label: "Input", x: 50, y: 30 },
        { label: "Pipeline", x: 180, y: 70 },
        { label: "Model", x: 130, y: 150 },
        { label: "Rules", x: 260, y: 130 },
        { label: "Engine", x: 200, y: 220 },
        { label: "API", x: 320, y: 200 },
        { label: "UI", x: 360, y: 280 },
    ];

    const edges = [
        [0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [5, 6],
    ];

    return (
        <svg viewBox="0 0 420 340" className="w-full max-w-md mx-auto">
            {/* Edges */}
            {edges.map(([from, to], i) => (
                <motion.line
                    key={`edge-${i}`}
                    x1={nodes[from].x + 30}
                    y1={nodes[from].y + 12}
                    x2={nodes[to].x + 30}
                    y2={nodes[to].y + 12}
                    stroke="var(--color-steel)"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                />
            ))}
            {/* Nodes */}
            {nodes.map((node, i) => (
                <motion.g
                    key={node.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                >
                    <rect
                        x={node.x}
                        y={node.y}
                        width="60"
                        height="24"
                        rx="4"
                        fill="var(--color-graphite-light)"
                        stroke="var(--color-graphite-border)"
                        strokeWidth="1"
                    />
                    <text
                        x={node.x + 30}
                        y={node.y + 16}
                        textAnchor="middle"
                        fill="var(--color-text-muted)"
                        fontSize="10"
                        fontFamily="var(--font-mono)"
                    >
                        {node.label}
                    </text>
                </motion.g>
            ))}
            {/* Subtle glow */}
            <defs>
                <radialGradient id="nodeGlow">
                    <stop offset="0%" stopColor="var(--color-steel)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--color-steel)" stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx="200" cy="170" r="120" fill="url(#nodeGlow)" />
        </svg>
    );
}

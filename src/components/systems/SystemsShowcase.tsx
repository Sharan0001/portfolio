"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SystemCard from "./SystemCard";
import DataFlowLines from "@/components/ui/DataFlowLines";

export default function SystemsShowcase() {
    return (
        <section id="systems" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Animated data flow lines */}
            <DataFlowLines />
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="font-mono text-xs text-[var(--color-steel)] tracking-wider uppercase block mb-3">
                        Portfolio
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)]">
                        Intelligent Systems
                    </h2>
                    <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
                        Three AI systems built with increasing complexity — from real-time detection
                        to document intelligence to decision support architecture.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {projects.map((project, index) => (
                        <SystemCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

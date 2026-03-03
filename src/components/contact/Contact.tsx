"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, FileDown, Mail } from "lucide-react";
import GradientMesh from "@/components/ui/GradientMesh";

const links = [
    {
        label: "GitHub",
        href: "https://github.com/Sharan0001",
        icon: <Github className="w-5 h-5" />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sharan-shrava-188065257",
        icon: <Linkedin className="w-5 h-5" />,
    },
    {
        label: "Email",
        href: "mailto:sharansworking@gmail.com",
        icon: <Mail className="w-5 h-5" />,
    },
];

export default function Contact() {
    return (
        <section id="contact" className="relative py-24 lg:py-32 border-t border-[var(--color-graphite-border)] overflow-hidden">
            <GradientMesh />
            <div className="section-container">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Avatar */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-graphite-border)] glow-border">
                                    <img
                                        src="/avatar.jpeg"
                                        alt="Sharan V"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                {/* Online dot */}
                                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--color-graphite)]" />
                            </div>
                        </div>

                        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                            Get in Touch
                        </h2>
                        <p className="text-sm text-[var(--color-text-muted)] mb-8">
                            Let&apos;s build something intelligent together.
                        </p>

                        <div className="flex justify-center gap-4 mb-8">
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--color-graphite-border)] text-[var(--color-text-muted)] text-sm font-medium hover:border-[var(--color-steel-dim)] hover:text-[var(--color-text-primary)] transition-all duration-200"
                                >
                                    {link.icon}
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <a
                            href="/Sharan_V_Resume.pdf?v=2"
                            download="Sharan_V_Resume.pdf"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-steel)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-steel-dim)] transition-colors duration-200"
                        >
                            <FileDown className="w-4 h-4" />
                            Download Resume
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="section-container mt-20">
                <div className="pt-8 border-t border-[var(--color-graphite-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-text-dim)]">
                        © {new Date().getFullYear()} Sharan
                    </p>
                    <p className="text-xs text-[var(--color-text-dim)] font-mono">
                        Built with system-level thinking.
                    </p>
                </div>
            </div>
        </section>
    );
}

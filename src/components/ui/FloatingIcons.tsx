"use client";

import { motion } from "framer-motion";

/* Animated floating SVG icons representing AI/ML concepts —
   data points, model layers, feature vectors, decision trees */
export default function FloatingIcons() {
    const icons = [
        // Neural layer
        { path: "M4 8h16M4 16h16M8 4v16M16 4v16", x: "8%", y: "15%", delay: 0, size: 28 },
        // Data cluster
        { path: "M12 3a3 3 0 100 6 3 3 0 000-6zM4 15a3 3 0 100 6 3 3 0 000-6zM20 15a3 3 0 100 6 3 3 0 000-6z", x: "85%", y: "25%", delay: 1.5, size: 24 },
        // Decision branch
        { path: "M12 3v6m0 0l-4 4m4-4l4 4m-8 0v4m8-4v4", x: "75%", y: "65%", delay: 2.8, size: 26 },
        // Matrix/Grid
        { path: "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z", x: "12%", y: "75%", delay: 0.8, size: 22 },
        // Graph/Signal
        { path: "M3 20l4-8 4 4 4-12 4 8", x: "92%", y: "50%", delay: 3.5, size: 24 },
        // Tensor/Cube
        { path: "M12 2l8 4v8l-8 4-8-4V6l8-4z", x: "50%", y: "8%", delay: 2, size: 20 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((icon, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: icon.x, top: icon.y }}
                    animate={{
                        y: [0, -12, 0, 8, 0],
                        rotate: [0, 3, -3, 2, 0],
                        opacity: [0.12, 0.22, 0.12],
                    }}
                    transition={{
                        duration: 8 + i * 1.2,
                        repeat: Infinity,
                        delay: icon.delay,
                        ease: "easeInOut",
                    }}
                >
                    <svg
                        width={icon.size}
                        height={icon.size}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-steel)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.3 }}
                    >
                        <path d={icon.path} />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}

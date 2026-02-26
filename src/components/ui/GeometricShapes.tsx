"use client";

import { motion } from "framer-motion";

/* Floating geometric shapes — cubes, pyramids, hexagons for the philosophy section */
export default function GeometricShapes() {
    const shapes = [
        // Hexagon
        {
            d: "M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z",
            x: "10%", y: "20%", size: 32, delay: 0, duration: 10,
        },
        // Diamond
        {
            d: "M12 2l10 10-10 10L2 12z",
            x: "82%", y: "15%", size: 26, delay: 1.2, duration: 12,
        },
        // Triangle
        {
            d: "M12 3L22 21H2z",
            x: "70%", y: "70%", size: 28, delay: 2.5, duration: 9,
        },
        // Cross/Plus
        {
            d: "M12 5v14M5 12h14",
            x: "15%", y: "75%", size: 24, delay: 0.8, duration: 11,
        },
        // Circle segments
        {
            d: "M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20M12 6a6 6 0 0 1 0 12",
            x: "50%", y: "10%", size: 22, delay: 3, duration: 13,
        },
        // Square grid
        {
            d: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
            x: "88%", y: "50%", size: 20, delay: 1.8, duration: 10,
        },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: shape.x, top: shape.y }}
                    animate={{
                        y: [0, -15, 5, -8, 0],
                        rotate: [0, 8, -5, 3, 0],
                        scale: [1, 1.05, 0.95, 1.02, 1],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut",
                    }}
                >
                    <svg
                        width={shape.size}
                        height={shape.size}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-steel)"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.15 }}
                    >
                        <path d={shape.d} />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}

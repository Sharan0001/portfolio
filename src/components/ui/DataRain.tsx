"use client";

import { useEffect, useRef } from "react";

/* Rising binary / hex data particles — like data streaming upward */
export default function DataRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        interface Drop {
            x: number;
            y: number;
            speed: number;
            char: string;
            opacity: number;
            size: number;
        }

        const chars = "01∑∏∫λΔΘ∂∇αβγηπσω".split("");
        let drops: Drop[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initDrops();
        };

        const initDrops = () => {
            drops = [];
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            for (let i = 0; i < 35; i++) {
                drops.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    speed: 0.2 + Math.random() * 0.5,
                    char: chars[Math.floor(Math.random() * chars.length)],
                    opacity: 0.05 + Math.random() * 0.12,
                    size: 10 + Math.random() * 4,
                });
            }
        };

        const animate = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            for (const drop of drops) {
                drop.y -= drop.speed;
                if (drop.y < -20) {
                    drop.y = h + 20;
                    drop.x = Math.random() * w;
                    drop.char = chars[Math.floor(Math.random() * chars.length)];
                }

                ctx.font = `${drop.size}px monospace`;
                ctx.fillStyle = `rgba(58, 110, 165, ${drop.opacity})`;
                ctx.fillText(drop.char, drop.x, drop.y);
            }

            animationId = requestAnimationFrame(animate);
        };

        resize();
        animate();
        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}

"use client";

import { useEffect, useRef } from "react";

/* Gradient mesh — soft glowing orbs that slowly shift position and color */
export default function GradientMesh() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const orbs = [
            { cx: 0.2, cy: 0.3, r: 200, color: [58, 110, 165] },
            { cx: 0.8, cy: 0.6, r: 180, color: [47, 111, 111] },
            { cx: 0.5, cy: 0.8, r: 160, color: [58, 110, 165] },
        ];

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const animate = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            time += 0.003;

            for (let i = 0; i < orbs.length; i++) {
                const orb = orbs[i];
                const x = (orb.cx + Math.sin(time + i * 2) * 0.08) * w;
                const y = (orb.cy + Math.cos(time + i * 1.5) * 0.06) * h;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
                gradient.addColorStop(0, `rgba(${orb.color.join(",")}, 0.06)`);
                gradient.addColorStop(1, `rgba(${orb.color.join(",")}, 0)`);

                ctx.beginPath();
                ctx.arc(x, y, orb.r, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
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
            style={{ opacity: 0.8 }}
        />
    );
}

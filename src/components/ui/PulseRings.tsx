"use client";

import { useEffect, useRef } from "react";

/* Pulsing concentric rings — like a radar or signal propagation effect */
export default function PulseRings() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const animate = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            time += 0.008;

            const cx = w * 0.7;
            const cy = h * 0.5;
            const maxR = Math.max(w, h) * 0.6;

            for (let i = 0; i < 6; i++) {
                const phase = (time + i * 0.3) % 2;
                const r = phase * maxR;
                const alpha = (1 - phase / 2) * 0.08;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(47, 111, 111, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
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
            style={{ opacity: 0.7 }}
        />
    );
}

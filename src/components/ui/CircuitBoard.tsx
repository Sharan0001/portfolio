"use client";

import { useEffect, useRef } from "react";

/* Animated circuit board / PCB trace pattern for tech sections */
export default function CircuitBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        interface Trace {
            segments: { x: number; y: number }[];
            speed: number;
            progress: number;
        }

        let traces: Trace[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            generateTraces();
        };

        const generateTraces = () => {
            traces = [];
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const gridSize = 40;

            for (let i = 0; i < 12; i++) {
                const segments: { x: number; y: number }[] = [];
                let x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
                let y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
                segments.push({ x, y });

                for (let j = 0; j < 4 + Math.floor(Math.random() * 5); j++) {
                    const dir = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical
                    const len = (1 + Math.floor(Math.random() * 4)) * gridSize;
                    if (dir === 0) {
                        x += Math.random() > 0.5 ? len : -len;
                    } else {
                        y += Math.random() > 0.5 ? len : -len;
                    }
                    x = Math.max(0, Math.min(w, x));
                    y = Math.max(0, Math.min(h, y));
                    segments.push({ x, y });
                }

                traces.push({
                    segments,
                    speed: 0.002 + Math.random() * 0.003,
                    progress: Math.random(),
                });
            }
        };

        const animate = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            time += 0.005;

            for (const trace of traces) {
                trace.progress = (trace.progress + trace.speed) % 1;

                // Draw static trace
                ctx.beginPath();
                for (let i = 0; i < trace.segments.length; i++) {
                    const s = trace.segments[i];
                    if (i === 0) ctx.moveTo(s.x, s.y);
                    else ctx.lineTo(s.x, s.y);
                }
                ctx.strokeStyle = "rgba(58, 110, 165, 0.06)";
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw node dots at intersections
                for (const s of trace.segments) {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(58, 110, 165, 0.1)";
                    ctx.fill();
                }

                // Animated traveling dot
                const totalLen = getTotalLength(trace.segments);
                const pos = getPointAtLength(trace.segments, trace.progress * totalLen);
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(58, 110, 165, 0.4)";
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(58, 110, 165, 0.08)";
                ctx.fill();
            }

            animationId = requestAnimationFrame(animate);
        };

        function getTotalLength(segments: { x: number; y: number }[]) {
            let len = 0;
            for (let i = 1; i < segments.length; i++) {
                const dx = segments[i].x - segments[i - 1].x;
                const dy = segments[i].y - segments[i - 1].y;
                len += Math.sqrt(dx * dx + dy * dy);
            }
            return len;
        }

        function getPointAtLength(segments: { x: number; y: number }[], targetLen: number) {
            let len = 0;
            for (let i = 1; i < segments.length; i++) {
                const dx = segments[i].x - segments[i - 1].x;
                const dy = segments[i].y - segments[i - 1].y;
                const segLen = Math.sqrt(dx * dx + dy * dy);
                if (len + segLen >= targetLen) {
                    const t = (targetLen - len) / segLen;
                    return {
                        x: segments[i - 1].x + dx * t,
                        y: segments[i - 1].y + dy * t,
                    };
                }
                len += segLen;
            }
            return segments[segments.length - 1];
        }

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

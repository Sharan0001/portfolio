"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
    const [pos, setPos] = useState({ x: -500, y: -500 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };

        const handleLeave = () => setVisible(false);

        window.addEventListener("mousemove", handleMouse);
        document.addEventListener("mouseleave", handleLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouse);
            document.removeEventListener("mouseleave", handleLeave);
        };
    }, [visible]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <div
            className="cursor-glow"
            style={{
                left: pos.x,
                top: pos.y,
                opacity: visible ? 1 : 0,
            }}
        />
    );
}

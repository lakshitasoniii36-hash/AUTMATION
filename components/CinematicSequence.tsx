"use client";

import { useEffect, useState } from "react";

export default function CinematicSequence() {
    const [frame, setFrame] = useState(1);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            // Updated to use 192 frames with adjusted scroll sensitivity
            const newFrame = Math.min(192, Math.max(1, Math.floor(scrollY / 15) + 1));
            setFrame(newFrame);
        };

        window.addEventListener("scroll", onScroll);
        onScroll(); // Initialize on mount

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            <img
                src={`/frames/ezgif-frame-${String(frame).padStart(3, "0")}.png`}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${1 + frame * 0.001})`,
                    filter: 'contrast(1.1) brightness(0.8)',
                    transition: 'transform 0.2s linear',
                }}
            />
        </div>
    );
}

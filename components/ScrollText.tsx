'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollText() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Text visibility based on scroll position
    const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3], [1, 1, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.55, 0.6], [0, 1, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.85, 0.9], [0, 1, 1, 0]);
    const text4Opacity = useTransform(scrollYProgress, [0.85, 0.9, 1, 1], [0, 1, 1, 1]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-20 pointer-events-none">
            {/* 0% Scroll - Centered */}
            <motion.div
                style={{ opacity: text1Opacity }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pearl-white text-center px-6 max-w-5xl leading-tight">
                    AI Agents & Automations
                </h2>
            </motion.div>

            {/* 30% Scroll - Left aligned */}
            <motion.div
                style={{ opacity: text2Opacity }}
                className="absolute inset-0 flex items-center"
            >
                <div className="pl-6 md:pl-12 lg:pl-24 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-pearl-white leading-tight">
                        Autonomous decision-making
                        <br />
                        <span className="text-pearl-white/70">replaces manual workflows</span>
                    </h2>
                </div>
            </motion.div>

            {/* 60% Scroll - Right aligned */}
            <motion.div
                style={{ opacity: text3Opacity }}
                className="absolute inset-0 flex items-center justify-end"
            >
                <div className="pr-6 md:pr-12 lg:pr-24 max-w-3xl text-right">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-pearl-white leading-tight">
                        Internal intelligence layers
                        <br />
                        <span className="text-pearl-white/70">coordinate in real time</span>
                    </h2>
                </div>
            </motion.div>

            {/* 90% Scroll - Centered */}
            <motion.div
                style={{ opacity: text4Opacity }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="text-center px-6 max-w-4xl">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pearl-white leading-tight mb-4">
                        Scalable systems.
                    </h2>
                    <p className="text-2xl md:text-4xl text-pearl-white/70">
                        Secure by design.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

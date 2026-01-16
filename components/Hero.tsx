'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-6xl mx-auto">
                {/* Layer 1: Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.6,
                    }}
                    className="text-8xl md:text-9xl lg:text-[11rem] font-bold text-pearl-white leading-[0.9] tracking-wide"
                    style={{
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        marginBottom: '5rem'
                    }}
                >
                    AI & Automation<br />Agents
                </motion.h1>

                {/* Layer 2: Description (Separate, Independent) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 1.0,
                    }}
                    style={{ marginTop: '2rem' }}
                >
                    <p className="text-[2rem] md:text-[2.5rem] text-pearl-white/50 max-w-3xl mx-auto leading-[1.7]">
                        Autonomous intelligence systems that orchestrate workflows,
                        make decisions, and execute tasks without human intervention.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

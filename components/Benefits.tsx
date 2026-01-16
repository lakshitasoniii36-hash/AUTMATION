'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Benefits() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);

    // Parallax effects for different sections
    const ySection1 = useTransform(scrollYProgress, [0, 0.5], [0, -20]);
    const ySection2 = useTransform(scrollYProgress, [0.2, 0.6], [40, -20]);
    const ySection3 = useTransform(scrollYProgress, [0.3, 0.7], [60, -20]);
    const ySection4 = useTransform(scrollYProgress, [0.4, 0.8], [80, -20]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center py-32 px-6"
        >
            <motion.div
                style={{ opacity, y }}
                className="max-w-5xl mx-auto"
            >
                <h2 className="text-6xl md:text-7xl font-bold text-pearl-white mb-24 text-center tracking-tight">
                    About
                </h2>

                <div className="space-y-20">
                    {/* Section 1 - Main Definition */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ y: ySection1 }}
                        className="text-xl md:text-2xl text-pearl-white/70 leading-relaxed space-y-8"
                    >
                        <p>
                            AI agents are <strong className="text-pearl-white/90">intelligent, autonomous systems</strong> that perceive their environment,
                            process complex information, make independent decisions, and take strategic actions to achieve specific goals
                            without requiring constant human oversight.
                        </p>
                        <p>
                            Unlike traditional software that follows rigid, pre-programmed rules, AI agents possess the ability to
                            <strong className="text-pearl-white/90"> adapt, learn from experience, and operate independently</strong> within
                            defined parameters, continuously improving their performance over time.
                        </p>
                    </motion.div>

                    {/* Section 2 - Why Automation Matters */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ y: ySection2 }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-pearl-white">
                            Why Automation Matters
                        </h3>
                        <div className="space-y-7 text-lg md:text-xl text-pearl-white/60 leading-relaxed">
                            <p>
                                Automation eliminates manual, repetitive, and time-consuming tasks by creating intelligent workflows
                                that execute consistently, reliably, and at scale. This allows your team to focus on high-value activities
                                that require human creativity, strategy, and decision-making.
                            </p>
                            <p>
                                In today's fast-paced business landscape, organizations operating at scale cannot rely on human intervention
                                for every operational decision. AI agents provide the critical infrastructure needed to scale operations
                                efficiently, reduce costs dramatically, maintain competitive advantage, and deliver exceptional customer experiences.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 3 - Core Capabilities */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ y: ySection3 }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-pearl-white">
                            Core Capabilities
                        </h3>
                        <div className="grid md:grid-cols-2 gap-10 text-lg text-pearl-white/60">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-4">Autonomous Decision-Making</h4>
                                <p className="leading-relaxed">
                                    AI agents analyze complex scenarios, evaluate multiple options, and execute optimal actions
                                    based on real-time data and historical patterns.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-4">Continuous Learning</h4>
                                <p className="leading-relaxed">
                                    Agents improve their performance over time by learning from outcomes, adapting to changing conditions,
                                    and refining their strategies automatically.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-4">24/7 Operations</h4>
                                <p className="leading-relaxed">
                                    Unlike human teams, AI agents operate around the clock without fatigue, ensuring consistent
                                    service delivery and immediate response to critical events.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-4">Scalable Intelligence</h4>
                                <p className="leading-relaxed">
                                    Deploy agents across unlimited processes simultaneously, handling thousands of tasks in parallel
                                    without additional overhead or resource constraints.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Section 4 - Business Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ y: ySection4 }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-pearl-white">
                            Business Impact
                        </h3>
                        <div className="space-y-7 text-lg md:text-xl text-pearl-white/60 leading-relaxed">
                            <p>
                                Organizations implementing AI automation report <strong className="text-pearl-white/85">70-90% reduction
                                    in operational costs</strong>, dramatic improvements in accuracy and consistency, and the ability to
                                scale rapidly without proportional increases in headcount.
                            </p>
                            <p>
                                From customer support and data processing to system integration and workflow orchestration, AI agents
                                transform how modern businesses operate, enabling them to compete effectively in increasingly automated markets.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

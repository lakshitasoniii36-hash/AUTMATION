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
                <h2 className="text-6xl md:text-7xl font-bold text-pearl-white mb-16 text-center tracking-tight">
                    About AI & Automation Agents
                </h2>

                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xl md:text-2xl text-pearl-white/70 leading-relaxed"
                    >
                        <p className="mb-6">
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="border-t border-white/10 pt-10"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-pearl-white mb-6">
                            Why Automation Matters
                        </h3>
                        <div className="space-y-5 text-lg md:text-xl text-pearl-white/60 leading-relaxed">
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="border-t border-white/10 pt-10"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-pearl-white mb-6">
                            Core Capabilities
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 text-lg text-pearl-white/60">
                            <div>
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-3">Autonomous Decision-Making</h4>
                                <p className="leading-relaxed">
                                    AI agents analyze complex scenarios, evaluate multiple options, and execute optimal actions
                                    based on real-time data and historical patterns.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-3">Continuous Learning</h4>
                                <p className="leading-relaxed">
                                    Agents improve their performance over time by learning from outcomes, adapting to changing conditions,
                                    and refining their strategies automatically.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-3">24/7 Operations</h4>
                                <p className="leading-relaxed">
                                    Unlike human teams, AI agents operate around the clock without fatigue, ensuring consistent
                                    service delivery and immediate response to critical events.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-pearl-white/85 mb-3">Scalable Intelligence</h4>
                                <p className="leading-relaxed">
                                    Deploy agents across unlimited processes simultaneously, handling thousands of tasks in parallel
                                    without additional overhead or resource constraints.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="border-t border-white/10 pt-10"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-pearl-white mb-6">
                            Business Impact
                        </h3>
                        <div className="space-y-5 text-lg md:text-xl text-pearl-white/60 leading-relaxed">
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

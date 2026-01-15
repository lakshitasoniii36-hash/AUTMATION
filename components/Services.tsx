'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Service {
    id: string;
    title: string;
    description: string;
    detailedExplanation: string;
    keyFeatures: string[];
    icon: string;
}

const services: Service[] = [
    {
        id: 'autonomous-agents',
        title: 'Autonomous AI Agents',
        description: 'Self-operating agents that handle complex tasks and make decisions independently',
        detailedExplanation: 'Our autonomous AI agents are intelligent systems that perceive their environment, process information, and take actions to achieve specific goals without constant human oversight. They adapt, learn, and operate independently within defined parameters.',
        keyFeatures: [
            'Self-directed task execution',
            'Real-time decision-making',
            'Adaptive learning from outcomes',
            'Multi-step process coordination',
        ],
        icon: '🤖',
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        description: 'End-to-end automation of repetitive business processes',
        detailedExplanation: 'Streamline your operations by automating repetitive tasks and creating intelligent workflows that execute consistently and reliably. Connect multiple systems and eliminate manual bottlenecks across your organization.',
        keyFeatures: [
            'Cross-platform integration',
            'Conditional logic workflows',
            'Error handling & retry mechanisms',
            'Real-time monitoring',
        ],
        icon: '⚡',
    },
    {
        id: 'customer-support',
        title: 'Customer Support Automation',
        description: '24/7 intelligent customer service solutions',
        detailedExplanation: 'AI agents that handle customer queries, support tickets, and follow-up communications around the clock with human-level understanding and empathy. Deliver exceptional customer experiences at scale.',
        keyFeatures: [
            'Natural language understanding',
            'Multi-channel support',
            'Intelligent ticket routing',
            'Automated resolution protocols',
        ],
        icon: '💬',
    },
    {
        id: 'data-processing',
        title: 'Data Processing & Intelligence',
        description: 'Automated data analysis and actionable insights',
        detailedExplanation: 'Transform raw data into strategic insights with automated collection, transformation, and analysis pipelines. Make data-driven decisions faster with AI-powered analytics.',
        keyFeatures: [
            'Automated data ingestion',
            'Real-time data cleaning',
            'Pattern recognition',
            'Predictive analytics',
        ],
        icon: '📊',
    },
    {
        id: 'system-integration',
        title: 'System Integration Agents',
        description: 'Seamless connection between platforms',
        detailedExplanation: 'AI agents that connect and coordinate disparate tools, platforms, and databases, creating unified workflows across your entire technology stack without custom API development.',
        keyFeatures: [
            'Bidirectional data sync',
            'Event-driven automation',
            'Legacy system integration',
            'API orchestration',
        ],
        icon: '🔗',
    },
    {
        id: 'custom-development',
        title: 'Custom AI Agent Development',
        description: 'Tailored AI solutions for your needs',
        detailedExplanation: 'Purpose-built AI agents designed specifically for your unique business logic, proprietary workflows, industry requirements, and competitive differentiators.',
        keyFeatures: [
            'Domain-specific knowledge',
            'Custom decision frameworks',
            'Proprietary algorithms',
            'Regulatory compliance',
        ],
        icon: '⚙️',
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center py-32 px-6"
        >
            <motion.div
                style={{ opacity, y }}
                className="max-w-7xl mx-auto w-full"
            >
                <h2 className="text-6xl md:text-7xl font-bold text-pearl-white mb-20 text-center tracking-tight">
                    Our Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            whileHover={{
                                scale: 1.02,
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                            className="group relative bg-black/80 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="text-6xl mb-6">{service.icon}</div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-lg text-white/70 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Detailed Explanation */}
                                <p className="text-base text-white/60 mb-6 leading-relaxed">
                                    {service.detailedExplanation}
                                </p>

                                {/* Key Features */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                                        Key Features
                                    </h4>
                                    <ul className="space-y-2">
                                        {service.keyFeatures.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-white/60 flex items-start">
                                                <span className="text-white/40 mr-2">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

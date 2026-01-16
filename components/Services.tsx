'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';

interface Service {
    id: string;
    title: string;
    description: string;
    detailedExplanation: string;
    icon: string;
}

const services: Service[] = [
    {
        id: 'autonomous-agents',
        title: 'Autonomous AI Agents',
        description: 'Self-operating agents that handle complex tasks and make decisions independently',
        detailedExplanation: 'Our autonomous AI agents are intelligent systems that perceive their environment, process information, and take actions to achieve specific goals without constant human oversight. They feature self-directed task execution with real-time decision-making capabilities. These agents continuously learn from outcomes and coordinate multi-step processes seamlessly.',
        icon: '🤖',
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        description: 'End-to-end automation of repetitive business processes',
        detailedExplanation: 'Streamline your operations by automating repetitive tasks and creating intelligent workflows that execute consistently and reliably. Our solutions provide cross-platform integration with conditional logic workflows and robust error handling. Real-time monitoring ensures your automated processes run smoothly 24/7.',
        icon: '⚡',
    },
    {
        id: 'customer-support',
        title: 'Customer Support Automation',
        description: '24/7 intelligent customer service solutions',
        detailedExplanation: 'AI agents that handle customer queries, support tickets, and follow-up communications around the clock with human-level understanding and empathy. Advanced natural language understanding enables multi-channel support across all platforms. Intelligent ticket routing and automated resolution protocols ensure fast, accurate responses.',
        icon: '💬',
    },
    {
        id: 'data-processing',
        title: 'Data Processing & Intelligence',
        description: 'Automated data analysis and actionable insights',
        detailedExplanation: 'Transform raw data into strategic insights with automated collection, transformation, and analysis pipelines. Our systems handle automated data ingestion with real-time cleaning and validation. Advanced pattern recognition and predictive analytics deliver actionable intelligence for informed decision-making.',
        icon: '📊',
    },
    {
        id: 'system-integration',
        title: 'System Integration Agents',
        description: 'Seamless connection between platforms',
        detailedExplanation: 'AI agents that connect and coordinate disparate tools, platforms, and databases, creating unified workflows across your entire technology stack. Bidirectional data synchronization keeps all systems perfectly aligned. Event-driven automation with legacy system integration capabilities ensures comprehensive API orchestration.',
        icon: '🔗',
    },
    {
        id: 'custom-development',
        title: 'Custom AI Agent Development',
        description: 'Tailored AI solutions for your needs',
        detailedExplanation: 'Purpose-built AI agents designed specifically for your unique business logic, proprietary workflows, and industry requirements. We develop domain-specific knowledge bases with custom decision frameworks tailored to your needs. Our proprietary algorithms ensure regulatory compliance while maximizing efficiency and performance.',
        icon: '⚙️',
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const [showCarousel, setShowCarousel] = useState(true);
    const [hasScattered, setHasScattered] = useState(false);
    const controls = useAnimation();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

    // Auto-trigger scatter after carousel rotates
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCarousel(false);
            setHasScattered(true);
        }, 3000); // Rotate for 3 seconds then scatter

        return () => clearTimeout(timer);
    }, []);

    const cylinderWidth = 1400;
    const faceCount = services.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);

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
                {/* Heading */}
                <h2 className="text-6xl md:text-7xl font-bold text-pearl-white mb-24 text-center tracking-tight">
                    Our Services
                </h2>

                {/* 3D CAROUSEL THAT SCATTERS TO GRID */}
                <div
                    className="relative"
                    style={{
                        perspective: '2000px',
                        transformStyle: 'preserve-3d',
                        minHeight: '600px'
                    }}
                >
                    {showCarousel ? (
                        // ROTATING CAROUSEL VIEW
                        <motion.div
                            className="relative mx-auto"
                            style={{
                                width: cylinderWidth,
                                height: '600px',
                                transformStyle: 'preserve-3d',
                            }}
                            animate={{
                                rotateY: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                ease: "linear",
                                repeat: 0,
                            }}
                        >
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-3xl p-10"
                                    style={{
                                        width: `${faceWidth}px`,
                                        height: '520px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div className="flex flex-col h-full text-center">
                                        <div className="text-7xl mb-6">{service.icon}</div>
                                        <h3 className="text-3xl font-bold text-white mb-5 leading-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-2xl text-white mb-6 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        // SCATTERED GRID VIEW
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{
                                        opacity: 0,
                                        rotateY: index * (360 / faceCount),
                                        z: radius,
                                        x: 0,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotateY: 0,
                                        z: 0,
                                        x: 0,
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        delay: index * 0.1,
                                        ease: [0.34, 1.56, 0.64, 1],
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -12,
                                        transition: {
                                            duration: 0.3,
                                            ease: [0.34, 1.56, 0.64, 1]
                                        },
                                    }}
                                    className="group relative rounded-3xl p-10 cursor-pointer"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
                                        minHeight: '520px',
                                    }}
                                >
                                    {/* Hover gradient overlay */}
                                    <div
                                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                                        }}
                                    />

                                    {/* Card Content */}
                                    <div className="relative z-10 flex flex-col h-full text-center items-center">
                                        <div className="text-7xl mb-6">{service.icon}</div>
                                        <div className="max-w-2xl">
                                            <h3 className="text-3xl font-bold text-white mb-5 leading-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-2xl text-white mb-6 leading-relaxed">
                                                {service.description}
                                            </p>
                                            <p className="text-xl text-white/80 leading-relaxed">
                                                {service.detailedExplanation}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom accent */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}

'use client';

import * as React from "react"
import { motion } from 'framer-motion';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

const services: Service[] = [
    {
        id: 'autonomous-agents',
        title: 'Autonomous AI Agents',
        description: 'Self-operating agents that handle complex tasks independently',
        icon: '🤖'
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        description: 'End-to-end automation of business processes',
        icon: '⚡'
    },
    {
        id: 'customer-support',
        title: 'Customer Support Automation',
        description: '24/7 intelligent customer service solutions',
        icon: '💬'
    },
    {
        id: 'data-processing',
        title: 'Data Processing & Intelligence',
        description: 'Automated data analysis and insights',
        icon: '📊'
    },
    {
        id: 'system-integration',
        title: 'System Integration Agents',
        description: 'Seamless connection between platforms',
        icon: '🔗'
    },
    {
        id: 'custom-development',
        title: 'Custom AI Agent Development',
        description: 'Tailored AI solutions for your needs',
        icon: '⚙️'
    },
];

const ServiceCard = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { description?: string; icon?: string }
>(({ className, title, description, icon, ...props }, ref) => {
    return (
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "group block select-none rounded-xl p-5 no-underline outline-none transition-all duration-300 hover:bg-white/10",
                    className
                )}
                style={{ color: '#ffffff' }}
                {...props}
            >
                <div className="flex items-start gap-3">
                    {icon && (
                        <div className="text-3xl flex-shrink-0">{icon}</div>
                    )}
                    <div className="flex-1">
                        <div className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
                            {title}
                        </div>
                        {description && (
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </a>
        </NavigationMenuLink>
    )
})
ServiceCard.displayName = "ServiceCard"

export default function Navigation() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="z-50"
            style={{
                position: 'fixed',
                top: '24px',
                right: '32px'
            }}
        >
            <NavigationMenu>
                <NavigationMenuList className="gap-2">
                    <NavigationMenuItem>
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={cn(navigationMenuTriggerStyle(), "nav-pill-minimal cursor-pointer")}
                        >
                            Home
                        </button>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <button
                            onClick={() => scrollToSection('about')}
                            className={cn(navigationMenuTriggerStyle(), "nav-pill-minimal cursor-pointer")}
                        >
                            About
                        </button>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="nav-pill-minimal">
                            Services
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {/* BLURRED GREY PANEL - HALF SIZE */}
                            <div
                                className="rounded-2xl shadow-2xl"
                                style={{
                                    width: '40vw',
                                    maxWidth: '700px',
                                    padding: '2rem 2.5rem',
                                    background: 'rgba(128, 128, 128, 0.85)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                }}
                            >
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold text-white mb-2">Our Services</h3>
                                    <p className="text-base text-white/90">Explore our AI automation solutions</p>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {services.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            title={service.title}
                                            description={service.description}
                                            icon={service.icon}
                                            href="#services"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection('services');
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </motion.nav>
    );
}

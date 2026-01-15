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
}

const services: Service[] = [
    { id: 'autonomous-agents', title: 'Autonomous AI Agents' },
    { id: 'workflow-automation', title: 'Workflow Automation' },
    { id: 'customer-support', title: 'Customer Support Automation' },
    { id: 'data-processing', title: 'Data Processing & Intelligence' },
    { id: 'system-integration', title: 'System Integration Agents' },
    { id: 'custom-development', title: 'Custom AI Agent Development' },
];

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none rounded-sm px-4 py-3 leading-none no-underline outline-none transition-colors hover:bg-white/10",
                        className
                    )}
                    style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}
                    {...props}
                >
                    {title}
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

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
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 p-6 w-[600px] bg-black/90 backdrop-blur-md border border-white/8 rounded-lg shadow-2xl">
                                {services.map((service) => (
                                    <ListItem
                                        key={service.id}
                                        title={service.title}
                                        href="#services"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('services');
                                        }}
                                    />
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </motion.nav>
    );
}

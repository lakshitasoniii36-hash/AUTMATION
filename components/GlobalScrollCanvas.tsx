'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    glowIntensity: number;
}

export default function GlobalScrollCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const nodesRef = useRef<Node[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    // Initialize nodes
    useEffect(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        nodesRef.current = [
            { x: centerX, y: centerY, baseX: centerX - 200, baseY: centerY - 150, radius: 40, glowIntensity: 0.3 },
            { x: centerX, y: centerY, baseX: centerX + 180, baseY: centerY - 100, radius: 35, glowIntensity: 0.3 },
            { x: centerX, y: centerY, baseX: centerX - 150, baseY: centerY + 120, radius: 38, glowIntensity: 0.3 },
            { x: centerX, y: centerY, baseX: centerX + 220, baseY: centerY + 140, radius: 42, glowIntensity: 0.3 },
            { x: centerX, y: centerY, baseX: centerX, baseY: centerY - 200, radius: 36, glowIntensity: 0.3 },
        ];
    }, []);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dark radial gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.8
            );
            gradient.addColorStop(0, '#0c0c0c');
            gradient.addColorStop(0.5, '#080808');
            gradient.addColorStop(1, '#040404');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add noise/grain
            const noiseIntensity = 0.02 + scrollProgress * 0.03;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const noise = (Math.random() - 0.5) * noiseIntensity * 255;
                imageData.data[i] += noise;
                imageData.data[i + 1] += noise;
                imageData.data[i + 2] += noise;
            }
            ctx.putImageData(imageData, 0, 0);

            // Calculate node positions based on scroll
            const nodes = nodesRef.current;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            nodes.forEach((node, i) => {
                // Scroll state mapping
                let targetX, targetY, targetGlow;

                if (scrollProgress < 0.25) {
                    // 0-25%: Clustered
                    const clusterFactor = 1 - scrollProgress / 0.25;
                    targetX = centerX + (node.baseX - centerX) * (1 - clusterFactor * 0.8);
                    targetY = centerY + (node.baseY - centerY) * (1 - clusterFactor * 0.8);
                    targetGlow = 0.3 + scrollProgress * 0.4;
                } else if (scrollProgress < 0.6) {
                    // 25-60%: Expanding
                    const expandProgress = (scrollProgress - 0.25) / 0.35;
                    const expansionFactor = 1 + expandProgress * 0.5;
                    targetX = centerX + (node.baseX - centerX) * expansionFactor;
                    targetY = centerY + (node.baseY - centerY) * expansionFactor;
                    targetGlow = 0.5 + expandProgress * 0.3;

                    // Add rotation
                    const angle = expandProgress * Math.PI * 0.2;
                    const dx = targetX - centerX;
                    const dy = targetY - centerY;
                    targetX = centerX + dx * Math.cos(angle) - dy * Math.sin(angle);
                    targetY = centerY + dx * Math.sin(angle) + dy * Math.cos(angle);
                } else if (scrollProgress < 0.85) {
                    // 60-85%: Maximum separation
                    const separationProgress = (scrollProgress - 0.6) / 0.25;
                    const separationFactor = 1.5 + separationProgress * 0.3;
                    targetX = centerX + (node.baseX - centerX) * separationFactor;
                    targetY = centerY + (node.baseY - centerY) * separationFactor;
                    targetGlow = 0.8 + Math.sin(Date.now() * 0.003 + i) * 0.2; // Pulsing
                } else {
                    // 85-100%: Stabilizing
                    const stabilizeProgress = (scrollProgress - 0.85) / 0.15;
                    const stabilizeFactor = 1.8 - stabilizeProgress * 0.3;
                    targetX = centerX + (node.baseX - centerX) * stabilizeFactor;
                    targetY = centerY + (node.baseY - centerY) * stabilizeFactor;
                    targetGlow = 0.9 - stabilizeProgress * 0.3;
                }

                // Smooth interpolation
                node.x += (targetX - node.x) * 0.1;
                node.y += (targetY - node.y) * 0.1;
                node.glowIntensity += (targetGlow - node.glowIntensity) * 0.1;
            });

            // Draw connecting lines
            ctx.strokeStyle = `rgba(248, 248, 248, ${0.1 + scrollProgress * 0.15})`;
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }

            // Draw nodes
            nodes.forEach((node) => {
                // Outer glow
                const glowGradient = ctx.createRadialGradient(
                    node.x,
                    node.y,
                    0,
                    node.x,
                    node.y,
                    node.radius * 3
                );
                glowGradient.addColorStop(0, `rgba(248, 248, 248, ${node.glowIntensity * 0.3})`);
                glowGradient.addColorStop(0.5, `rgba(248, 248, 248, ${node.glowIntensity * 0.1})`);
                glowGradient.addColorStop(1, 'rgba(248, 248, 248, 0)');

                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
                ctx.fill();

                // Core node
                const nodeGradient = ctx.createRadialGradient(
                    node.x,
                    node.y,
                    0,
                    node.x,
                    node.y,
                    node.radius
                );
                nodeGradient.addColorStop(0, `rgba(248, 248, 248, ${node.glowIntensity})`);
                nodeGradient.addColorStop(0.7, `rgba(200, 200, 200, ${node.glowIntensity * 0.6})`);
                nodeGradient.addColorStop(1, `rgba(150, 150, 150, ${node.glowIntensity * 0.3})`);

                ctx.fillStyle = nodeGradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();

                // Inner highlight
                ctx.fillStyle = `rgba(255, 255, 255, ${node.glowIntensity * 0.5})`;
                ctx.beginPath();
                ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.3, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [scrollProgress]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}

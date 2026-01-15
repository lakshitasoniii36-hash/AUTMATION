'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface ScrollCanvasProps {
    totalFrames: number;
    framePrefix: string;
    frameExtension: string;
}

export default function ScrollCanvas({
    totalFrames,
    framePrefix,
    frameExtension,
}: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // Ensure component is mounted before using useScroll
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Preload all images
    useEffect(() => {
        if (!isMounted) return;

        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const preloadImages = () => {
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(4, '0');
                img.src = `/frames/${framePrefix}${frameNumber}.${frameExtension}`;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalFrames) {
                        setImages(loadedImages);
                        setImagesLoaded(true);
                    }
                };

                img.onerror = () => {
                    // Try SVG fallback for development
                    const svgImg = new Image();
                    svgImg.src = `/frames/${framePrefix}${frameNumber}.svg`;

                    svgImg.onload = () => {
                        loadedImages[i - 1] = svgImg;
                        loadedCount++;
                        if (loadedCount === totalFrames) {
                            setImages(loadedImages);
                            setImagesLoaded(true);
                        }
                    };

                    svgImg.onerror = () => {
                        console.error(`Failed to load frame: ${img.src} and ${svgImg.src}`);
                        loadedCount++;
                        if (loadedCount === totalFrames) {
                            setImages(loadedImages);
                            setImagesLoaded(true);
                        }
                    };
                };

                loadedImages[i - 1] = img;
            }
        };

        preloadImages();
    }, [isMounted, totalFrames, framePrefix, frameExtension]);

    // Draw frame to canvas
    const drawFrame = (frameIdx: number) => {
        if (!canvasRef.current || !images.length) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[Math.floor(frameIdx)];
        if (!img || !img.complete) return;

        // Set canvas size to match container
        const container = canvas.parentElement;
        if (container) {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }

        // Calculate scaling to cover the canvas while maintaining aspect ratio
        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    };

    // Draw initial frame when images are loaded
    useEffect(() => {
        if (imagesLoaded && images.length > 0) {
            drawFrame(0);
        }
    }, [imagesLoaded, images]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            drawFrame(currentFrame);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentFrame, images]);

    // Handle scroll-based frame updates
    useEffect(() => {
        if (!isMounted || !imagesLoaded) return;

        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const scrollStart = -rect.top;
            const scrollEnd = rect.height - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

            const frameIdx = Math.floor(scrollProgress * (totalFrames - 1));
            setCurrentFrame(frameIdx);
            drawFrame(frameIdx);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMounted, imagesLoaded, totalFrames, images]);

    if (!isMounted || !imagesLoaded) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading System</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ imageRendering: 'auto' }}
                />
            </div>
        </div>
    );
}

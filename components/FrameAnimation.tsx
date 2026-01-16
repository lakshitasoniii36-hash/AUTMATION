'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface FrameAnimationProps {
    totalFrames?: number;
    frameRate?: number;
    loop?: boolean;
    autoPlay?: boolean;
    className?: string;
}

export default function FrameAnimation({
    totalFrames = 192,
    frameRate = 30,
    loop = true,
    autoPlay = true,
    className = ''
}: FrameAnimationProps) {
    const [currentFrame, setCurrentFrame] = useState(1);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [imageError, setImageError] = useState<string | null>(null);
    const animationRef = useRef<number>();
    const lastFrameTimeRef = useRef<number>(0);

    const frameInterval = 1000 / frameRate;

    useEffect(() => {
        if (!isPlaying) return;

        const animate = (timestamp: number) => {
            if (timestamp - lastFrameTimeRef.current >= frameInterval) {
                setCurrentFrame((prev) => {
                    const nextFrame = prev + 1;
                    if (nextFrame > totalFrames) {
                        console.log('🔄 Looping back to frame 1');
                        return loop ? 1 : totalFrames;
                    }
                    return nextFrame;
                });
                lastFrameTimeRef.current = timestamp;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, frameRate, totalFrames, loop, frameInterval]);

    const getFramePath = (frameNum: number) => {
        const paddedNum = String(frameNum).padStart(3, '0');
        return `/frames/ezgif-frame-${paddedNum}.png`;
    };

    // Log frame changes
    useEffect(() => {
        const path = getFramePath(currentFrame);
        console.log(`📽️ Frame ${currentFrame}/${totalFrames} → ${path}`);
    }, [currentFrame, totalFrames]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <img
                src={getFramePath(currentFrame)}
                alt={`Frame ${currentFrame}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    const error = `Failed to load frame ${currentFrame}`;
                    console.error('❌', error);
                    setImageError(error);
                }}
                onLoad={() => {
                    setImageError(null);
                }}
            />
            {/* Debug overlay */}
            <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-2 rounded text-sm font-mono space-y-1">
                <div className="text-green-400 font-bold">Frame: {currentFrame}/{totalFrames}</div>
                <div className="text-xs text-gray-400">{getFramePath(currentFrame)}</div>
                {imageError && <div className="text-red-400 text-xs">⚠️ {imageError}</div>}
            </div>
        </div>
    );
}

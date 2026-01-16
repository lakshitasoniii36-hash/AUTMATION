'use client';

import { useState, useEffect } from 'react';

export default function FrameAnimation({
    totalFrames = 192,
    frameRate = 30,
    loop = true,
    className = ''
}) {
    const [currentFrame, setCurrentFrame] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(prev => {
                if (prev >= totalFrames) {
                    console.log(`✅ Reached frame ${prev}, looping back to 1`);
                    return loop ? 1 : totalFrames;
                }
                return prev + 1;
            });
        }, 1000 / frameRate);

        return () => clearInterval(interval);
    }, [frameRate, totalFrames, loop]);

    const getFramePath = (frameNum: number) => {
        const paddedNum = String(frameNum).padStart(3, '0');
        return `/frames/ezgif-frame-${paddedNum}.png`;
    };

    // Log every frame
    useEffect(() => {
        const path = getFramePath(currentFrame);
        console.log(`📽️ Frame ${currentFrame}/${totalFrames} → ${path}`);

        // Special logging for frames 128-130
        if (currentFrame >= 128 && currentFrame <= 130) {
            console.log(`🎯 CRITICAL FRAME ${currentFrame} LOADING!`);
        }
    }, [currentFrame, totalFrames]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <img
                key={currentFrame} // Force re-render on frame change
                src={getFramePath(currentFrame)}
                alt={`Frame ${currentFrame}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    console.error(`❌ FAILED TO LOAD: Frame ${currentFrame} at ${getFramePath(currentFrame)}`);
                }}
                onLoad={() => {
                    if (currentFrame >= 128 && currentFrame <= 130) {
                        console.log(`✅ Successfully loaded frame ${currentFrame}`);
                    }
                }}
            />
            {/* Large debug overlay */}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-6 py-4 rounded-lg text-2xl font-bold shadow-2xl z-50">
                <div>Frame: {currentFrame} / {totalFrames}</div>
                <div className="text-base mt-2 font-mono">{getFramePath(currentFrame)}</div>
            </div>
        </div>
    );
}

"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}

interface ServiceCard {
    id: string
    title: string
    description: string
    icon: string
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
    ({
        controls,
        cards,
        isCarouselActive,
    }: {
        controls: any
        cards: ServiceCard[]
        isCarouselActive: boolean
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
        const cylinderWidth = isScreenSizeSm ? 1200 : 1800
        const faceCount = cards.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        return (
            <div
                className="flex h-full items-center justify-center"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={(_, info) =>
                        isCarouselActive &&
                        controls.start({
                            rotateY: rotation.get() + info.velocity.x * 0.05,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                mass: 0.1,
                            },
                        })
                    }
                    animate={controls}
                >
                    {cards.map((card, i) => (
                        <motion.div
                            key={`key-${card.id}-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center p-3"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                            }}
                        >
                            <motion.div
                                className="w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.85)',
                                    backdropFilter: 'blur(20px)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                                }}
                                initial={{ filter: "blur(2px)" }}
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                            >
                                {/* Gradient overlay for better text contrast */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="text-7xl mb-6" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
                                        {card.icon}
                                    </div>
                                    <h3
                                        className="text-3xl font-bold mb-4"
                                        style={{
                                            color: '#ffffff',
                                            textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className="text-lg leading-relaxed"
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                                            fontWeight: 500
                                        }}
                                    >
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)

Carousel.displayName = "Carousel"

interface ServiceCarouselProps {
    services: ServiceCard[]
}

function ServiceCarousel({ services }: ServiceCarouselProps) {
    const [isCarouselActive, setIsCarouselActive] = useState(true)
    const controls = useAnimation()

    return (
        <motion.div layout className="relative w-full">
            <div className="relative h-[600px] w-full overflow-hidden">
                <Carousel
                    controls={controls}
                    cards={services}
                    isCarouselActive={isCarouselActive}
                />
            </div>
            <div className="text-center mt-8 text-pearl-white/80 text-base font-medium">
                Drag to rotate →
            </div>
        </motion.div>
    )
}

export { ServiceCarousel }

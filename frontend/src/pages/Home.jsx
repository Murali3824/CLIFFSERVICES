import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronUp, Sparkle, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState(1);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const autoplayRef = useRef(null);
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const slides = [
        {
            title: "Web Development",
            subtitle: "Architecting Digital Experiences",
            description: "Crafting responsive, intuitive interfaces that elevate user engagement across platforms.",
            ctaText: "Explore Techniques",
            accent: "emerald",
            icon: "✦",
            path: '/web-development',
        },
        {
            title: "AI & Machine Learning",
            subtitle: "Beyond Human Cognition",
            description: "Pioneering intelligent solutions that adapt, learn, and evolve beyond conventional systems.",
            ctaText: "Discover Innovations",
            accent: "amber",
            icon: "◎",
            path: '/ai-ml',
        },
        {
            title: "Cybersecurity",
            subtitle: "Fortress of Digital Defense",
            description: "Implementing impenetrable barriers against evolving threats in an interconnected world.",
            ctaText: "Inspect Solutions",
            accent: "violet",
            icon: "⬡",
            path: '/cybersecurity',
        },
        {
            title: "AI Hub",
            subtitle: "Intelligence Reimagined",
            description: "An immersive development environment where artificial intelligence meets human ingenuity.",
            ctaText: "Enter Hub",
            accent: "rose",
            icon: "◉",
            path: '/ai-innovation-hub',
        }
    ];

    const accentMap = {
        emerald: {
            light: "text-emerald-300",
            medium: "text-emerald-400",
            dark: "text-emerald-600",
            gradient: "from-emerald-400 to-teal-600",
            bgLight: "bg-emerald-400/10",
            bgMedium: "bg-emerald-500/80",
            border: "border-emerald-400/30",
            shadow: "shadow-emerald-500/20",
            glow: "bg-emerald-500/20"
        },
        amber: {
            light: "text-amber-300",
            medium: "text-amber-400",
            dark: "text-amber-600",
            gradient: "from-amber-400 to-orange-600",
            bgLight: "bg-amber-400/10",
            bgMedium: "bg-amber-500/80",
            border: "border-amber-400/30",
            shadow: "shadow-amber-500/20",
            glow: "bg-amber-500/20"
        },
        violet: {
            light: "text-violet-300",
            medium: "text-violet-400",
            dark: "text-violet-600",
            gradient: "from-violet-400 to-purple-600",
            bgLight: "bg-violet-400/10",
            bgMedium: "bg-violet-500/80",
            border: "border-violet-400/30",
            shadow: "shadow-violet-500/20",
            glow: "bg-violet-500/20"
        },
        rose: {
            light: "text-rose-300",
            medium: "text-rose-400",
            dark: "text-rose-600",
            gradient: "from-rose-400 to-pink-600",
            bgLight: "bg-rose-400/10",
            bgMedium: "bg-rose-500/80",
            border: "border-rose-400/30",
            shadow: "shadow-rose-500/20",
            glow: "bg-rose-500/20"
        }
    };

    const resetAutoplay = () => {
        if (autoplayRef.current) clearTimeout(autoplayRef.current);
        autoplayRef.current = setTimeout(() => {
            setDirection(1);
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
    };

    useEffect(() => {
        resetAutoplay();
        const handleScroll = () => setShowScrollTop(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => {
            if (autoplayRef.current) clearTimeout(autoplayRef.current);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSlide]);

    const handleSlideChange = (index) => {
        if (index === activeSlide) return;
        setDirection(index > activeSlide ? 1 : -1);
        setActiveSlide(index);
        resetAutoplay();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCtaClick = (path) => {
        navigate(path);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <div id='home'
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-gray-950 text-gray-100"
        >
            {/* Ambient background with geometric patterns */}
            <div className="absolute inset-0 z-0">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full"
                        style={{
                            backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03) 1px, transparent 1px),
                radial-gradient(circle at 90% 80%, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
                            backgroundSize: '60px 60px',
                            backgroundPosition: '0 0'
                        }}
                    ></div>
                </div>

                {/* Dynamic color accent based on active slide */}
                <motion.div
                    key={`bg-${activeSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className={`absolute bottom-0 right-0 w-full h-full bg-gradient-radial ${accentMap[slides[activeSlide].accent].glow} opacity-30 blur-3xl`}
                    style={{
                        backgroundSize: '150% 150%',
                        transform: 'translate(30%, 30%) scale(1.5)',
                    }}
                ></motion.div>
            </div>

            {/* Main content container */}
            <div className="relative h-full z-10 flex flex-col">
                {/* Progress bar */}
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-50">
                    <motion.div
                        className={`h-full bg-gradient-to-r ${accentMap[slides[activeSlide].accent].gradient}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        key={activeSlide}
                    />
                </div> */}

                {/* Content slider */}
                <div className="flex-1 flex items-center justify-center px-6 md:px-12">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={activeSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                type: 'spring',
                                stiffness: 80,
                                damping: 20
                            }}
                            className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24"
                        >
                            {/* Left content area */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="space-y-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className={`inline-flex items-center px-3 py-1 rounded-full ${accentMap[slides[activeSlide].accent].bgLight} ${accentMap[slides[activeSlide].accent].medium} text-sm font-medium`}
                                    >
                                        <span className={`mr-2 text-lg ${accentMap[slides[activeSlide].accent].medium}`}>
                                            {slides[activeSlide].icon}
                                        </span>
                                        <span>{slides[activeSlide].subtitle}</span>
                                    </motion.div>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                                    >
                                        <span className="block text-white">{slides[activeSlide].title}</span>
                                        <span className={`inline-block mt-2 ${accentMap[slides[activeSlide].accent].light}`}>
                                            Innovation
                                        </span>
                                    </motion.h1>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="text-gray-400 text-lg max-w-xl"
                                >
                                    {slides[activeSlide].description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.8 }}
                                    className="flex flex-wrap gap-4 pt-4"
                                >
                                    <button
                                        onClick={() => handleCtaClick(slides[activeSlide].path)}
                                        className={`px-8 py-3 bg-gradient-to-r ${accentMap[slides[activeSlide].accent].gradient} text-white rounded-md relative overflow-hidden group`}
                                    >
                                        <span className="relative z-10 flex items-center">
                                            {slides[activeSlide].ctaText}
                                            <ExternalLink size={16} className="ml-2" />
                                        </span>
                                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    </button>
                                </motion.div>
                            </div>

                            {/* Right visual area - unique for each slide */}
                            <div className="w-full md:w-1/2 hidden md:flex justify-center items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="relative w-64 h-64 md:w-80 md:h-80"
                                >
                                    {/* Unique design element for each slide */}
                                    <div className={`absolute inset-0 ${accentMap[slides[activeSlide].accent].shadow} rounded-full opacity-50`}></div>

                                    {/* Different geometric element based on slide index */}
                                    {activeSlide === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                {/* Web Development - Interconnected nodes */}
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={`absolute w-4 h-4 rounded-full ${accentMap.emerald.bgMedium}`}
                                                        style={{
                                                            left: `${Math.cos(Math.PI * 2 * (i / 6)) * 90 + 90}px`,
                                                            top: `${Math.sin(Math.PI * 2 * (i / 6)) * 90 + 90}px`,
                                                        }}
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            opacity: [0.8, 1, 0.8],
                                                        }}
                                                        transition={{
                                                            duration: 4,
                                                            repeat: Infinity,
                                                            delay: i * 0.5,
                                                        }}
                                                    />
                                                ))}
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={`line-${i}`}
                                                        className={`absolute w-40 h-0.5 ${accentMap.emerald.bgLight} origin-left`}
                                                        style={{
                                                            left: '90px',
                                                            top: '90px',
                                                            transform: `rotate(${60 * i}deg)`,
                                                        }}
                                                    />
                                                ))}
                                                <div className={`absolute w-12 h-12 rounded-full ${accentMap.emerald.bgMedium} flex items-center justify-center`} style={{ left: '84px', top: '84px' }}>
                                                    <span className="text-white text-xl">✦</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSlide === 1 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* AI & ML - Neural network concept */}
                                            <motion.div
                                                className="relative w-full h-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                                            >
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={`absolute top-1/2 left-1/2 w-full h-full border-2 ${accentMap.amber.border} rounded-full`}
                                                        style={{
                                                            transform: `translate(-50%, -50%) scale(${0.6 + i * 0.2})`,
                                                        }}
                                                    />
                                                ))}
                                                {[...Array(8)].map((_, i) => (
                                                    <motion.div
                                                        key={`node-${i}`}
                                                        className={`absolute w-3 h-3 rounded-full ${accentMap.amber.bgMedium}`}
                                                        style={{
                                                            left: `${Math.cos(Math.PI * 2 * (i / 8)) * 80 + 80}px`,
                                                            top: `${Math.sin(Math.PI * 2 * (i / 8)) * 80 + 80}px`,
                                                        }}
                                                        animate={{
                                                            opacity: [0.4, 1, 0.4],
                                                            scale: [0.8, 1.2, 0.8],
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            delay: i * 0.3,
                                                        }}
                                                    />
                                                ))}
                                                <div className={`absolute w-16 h-16 rounded-full ${accentMap.amber.bgMedium} flex items-center justify-center`} style={{ left: '72px', top: '72px' }}>
                                                    <span className="text-white text-xl">◎</span>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}

                                    {activeSlide === 2 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Cybersecurity - Honeycomb shield concept */}
                                            <div className="relative">
                                                <motion.div
                                                    className="absolute w-64 h-64 origin-center"
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                                >
                                                    {[...Array(6)].map((_, i) => (
                                                        <motion.div
                                                            key={`hex-${i}`}
                                                            className={`absolute w-32 h-32 ${i % 2 === 0 ? accentMap.violet.border : accentMap.violet.bgLight} opacity-80`}
                                                            style={{
                                                                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                                                transform: `rotate(${i * 60}deg) translateY(-40px)`,
                                                            }}
                                                        />
                                                    ))}
                                                </motion.div>
                                                <div className={`relative w-20 h-20 ${accentMap.violet.bgMedium} flex items-center justify-center`} style={{
                                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                                                }}>
                                                    <span className="text-white text-xl">⬡</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSlide === 3 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* AI Innovation Hub - Pulsing core with orbiting elements */}
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                {/* Orbiting particles */}
                                                {[...Array(12)].map((_, i) => (
                                                    <motion.div
                                                        key={`particle-${i}`}
                                                        className={`absolute w-2 h-2 rounded-full ${accentMap.rose.bgMedium}`}
                                                        animate={{
                                                            x: [
                                                                Math.cos(Math.PI * 2 * (i / 12)) * 100,
                                                                Math.cos(Math.PI * 2 * (i / 12) + Math.PI) * 100,
                                                            ],
                                                            y: [
                                                                Math.sin(Math.PI * 2 * (i / 12)) * 100,
                                                                Math.sin(Math.PI * 2 * (i / 12) + Math.PI) * 100,
                                                            ],
                                                            opacity: [0.2, 1, 0.2],
                                                            scale: [0.8, 1.5, 0.8],
                                                        }}
                                                        transition={{
                                                            duration: 8,
                                                            repeat: Infinity,
                                                            delay: i * 0.2,
                                                            ease: "easeInOut",
                                                        }}
                                                    />
                                                ))}

                                                {/* Concentric rings */}
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={`ring-${i}`}
                                                        className={`absolute rounded-full border ${accentMap.rose.border}`}
                                                        style={{
                                                            width: `${160 - i * 40}px`,
                                                            height: `${160 - i * 40}px`,
                                                            opacity: 0.4 + i * 0.2,
                                                        }}
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                            opacity: [0.4 + i * 0.2, 0.6 + i * 0.2, 0.4 + i * 0.2],
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            delay: i * 0.5,
                                                        }}
                                                    />
                                                ))}

                                                {/* Core element */}
                                                <motion.div
                                                    className={`relative w-24 h-24 rounded-full ${accentMap.rose.bgMedium} flex items-center justify-center z-10`}
                                                    animate={{
                                                        boxShadow: [
                                                            `0 0 20px 0 ${accentMap.rose.glow}`,
                                                            `0 0 40px 10px ${accentMap.rose.glow}`,
                                                            `0 0 20px 0 ${accentMap.rose.glow}`,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                    }}
                                                >
                                                    <span className="text-white text-3xl">◉</span>
                                                </motion.div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation controls */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center z-40 gap-1 md:gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlideChange(index)}
                            className={`group relative py-2 px-1`}
                        >
                            <div className={`w-12 h-1 rounded-full transition-all duration-300 ${index === activeSlide ? accentMap[slides[index].accent].bgMedium : 'bg-gray-700'}`}></div>
                            {index === activeSlide && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${accentMap[slides[index].accent].bgMedium}`}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-medium ${accentMap[slides[index].accent].light}`}>
                                {slides[index].title}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Explore indicator */}
                <motion.div
                    className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Compass className={`w-6 h-6 ${accentMap[slides[activeSlide].accent].light}`} />
                    <span className={`text-xs ${accentMap[slides[activeSlide].accent].light} tracking-widest mt-2`}>SCROLL</span>
                </motion.div>

                {/* Scroll to top button */}
                {/* <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showScrollTop ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className={`fixed bottom-8 right-8 z-40 p-3 rounded-full transition-all duration-300 ${accentMap[slides[activeSlide].accent].bgLight} ${!showScrollTop && 'pointer-events-none'}`}
                >
                    <ChevronUp className={`w-6 h-6 ${accentMap[slides[activeSlide].accent].medium}`} />
                </motion.button> */}
                
            </div>
        </div>
    );
};

export default Home;
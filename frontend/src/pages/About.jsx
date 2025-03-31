import React, { useState, useEffect, useRef } from 'react';

const About = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [isAboutVisible, setIsAboutVisible] = useState(false); // Ensure initial state is false
    const [isMouseInAbout, setIsMouseInAbout] = useState(false);
    const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const cursorRef = useRef(null);
    const aboutRef = useRef(null);

    // Custom cursor effect
    useEffect(() => {
        if (!isAboutVisible) return;

        const handleMouseMove = (e) => {
            if (cursorRef.current && aboutRef.current) {
                const rect = aboutRef.current.getBoundingClientRect();
                const isInside =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                setIsMouseInAbout(isInside);

                requestAnimationFrame(() => {
                    cursorRef.current.style.left = `${e.clientX}px`;
                    cursorRef.current.style.top = `${e.clientY}px`;
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isAboutVisible]);

    // Observer for About section visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting;
                setIsAboutVisible(isVisible);
                // console.log('About section visibility:', isVisible, 'Intersection ratio:', entry.intersectionRatio); // Debugging
            },
            {
                root: null,
                rootMargin: '-5% 0px', // Delay trigger until 5% from top/bottom
                threshold: 0.4, // Require 50% visibility
            }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    // Intersection observer for sections
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setActiveSection(index);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );

        sectionRefs.forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            sectionRefs.forEach((ref) => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    const timelineProgress = `${(activeSection / (sectionRefs.length - 1)) * 100}%`;

    return (
        <div
            ref={aboutRef}
            id="about"
            className="bg-black text-white min-h-screen overflow-hidden relative"
            onMouseEnter={() => setIsMouseInAbout(true)}
            onMouseLeave={() => setIsMouseInAbout(false)}
        >
            {/* Custom cursor */}
            <div
                ref={cursorRef}
                className={`custom-cursor hidden md:block ${isMouseInAbout ? 'opacity-100' : 'opacity-0'}`}
            ></div>

            {/* Noise texture overlay */}
            <div className="noise-overlay"></div>

            {/* Fixed side navigation and progress bar */}
            <div
                className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block transition-opacity duration-300 ${isAboutVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="relative h-48">
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-700"></div>
                    <div
                        className="absolute left-2 top-0 w-px bg-orange-500 origin-top transition-all duration-700 ease-out"
                        style={{ height: timelineProgress }}
                    ></div>

                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => {
                                sectionRefs[index].current.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                });
                            }}
                            className="block w-5 h-5 mb-12 relative z-10 group"
                        >
                            <span
                                className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:w-5 group-hover:h-5
                     ${activeSection >= index
                                        ? 'border-orange-500 bg-orange-500 bg-opacity-30'
                                        : 'border-gray-600 bg-black'}`}
                            ></span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="snap-mandatory snap-y h-screen overflow-auto hide-scrollbar">
                {/* Hero section */}
                <section
                    ref={sectionRefs[0]}
                    data-index="0"
                    className="snap-center h-screen flex items-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="border border-gray-800"></div>
                        ))}
                    </div>
                    <div className="container mx-auto px-6 py-24 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-sm uppercase tracking-widest mb-2 text-orange-500 split-text">SINCE 2008</div>
                            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                                <span className="block text-white glitch-text" data-text="CLIFF">CLIFF</span>
                                <span className="block text-orange-500 glitch-text" data-text="SERVICES">SERVICES</span>
                            </h1>
                            <p className="text-lg md:text-2xl font-light max-w-2xl text-gray-400 leading-relaxed ml-1 split-text">
                                Born in the UK, now leading global innovation. We transform your technological vision into reality with precision and cutting-edge expertise.
                            </p>
                            <div className="mt-16 flex flex-wrap gap-4">
                                <div className="button-glitch">
                                    <span className="button-text">DISCOVER OUR APPROACH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-2/3 bg-orange-500 mix-blend-difference filter blur-3xl rounded-full opacity-30 animate-pulse-slow"></div>
                </section>

                {/* Core values */}
                <section
                    ref={sectionRefs[1]}
                    data-index="1"
                    className="snap-center min-h-screen md:pl-20 flex items-center relative"
                >
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="border border-gray-800"></div>
                        ))}
                    </div>
                    <div className="container mx-auto px-6 py-24 relative z-10">
                        <div className="text-sm uppercase tracking-widest mb-6 text-orange-500 split-text">OUR FOUNDATION</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                            <div className="flex flex-col items-start">
                                <span className="digital-counter text-6xl font-mono text-orange-500 mb-4">01</span>
                                <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase tracking-tight">MISSION</h2>
                                <div className="h-px w-16 bg-orange-500 mb-6"></div>
                                <p className="text-gray-400 split-text">
                                    Crafting cutting-edge tech solutions to empower businesses in a dynamic digital landscape, delivering precision with every interaction.
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="digital-counter text-6xl font-mono text-orange-500 mb-4">02</span>
                                <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase tracking-tight">VISION</h2>
                                <div className="h-px w-16 bg-orange-500 mb-6"></div>
                                <p className="text-gray-400 split-text">
                                    Pioneering a future where technology consulting redefines global innovation and excellence, constantly pushing boundaries.
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="digital-counter text-6xl font-mono text-orange-500 mb-4">03</span>
                                <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase tracking-tight">VALUES</h2>
                                <div className="h-px w-16 bg-orange-500 mb-6"></div>
                                <ul className="text-gray-400 space-y-3">
                                    <li className="flex items-start gap-3 split-text">
                                        <span className="text-orange-500">→</span>
                                        <span><span className="text-white">INNOVATION</span> Redefining IT with bold creativity</span>
                                    </li>
                                    <li className="flex items-start gap-3 split-text">
                                        <span className="text-orange-500">→</span>
                                        <span><span className="text-white">INTEGRITY</span> Unwavering trust in every action</span>
                                    </li>
                                    <li className="flex items-start gap-3 split-text">
                                        <span className="text-orange-500">→</span>
                                        <span><span className="text-white">EXCELLENCE</span> Pursuit of perfection, always</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What sets us apart */}
                <section
                    ref={sectionRefs[3]}
                    data-index="3"
                    className="snap-center min-h-screen  md:pl-20 flex items-center relative overflow-hidden"
                >
                    <div className="container mx-auto px-6 py-24 relative z-10">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/2">
                                <div className="text-sm uppercase tracking-widest mb-6 text-orange-500 split-text">DISTINCTION</div>
                                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-none mb-8">
                                    <span className="block glitch-text" data-text="WHAT">WHAT</span>
                                    <span className="block glitch-text" data-text="SETS">SETS</span>
                                    <span className="block text-orange-500 glitch-text" data-text="US APART">US APART</span>
                                </h2>
                                <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-12 split-text">
                                    We weave legacy expertise with visionary innovation, delivering strategies that transcend time and trends.
                                </p>
                                <div className="hidden md:block p-6 border border-gray-800 bg-black bg-opacity-50 backdrop-blur-sm relative group hover:border-orange-500 transition-all duration-300">
                                    <div className="absolute top-0 right-0 bg-orange-500 w-0 h-1 group-hover:w-full transition-all duration-500"></div>
                                    <div className="absolute bottom-0 left-0 bg-orange-500 w-0 h-1 group-hover:w-full transition-all duration-500"></div>
                                    <div className="text-orange-500 text-3xl mb-4 split-text">"</div>
                                    <p className="text-gray-300 italic mb-6 split-text">
                                        Their proactive approach and deep expertise helped us navigate complex technical challenges with remarkable ease.
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full mr-4"></div>
                                        <div>
                                            <p className="font-bold text-white">Michael Chen</p>
                                            <p className="text-gray-500 text-sm">Director of Operations, GlobalLink</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 grid grid-cols-1 gap-6">
                                <div className="feature-card">
                                    {/* <div className="digital-counter text-xl font-mono text-orange-500 mb-2">01</div> */}
                                    <h3 className="text-2xl font-bold mb-3 uppercase">PROACTIVE SUPPORT</h3>
                                    <p className="text-gray-400">
                                        Anticipating needs, delivering solutions, and elevating success with every interaction.
                                    </p>
                                </div>
                                <div className="feature-card">
                                    {/* <div className="digital-counter text-xl font-mono text-orange-500 mb-2">02</div> */}
                                    <h3 className="text-2xl font-bold mb-3 uppercase">TIMELY PRECISION</h3>
                                    <p className="text-gray-400">
                                        Flawless execution, on schedule, ensuring your vision comes to life seamlessly.
                                    </p>
                                </div>
                                <div className="feature-card">
                                    {/* <div className="digital-counter text-xl font-mono text-orange-500 mb-2">03</div> */}
                                    <h3 className="text-2xl font-bold mb-3 uppercase">DEEP EXPERTISE</h3>
                                    <p className="text-gray-400">
                                        A wealth of knowledge driving transformative results for every client.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-20 top-1/3 w-96 h-96 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
                    <div className="absolute -left-20 bottom-1/3 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
                </section>

                {/* Client success and CTA */}
                {/* <section
                    ref={sectionRefs[3]}
                    data-index="3"
                    className="snap-center min-h-screen flex items-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="border border-gray-800"></div>
                        ))}
                    </div>
                    <div className="container mx-auto px-6 py-24 relative z-10">
                        <div className="text-sm uppercase tracking-widest mb-6 text-orange-500 split-text">SUCCESSFUL PARTNERSHIPS</div>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">
                                <span className="block">CLIENT</span>
                                <span className="block text-orange-500">SUCCESS STORIES</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                                <div className="relative">
                                    <div className="absolute inset-0 border border-gray-800 transform -translate-x-2 -translate-y-2"></div>
                                    <div className="absolute inset-0 border border-gray-800 transform translate-x-2 translate-y-2"></div>
                                    <div className="p-8 border border-gray-800 bg-black relative hover:border-orange-500 transition-all duration-300">
                                        <div className="text-orange-500 text-3xl mb-4">"</div>
                                        <p className="text-gray-300 text-lg italic mb-6">
                                            Cliff Services transformed our outdated systems into a cutting-edge digital platform that increased our productivity by 45%.
                                        </p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-orange-500 rounded-full mr-4"></div>
                                            <div>
                                                <p className="font-bold text-white">Sarah Johnson</p>
                                                <p className="text-gray-500 text-sm">CTO, TechVision Inc</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-12 md:mt-24">
                                    <div className="absolute inset-0 border border-gray-800 transform -translate-x-2 -translate-y-2"></div>
                                    <div className="absolute inset-0 border border-gray-800 transform translate-x-2 translate-y-2"></div>
                                    <div className="p-8 border border-gray-800 bg-black relative hover:border-orange-500 transition-all duration-300">
                                        <div className="text-orange-500 text-3xl mb-4">"</div>
                                        <p className="text-gray-300 text-lg italic mb-6">
                                            Working with Cliff Services gave us the competitive edge we needed in an increasingly digital marketplace.
                                        </p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-orange-500 rounded-full mr-4"></div>
                                            <div>
                                                <p className="font-bold text-white">Alex Rodriguez</p>
                                                <p className="text-gray-500 text-sm">CEO, Future Enterprises</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="inline-block">
                                    <div className="button-glitch-large">
                                        <span className="button-text">LET'S TRANSFORM YOUR BUSINESS</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-6">Ready to redefine what's possible?</p>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>

            {/* Custom CSS - Scoped to About */}
            <style jsx>{`
                /* Hide scrollbar */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                /* Noise overlay - Scoped to About */
                .noise-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.05;
                    pointer-events: none;
                    z-index: 100;
                }

                /* Custom cursor - FIXED alignment issues */
                .custom-cursor {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #f97316;
                    border-radius: 50%;
                    position: fixed; /* Fixed positioning */
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                    will-change: transform; /* Performance optimization */
                    transition: all 0.2s ease; /* Smooth transitions */
                }

                /* Feature card */
                .feature-card {
                    border: 1px solid #1f1f1f;
                    padding: 1.5rem;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    border-color: #f97316;
                    transform: translateY(-5px);
                }

                .feature-card:hover:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background-color: #f97316;
                }

                /* Digital counter */
                .digital-counter {
                    font-family: 'JetBrains Mono', monospace;
                    letter-spacing: -1px;
                }

                /* Text split animation */
                .split-text {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeIn 0.8s forwards;
                    animation-delay: calc(var(--index, 0) * 0.1s);
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Glitch text effect */
                .glitch-text {
                    position: relative;
                    display: inline-block;
                }

                // .glitch-text::before,
                // .glitch-text::after {
                //     content: attr(data-text);
                //     position: absolute;
                //     top: 0;
                //     left: 0;
                //     width: 100%;
                //     height: 100%;
                //     background: black;
                // }

                .glitch-text::before {
                    left: 2px;
                    text-shadow: -1px 0 #f97316;
                    clip: rect(24px, 550px, 90px, 0);
                    animation: glitch-anim-1 2s infinite linear alternate-reverse;
                }

                .glitch-text::after {
                    left: -2px;
                    text-shadow: -1px 0 #5e17eb;
                    clip: rect(85px, 550px, 140px, 0);
                    animation: glitch-anim-2 2s infinite linear alternate-reverse;
                }

                @keyframes glitch-anim-1 {
                    0% { clip: rect(47px, 9999px, 6px, 0); }
                    20% { clip: rect(16px, 9999px, 86px, 0); }
                    40% { clip: rect(89px, 9999px, 59px, 0); }
                    60% { clip: rect(75px, 9999px, 23px, 0); }
                    80% { clip: rect(38px, 9999px, 73px, 0); }
                    100% { clip: rect(20px, 9999px, 45px, 0); }
                }

                @keyframes glitch-anim-2 {
                    0% { clip: rect(65px, 9999px, 91px, 0); }
                    20% { clip: rect(31px, 9999px, 14px, 0); }
                    40% { clip: rect(55px, 9999px, 46px, 0); }
                    60% { clip: rect(82px, 9999px, 31px, 0); }
                    80% { clip: rect(94px, 9999px, 85px, 0); }
                    100% { clip: rect(8px, 9999px, 27px, 0); }
                }

                /* Button styles */
                .button-glitch {
                    position: relative;
                    padding: 15px 30px;
                    background: transparent;
                    border: 1px solid #f97316;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: bold;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s;
                }

                .button-glitch:hover {
                    background: #f97316;
                    color: black;
                }

                .button-glitch:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 3px;
                    background: #f97316;
                    transform: translateX(-5px);
                    transition: all 0.3s;
                }

                .button-glitch:hover:before {
                    transform: translateX(0);
                }

                .button-glitch-large {
                    position: relative;
                    padding: 20px 40px;
                    background: #f97316;
                    color: black;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: bold;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s;
                }

                .button-glitch-large:hover {
                    background: transparent;
                    color: white;
                    border: 1px solid #f97316;
                }

                .button-glitch-large:before,
                .button-glitch-large:after {
                    content: "";
                    position: absolute;
                    height: 100%;
                    width: 1px;
                    background: black;
                    transition: all 0.3s;
                }

                .button-glitch-large:before {
                    left: 0;
                    transform: translateY(-100%);
                }

                .button-glitch-large:after {
                    right: 0;
                    transform: translateY(100%);
                }

                .button-glitch-large:hover:before,
                .button-glitch-large:hover:after {
                    transform: translateY(0);
                    background: #f97316;
                }

                /* Slow pulse animation */
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.3;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.2;
                        transform: translate(-50%, -50%) scale(1.2);
                    }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default About;
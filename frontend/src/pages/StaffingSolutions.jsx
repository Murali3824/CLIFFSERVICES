import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StaffingSolutions = () => {
    // For HSE commitment animation
    const [hseHovered, setHseHovered] = useState(null);

    const [activeFeature, setActiveFeature] = useState(null);
    const [activeSolution, setActiveSolution] = useState(null);
    const [isIntersecting, setIsIntersecting] = useState({
        hero: false,
        features: false,
        solutions: false,
        commitment: false
    });

    // Refs for scroll animations
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const solutionsRef = useRef(null);
    const commitmentRef = useRef(null);

    // Calculate position in a circle
    const getRadius = () => {
        // You can adjust these values to fit your design
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 550) {  // Below md
                return 120; // Smaller radius for mobile
            } else if (window.innerWidth >= 550) {  // lg and above
                return 180; // Larger radius for big screens
            }
        }
        return 140; // Default (md) radius
    };

    // Add this to your component's state
    const [radius, setRadius] = useState(getRadius());

    // Add resize handler in useEffect
    useEffect(() => {
        const handleResize = () => {
            setRadius(getRadius());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Intersection observer setup
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsIntersecting(prev => ({
                        ...prev,
                        [entry.target.id]: true
                    }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (heroRef.current) observer.observe(heroRef.current);
        if (featuresRef.current) observer.observe(featuresRef.current);
        if (solutionsRef.current) observer.observe(solutionsRef.current);
        if (commitmentRef.current) observer.observe(commitmentRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Features data
    const features = [
        {
            title: "Strategic Talent Mapping",
            description: "We meticulously analyze your organization's needs and culture to find candidates who will thrive in your environment.",
            icon: "🎯",
            color: "bg-gradient-to-r from-rose-400 to-orange-400"
        },
        {
            title: "AI-Powered Matching",
            description: "Our proprietary algorithms match candidates to positions with unprecedented accuracy and speed.",
            icon: "🧠",
            color: "bg-gradient-to-r from-purple-400 to-indigo-500"
        },
        {
            title: "Industry Expertise",
            description: "With 15+ years of experience across sectors, we understand the nuances of specialized talent acquisition.",
            icon: "🔍",
            color: "bg-gradient-to-r from-emerald-400 to-cyan-400"
        },
        {
            title: "Seamless Integration",
            description: "Our placement specialists ensure smooth transitions, with comprehensive onboarding support for all new hires.",
            icon: "🔄",
            color: "bg-gradient-to-r from-amber-400 to-yellow-300"
        }
    ];

    // Solutions data
    const solutions = [
        {
            challenge: "Talent Shortage",
            solution: "Access to our exclusive network of pre-vetted professionals across all major industries and specializations.",
            icon: "👥"
        },
        {
            challenge: "Hiring Delays",
            solution: "Accelerated recruitment process that reduces time-to-hire by up to 62% compared to traditional methods.",
            icon: "⏱️"
        },
        {
            challenge: "Skill Gaps",
            solution: "Precision matching that ensures candidates have both technical skills and cultural alignment.",
            icon: "🧩"
        },
        {
            challenge: "High Turnover",
            solution: "Advanced retention analytics that predict and prevent turnover before it happens.",
            icon: "🔄"
        },
        {
            challenge: "Scaling Challenges",
            solution: "Flexible workforce solutions that adapt to your growth needs, from project-based to permanent staffing.",
            icon: "📈"
        },
        {
            challenge: "Budget Constraints",
            solution: "Cost-effective hiring models that provide premium talent without premium prices.",
            icon: "💰"
        }
    ];

    // HSE commitments
    const commitments = [
        { title: "Safety First", desc: "Our certified hires meet rigorous safety standards across all industries.", icon: "🛡️" },
        { title: "Green Practices", desc: "Eco-conscious recruitment processes that reduce environmental impact.", icon: "🌱" },
        { title: "Skill Prep", desc: "Comprehensive training to prepare professionals for hazardous environments.", icon: "📚" },
        { title: "Risk Control", desc: "Proactive foresight and planning to eliminate potential workplace risks.", icon: "⚙️" },
        { title: "Sustainability", desc: "Candidates who align with your organization's green initiatives and goals.", icon: "🌿" },
        { title: "Wellness Core", desc: "Holistic support systems that promote team health and vitality.", icon: "❤️" },
    ];


    return (
        <div id='staffing-solutions' className="min-h-screen bg-gradient-to-tr from-teal-50 via-gray-100 to-sky-50 font-sans overflow-hidden">
            {/* Floating Header with Frame Motion */}
            <motion.header
                className="relative py-8 md:py-12 px-6 bg-gradient-to-r from-teal-500 to-sky-600 text-white transform  shadow-xl"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                <motion.div
                    className="absolute top-0 left-0 w-24 h-24 bg-teal-300 rounded-full opacity-20 -translate-x-12 translate-y-2"
                    animate={{
                        x: [-48, -40, -48],
                        y: [8, 16, 8],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <div className="max-w-4xl mx-auto text-center ">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >Staffing Revolutionized</motion.h1>
                    <motion.p
                        className="text-lg opacity-90"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >15+ years uniting top talent with visionary companies.</motion.p>
                </div>
            </motion.header>

            {/* Features Section - Staggered card layout */}
            <section
                id="features"
                ref={featuresRef}
                className="py-24 bg-white relative"
            >
                <div className="max-w-6xl mx-auto px-4">
                    <div className={`text-center mb-16 transition-all duration-700 transform ${isIntersecting.features ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <h2 className="text-4xl font-bold mb-6">Our Unique Approach</h2>
                        <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                        <p className="mt-6 text-gray-600 max-w-xl mx-auto">
                            We've revolutionized traditional staffing by integrating cutting-edge technology with human expertise.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 relative">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`transition-all duration-700 delay-${idx * 100} transform ${isIntersecting.features ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                                onMouseEnter={() => setActiveFeature(idx)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                <div className={`h-full group bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all ${activeFeature === idx ? 'scale-105' : 'scale-100'}`}>
                                    <div className={`${feature.color} h-2 w-full transform origin-left transition-all duration-500 ${activeFeature === idx ? 'scale-x-100' : 'scale-x-0'}`}></div>
                                    <div className="p-8">
                                        <div className="w-16 h-16 flex items-center justify-center text-3xl bg-gray-100 rounded-lg mb-6">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Connecting lines between cards */}
                        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
                            <div className="absolute top-1/4 left-0 w-full h-px bg-gray-200"></div>
                            <div className="absolute top-3/4 left-0 w-full h-px bg-gray-200"></div>
                            <div className="absolute top-0 left-1/4 w-px h-full bg-gray-200"></div>
                            <div className="absolute top-0 left-3/4 w-px h-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section
  id="solutions"
  ref={solutionsRef}
  className="py-24 bg-gradient-to-b from-gray-50 to-white text-gray-800 relative overflow-hidden"
>
  {/* Subtle Background Elements */}
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full -translate-x-32 translate-y-32 blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-200 rounded-full translate-x-32 -translate-y-32 blur-3xl"></div>
  </div>

  <div className="max-w-6xl mx-auto px-4 relative z-10">
    {/* Header */}
    <div
      className={`text-center mb-16 transition-all duration-700 transform ${
        isIntersecting.solutions ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-4 tracking-wider uppercase">
        Our Approach
      </span>
      <h2 className="text-4xl font-bold mb-6 text-gray-900">Challenges We Transform</h2>
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="h-px w-12 bg-indigo-200"></div>
        <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
        <div className="h-px w-12 bg-indigo-200"></div>
      </div>
      <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
        Turning staffing challenges into opportunities with innovative, tailored solutions.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {solutions.map((solution, idx) => (
        <motion.div
          key={idx}
          className={`transition-all duration-700 delay-${idx * 100} transform ${
            isIntersecting.solutions ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          onMouseEnter={() => setActiveSolution(idx)}
          onMouseLeave={() => setActiveSolution(null)}
        >
          <div
            className={`relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${
              activeSolution === idx ? 'scale-105 border-indigo-200' : 'scale-100'
            }`}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 transition-all duration-300 ${
                activeSolution === idx ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-500'
              }`}
            >
              <span className="text-2xl">{solution.icon}</span>
            </div>

            {/* Title */}
            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                activeSolution === idx ? 'text-indigo-600' : 'text-gray-900'
              }`}
            >
              {solution.challenge}
            </h3>

            {/* Description */}
            <p
              className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                activeSolution === idx ? 'opacity-100 max-h-20' : 'opacity-90 max-h-16'
              }`}
            >
              {solution.solution}
            </p>

            {/* Subtle Accent Bar */}
            <div
              className={`absolute bottom-0 left-0 h-1 bg-indigo-500 rounded-tl-full rounded-tr-full transition-all duration-500 ${
                activeSolution === idx ? 'w-1/2' : 'w-0'
              }`}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Inline CSS for Animations */}
  <style jsx>{`
    .blur-3xl {
      filter: blur(64px);
    }
  `}</style>
</section>
            {/* REDESIGNED: HSE Commitment Section with Frame Motion */}
            <section className="pt-6 pb-20 md:pb-36 px-4 relative overflow-hidden bg-gradient-to-b from-teal-50 to-sky-50">
                {/* Animated background elements with Frame Motion */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {/* Safety symbols that float around */}
                    {commitments.map((commitments, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-3xl opacity-10"
                            initial={{
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 80 + 10}%`,
                                opacity: 0,
                            }}
                            animate={{
                                y: [0, Math.random() * 100 - 50, 0],
                                x: [0, Math.random() * 100 - 50, 0],
                                opacity: [0.05, 0.15, 0.05],
                                rotate: [0, Math.random() * 360, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: Math.random() * 10 + 15,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            }}
                        >
                            {commitments.icon}
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent pb-2">
                            Our HSE Commitment
                        </h2>
                        <p className="mt-4 text-teal-700 max-w-2xl mx-auto">
                            We integrate health, safety, and environmental sustainability into every aspect of our staffing solutions.
                        </p>
                    </div>

                    {/* Circular layout with hover effects */}
                    <div className="relative h-96 md:h-112 mx-auto">
                        {/* Center circle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-teal-500 to-sky-500 rounded-full flex items-center justify-center text-white z-10 shadow-xl">
                            <div className="text-center p-4">
                                <h3 className="font-bold text-lg md:text-xl">HSE</h3>
                                <p className="text-xs md:text-sm mt-1 opacity-90">Health, Safety & Environment</p>
                            </div>
                        </div>

                        {/* Orbiting elements */}
                        {commitments.map((commitments, idx) => {
                            // Calculate position in a circle
                            const angle = (idx * (2 * Math.PI / 6)) - Math.PI / 2; // Start from top
                            // const radius = 140; // Distance from center
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <div
                                    key={idx}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${hseHovered === idx ? 'scale-110 z-20' : 'scale-100 z-10'
                                        }`}
                                    style={{
                                        left: `calc(50% + ${x}px)`,
                                        top: `calc(50% + ${y}px)`,
                                    }}
                                    onMouseEnter={() => setHseHovered(idx)}
                                    onMouseLeave={() => setHseHovered(null)}
                                >
                                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full p-1 ${hseHovered === idx ? 'bg-gradient-to-r from-teal-400 to-sky-400' : 'bg-white/80'
                                        } shadow-lg transition-all duration-300`}>
                                        <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center p-2 text-center">
                                            <div className="text-2xl mb-1">{commitments.icon}</div>
                                            <h3 className="text-xs md:text-sm font-bold text-teal-700">{commitments.title}</h3>

                                            {/* Expanded description on hover */}
                                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 md:w-64 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg z-30 transition-all duration-300 ${hseHovered === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                                }`}>
                                                <p className="text-xs text-gray-700">{commitments.desc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connection line to center */}
                                    <div className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-teal-200 to-transparent transform -translate-y-1/2 origin-left z-0"
                                        style={{
                                            width: `${radius}px`,
                                            rotate: `${angle * (180 / Math.PI)}deg`,
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

        </div>
    );
};

export default StaffingSolutions;
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleServiceClick = (url) => {
        navigate(url);
    };

    const allServices = [
        {
            id: 1,
            title: 'AI/ML Solutions',
            description: 'We provide cutting-edge AI and Machine Learning solutions to optimize your business operations.',
            imageSrc: assets.s1,
            category: 'Technology',
            color: '#4F46E5', // Indigo
            url: '/services/AI-ML-Solutions'
        },
        {
            id: 2,
            title: 'Cyber Security',
            description: 'Secure your data with state-of-the-art cybersecurity solutions and proactive risk assessment.',
            imageSrc: assets.s2,
            category: 'Security',
            color: '#DC2626', // Red
            url: '/services/Cyber-Security'
        },
        {
            id: 3,
            title: 'Healthcare',
            description: 'Innovative healthcare solutions to enhance patient care and streamline operations.',
            imageSrc: assets.s12,
            category: 'Health',
            color: '#059669', // Green
            url: '/services/Healthcare'
        },
        {
            id: 4,
            title: 'Business Intelligence',
            description: 'Transform raw data into actionable insights with our BI solutions.',
            imageSrc: assets.s3,
            category: 'Analytics',
            color: '#D97706', // Amber
            url: '/services/Business-Intelligence'
        },
        {
            id: 5,
            title: 'Cloud Technologies',
            description: 'Scalable and secure cloud solutions to accelerate digital transformation.',
            imageSrc: assets.s4,
            category: 'Technology',
            color: '#7C3AED', // Violet
            url: '/services/Cloud-Technologies'
        },
        {
            id: 6,
            title: 'Web Development',
            description: 'Custom web applications and responsive websites tailored to your needs.',
            imageSrc: assets.s5,
            category: 'Development',
            color: '#0891B2', // Cyan
            url: '/services/Web-Development'
        },
        {
            id: 7,
            title: 'Oracle',
            description: 'Comprehensive Oracle solutions for database management and enterprise applications.',
            imageSrc: assets.s6,
            category: 'Database',
            color: '#EA580C', // Orange
            url: '/services/Oracle'
        },
        {
            id: 8,
            title: 'SAP Solutions',
            description: 'SAP implementation and support services to enhance business efficiency.',
            imageSrc: assets.s7,
            category: 'Enterprise',
            color: '#0D9488', // Teal
            url: '/services/SAP-Solutions'
        },
        {
            id: 9,
            title: 'SAS CDM',
            description: 'SAS Clinical Data Management solutions to streamline clinical trials and research.',
            imageSrc: assets.s8,
            category: 'Health',
            color: '#65A30D', // Lime
            url: '/services/SAS-CDM'
        },
        {
            id: 10,
            title: 'PMC',
            description: 'Project Management Consultancy services to drive business success.',
            imageSrc: assets.s9,
            category: 'Management',
            color: '#DB2777', // Pink
            url: '/services/PMC'
        },
        {
            id: 11,
            title: 'Workforce Management',
            description: 'End-to-end workforce management solutions to optimize human resources.',
            imageSrc: assets.s10,
            category: 'Management',
            color: '#4F46E5', // Indigo
            url: '/services/Workforce-Management'
        },
        {
            id: 12,
            title: 'GSI',
            description: 'Global System Integrator solutions for seamless digital transformation.',
            imageSrc: assets.s11,
            category: 'Integration',
            color: '#BE123C', // Rose
            url: '/services/GSI'
        }
    ];

    const categories = ['All', ...new Set(allServices.map(service => service.category))];
    const filteredServices = activeCategory === 'All' 
        ? allServices 
        : allServices.filter(service => service.category === activeCategory);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const categoryVariants = {
        inactive: { scale: 1 },
        active: { 
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id='services' className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-2 md:px-4">
                {/* Heading with animation */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                        Innovative Solutions Await
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Discover our unique blend of services crafted to elevate your business
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar with floating effect */}
                    <motion.div 
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/4"
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-2.5 sm:4 md:p-6 sticky top-24 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Explore Categories
                            </h3>
                            
                            <div className="space-y-3 grid grid-cols-2 gap-2 md:grid-cols-1">
                                {categories.map((category) => (
                                    <motion.button
                                        key={category}
                                        variants={categoryVariants}
                                        animate={activeCategory === category ? "active" : "inactive"}
                                        whileHover={{ scale: 1.03 }}
                                        onClick={() => setActiveCategory(category)}
                                        className={`w-full flex items-center justify-between px-2 md:px-4 py-3 rounded-lg transition-all duration-300 ${
                                            activeCategory === category 
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span>{category}</span>
                                        {/* <span className={`text-xs px-2 py-1 rounded-full ${
                                            activeCategory === category
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}>
                                            {category === 'All' 
                                                ? allServices.length 
                                                : allServices.filter(s => s.category === category).length}
                                        </span> */}
                                    </motion.button>
                                ))}
                            </div>

                            {/* <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100"
                            >
                                <h4 className="text-indigo-700 font-semibold mb-2">Lost in Choices?</h4>
                                <p className="text-gray-600 text-sm mb-3">
                                    Let us guide you to the perfect solution
                                </p>
                                <button className="text-sm font-medium text-indigo-600 hover:text-purple-600 flex items-center group">
                                    <span>Connect with us</span>
                                    <svg className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </motion.div> */}
                            
                        </div>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="lg:w-3/4">
                        <AnimatePresence mode="wait">
                            {activeCategory !== 'All' && (
                                <motion.div
                                    key="category-desc"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeCategory} Services</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
                        >
                            {filteredServices.map((service) => (
                                <motion.div
                                    key={service.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className={`group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${
                                        isLoading ? 'animate-pulse' : ''
                                    }`}
                                >
                                    <div 
                                        className="h-56 relative cursor-pointer overflow-hidden"
                                        onClick={() => handleServiceClick(service.url)}
                                    >
                                        <motion.img
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            src={service.imageSrc}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"
                                        >
                                            <span 
                                                className="absolute top-4 right-4 text-xs font-medium py-1 px-3 rounded-full bg-white/90"
                                                style={{ color: service.color }}
                                            >
                                                {service.category}
                                            </span>
                                        </motion.div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center">
                                            <motion.div 
                                                className="w-1 h-12 rounded-full mr-4"
                                                style={{ backgroundColor: service.color }}
                                                initial={{ height: 0 }}
                                                animate={{ height: 34 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            />
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {service.title}
                                            </h3>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {service.description}
                                        </p>

                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            onClick={() => handleServiceClick(service.url)}
                                            className="flex items-center text-sm font-semibold"
                                            style={{ color: service.color }}
                                        >
                                            <span>Discover More</span>
                                            <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredServices.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
                            >
                                {/* ... (keeping your empty state) */}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
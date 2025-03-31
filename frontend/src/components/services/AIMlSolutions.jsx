import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { ChartLine, Languages, Image, Bot, ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from "react-router-dom";


const AIMlSolutions = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'whatWeDo', label: 'What We Do' },
        { id: 'challenges', label: 'Challenges & Solutions' },
        { id: 'differentiators', label: 'Our Differentiators' },
        { id: 'approaches', label: 'Our Approaches' }
    ];

    // Overview content as object
    const overviewContent = {
        title: 'Overview',
        paragraphs: [
            {
                id: 1,
                text: "Navigating the transformative world of AI/ML for a decade, we've been at the epicenter of its evolution, from foundational algorithms to today's cutting-edge neural networks."
            },
            {
                id: 2,
                text: "Our depth of understanding transcends technology, delving deep into real-world applications and solutions. Recognizing the myriad of challenges and opportunities that AI/ML presents, our approach is rooted in both strategic innovation and ethical considerations."
            },
            {
                id: 3,
                text: "We are dedicated to harnessing the true potential of AI/ML, crafting solutions that not only align with your business goals but also drive sustainable growth. Partner with us and leverage a legacy of AI/ML mastery for your digital endeavours."
            }
        ]
    };

    // What We Do cards
    const whatWeDoItems = [
        { id: 1, title: 'Predictive Analytics', description: 'Harnessing historical data, we design models that forecast trends, enabling proactive business strategies and informed decision-making.', icon: <ChartLine />, color: 'text-blue-600' },
        { id: 2, title: 'Natural Language Processing (NLP)', description: 'We craft sophisticated NLP solutions, enabling machines to understand, interpret, and respond to human language, enhancing user engagement.', icon: <Languages />, color: 'text-purple-600' },
        { id: 3, title: 'Image & Video Recognition', description: 'Using advanced neural networks, we provide solutions that can accurately detect, classify, and tag visual content, opening avenues for diverse applications.', icon: <Image />, color: 'text-green-600' },
        { id: 4, title: 'AI Chatbots & Virtual Assistants', description: 'Enhance user interactions with AI-powered chatbots and assistants that can handle queries, support tasks, and offer personalized assistance 24/7.', icon: <Bot />, color: 'text-orange-600' }
    ];

    // Challenges and Solutions
    const challengesItems = [
        {
            id: 1,
            challenge: 'Data Inconsistencies',
            solution: 'AI thrives on quality data. We\'ve perfected data cleansing and preprocessing techniques to ensure the integrity of your AI models, resulting in reliable and actionable insights.'
        },
        {
            id: 2,
            challenge: 'Model Overfitting',
            solution: 'A common AI pitfall. Drawing from years of model tuning, we deploy regularization methods and cross-validation, ensuring models generalize well and are robust in real-world scenarios.'
        },
        {
            id: 3,
            challenge: 'Scalability Issues',
            solution: 'As AI operations expand, scaling becomes a challenge. Our modular AI solutions ensure seamless scalability, accommodating growing data and complex computations without performance drops.'
        },
        {
            id: 4,
            challenge: 'Real-time Processing Delays',
            solution: 'In an era of immediacy, real-time AI insights are crucial. Our optimized models and efficient algorithms ensure swift computations, facilitating real-time AI responses.'
        },
        {
            id: 5,
            challenge: 'Integration Hiccups',
            solution: 'AI/ML solutions must integrate with existing systems. Drawing from our vast experience, we ensure smooth integrations, minimizing disruptions and maximizing efficiency.'
        },
        {
            id: 6,
            challenge: 'Ethical Concerns',
            solution: 'Unchecked AI can perpetuate biases. With our deep expertise, we\'ve established methodologies for bias detection and correction, ensuring AI models are fair and ethically sound.'
        }
    ];

    // Differentiators
    const differentiatorItems = [
        {
            id: 1,
            title: 'Full-Spectrum Expertise',
            description: 'From data preprocessing to intricate model deployment, we offer end-to-end AI/ML services, ensuring every phase is executed with precision.'
        },
        {
            id: 2,
            title: 'Scalability at Core',
            description: 'Drawing from diverse project experiences, we engineer solutions designed for seamless scalability, ensuring growth-readiness at all times.'
        },
        {
            id: 3,
            title: 'Bespoke AI Strategies',
            description: 'Understanding the nuanced needs of different sectors, we craft customized AI solutions, tailored to deliver optimal results specific to each domain.'
        },
        {
            id: 4,
            title: 'Collaborative AI Design',
            description: 'Believing in collaborative innovation, we engage closely with clients throughout the AI solutioning process, ensuring alignment with business objectives.'
        }
    ];

    // Approaches content as object
    const approachesContent = {
        title: 'Our Approaches',
        paragraphs: [
            {
                id: 1,
                text: "With a decade of immersion in the AI/ML domain, our expertise bridges the gap between vast data terrains and actionable insights. Central to our offerings is our distinct philosophy."
            },
            {
                id: 2,
                text: "We prioritize a holistic data strategy, ensuring end-to-end integrity and optimal model training. By adopting an iterative model development process, we ensure adaptability, precision, and relevance."
            },
            {
                id: 3,
                text: "Additionally, our deep-rooted commitment to ethical AI translates into transparent, accountable, and bias-minimized solutions."
            },
            {
                id: 4,
                text: "Together, these pillars, refined over 10 years, drive our AI/ML endeavors, offering you the zenith of technological excellence."
            }
        ]
    };

    const getColorClass = (tab) => {
        switch (tab) {
            case 'overview': return 'from-blue-500 to-purple-600';
            case 'whatWeDo': return 'from-green-500 to-blue-600';
            case 'challenges': return 'from-red-500 to-orange-600';
            case 'differentiators': return 'from-purple-500 to-pink-600';
            case 'approaches': return 'from-teal-500 to-blue-600';
            default: return 'from-blue-500 to-purple-600';
        }
    };


    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAgMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAgMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6TTE4IDM0YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wLTE4YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wLTE4YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
                </div>

                <div className="container max-h-screen mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <div className="mb-8">
                                <RouterLink
                                    to="/#services"
                                    className="inline-flex items-center text-gray-200 hover:text-blue-400 transition-colors"
                                >
                                    <ArrowLeft size={18} className="mr-2" />
                                    <span>Back to Services</span>
                                </RouterLink>
                            </div>
                            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-white/10 text-white">
                                Our Services
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    AI/ML Solutions
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Navigating the transformative world of AI/ML for a decade, we've been at the epicenter of its evolution, from foundational algorithms to today's cutting-edge neural networks.
                            </p>
                            <div className="flex space-x-4">
                                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:shadow-lg transition-all duration-300">
                                    Get Started
                                </button>
                                <button className="px-6 py-3 bg-white/10 rounded-full font-medium text-white hover:bg-white/20 transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                                <div className="relative">
                                    <img
                                        src={assets.s1 || "/placeholder-ai-ml.jpg"}
                                        alt="AI/ML Solutions"
                                        className="rounded-xl shadow-2xl w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="py-8 border-b border-gray-200 bg-white sticky top-14 z-20 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto hide-scrollbar gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 whitespace-nowrap font-medium rounded-full transition-all duration-300 ${activeTab === tab.id
                                        ? `bg-gradient-to-r ${getColorClass(tab.id)} text-white shadow-md`
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8 text-gray-800">{overviewContent.title}</h2>
                            <div className="prose prose-lg max-w-none">
                                {overviewContent.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.id}
                                        className="text-gray-600 mb-6 text-lg leading-relaxed"
                                    >
                                        {paragraph.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* What We Do Tab */}
                    {activeTab === 'whatWeDo' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">What We Do</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {whatWeDoItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    >
                                        <div className={`${item.color} mr-4 flex items-center mb-4`}>
                                            {item.icon}
                                            <h3 className="text-xl font-bold ml-4 text-gray-800">{item.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Challenges Tab */}
                    {activeTab === 'challenges' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Challenges & Solutions</h2>
                            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                                In the rapidly evolving field of AI, we address key challenges through innovative solutions:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {challengesItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
                                    >
                                        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
                                            {item.challenge}
                                        </h3>
                                        <p className="text-gray-600">{item.solution}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Differentiators Tab */}
                    {activeTab === 'differentiators' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Differentiators</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {differentiatorItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-purple-100"
                                    >
                                        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Approaches Tab */}
                    {activeTab === 'approaches' && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{approachesContent.title}</h2>
                            <div className="prose prose-lg max-w-none">
                                {approachesContent.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.id}
                                        className="text-gray-600 mb-6 text-lg leading-relaxed"
                                    >
                                        {paragraph.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AIMlSolutions;
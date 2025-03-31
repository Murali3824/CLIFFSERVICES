import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { assets } from '../../assets/assets';
import { Database, Cloud, Code, Gauge, ArrowLeft } from 'lucide-react';

const Oracle = () => {
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
            text: "For over a decade, we've mastered Oracle technologies, evolving with its ecosystem to deliver robust database and application solutions."
        },
        {
            id: 2,
            text: "Our expertise spans Oracle’s full suite, from database management to cloud integrations, solving complex business challenges with precision."
        },
        {
            id: 3,
            text: "We empower organizations with Oracle-driven solutions that optimize operations, enhance data management, and support long-term growth."
        }
    ]
};

// What We Do cards
const whatWeDoItems = [
    {
        id: 1,
        title: 'Database Management',
        description: 'We provide comprehensive Oracle database solutions, ensuring high availability, performance, and security for your critical data.',
        icon: <Database size={24} />,
        color: 'text-blue-600'
    },
    {
        id: 2,
        title: 'Oracle Cloud Solutions',
        description: 'Leverage Oracle Cloud for scalable infrastructure, enabling seamless migrations and cost-effective operations.',
        icon: <Cloud size={24} />,
        color: 'text-purple-600'
    },
    {
        id: 3,
        title: 'Application Development',
        description: 'We build custom applications using Oracle tools, delivering tailored solutions that align with your business processes.',
        icon: <Code size={24} />,
        color: 'text-green-600'
    },
    {
        id: 4,
        title: 'Performance Tuning',
        description: 'Optimize your Oracle systems with our expert tuning services, ensuring peak efficiency and minimal downtime.',
        icon: <Gauge size={24} />,
        color: 'text-orange-600'
    }
];


// Challenges and Solutions
const challengesItems = [
    {
        id: 1,
        challenge: 'Data Migration Complexity',
        solution: 'We streamline migrations with proven methodologies, ensuring data integrity and minimal disruption during transitions.'
    },
    {
        id: 2,
        challenge: 'System Downtime',
        solution: 'Our proactive monitoring and optimization reduce downtime, keeping your Oracle systems running smoothly.'
    },
    {
        id: 3,
        challenge: 'Scalability Limits',
        solution: 'We design Oracle solutions with scalability in mind, supporting growing data volumes and user demands effortlessly.'
    },
    {
        id: 4,
        challenge: 'Security Risks',
        solution: 'Advanced security configurations and compliance measures protect your Oracle environment from threats.'
    },
    {
        id: 5,
        challenge: 'Integration Challenges',
        solution: 'Our deep Oracle expertise ensures seamless integration with existing systems and third-party tools.'
    },
    {
        id: 6,
        challenge: 'Cost Management',
        solution: 'We optimize Oracle deployments to balance performance and cost, delivering value without overspending.'
    }
];

// Differentiators
const differentiatorItems = [
    {
        id: 1,
        title: 'Comprehensive Oracle Mastery',
        description: 'We cover the full Oracle stack, delivering expertise across databases, applications, and cloud services.'
    },
    {
        id: 2,
        title: 'Scalable Deployments',
        description: 'Our solutions are engineered to scale, ensuring your Oracle systems grow with your business.'
    },
    {
        id: 3,
        title: 'Tailored Implementations',
        description: 'We customize Oracle solutions to fit your unique operational needs and industry requirements.'
    },
    {
        id: 4,
        title: 'Partnership Approach',
        description: 'We collaborate closely with you, aligning Oracle deployments with your strategic goals.'
    }
];

// Approaches content as object
const approachesContent = {
    title: 'Our Approaches',
    paragraphs: [
        {
            id: 1,
            text: "With extensive Oracle experience, we transform complex data challenges into streamlined, efficient solutions."
        },
        {
            id: 2,
            text: "Our methodology focuses on optimization, security, and scalability to maximize Oracle’s potential."
        },
        {
            id: 3,
            text: "We emphasize proactive support and continuous improvement, ensuring long-term system reliability."
        },
        {
            id: 4,
            text: "This refined approach delivers Oracle solutions that drive operational excellence and business value."
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

                <div className="container mx-auto px-6 relative z-10">
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
                                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                                    Oracle Solutions
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Comprehensive Oracle solutions for database management, enterprise applications, and seamless business operations.
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
                                        src={assets.s6 || "/placeholder-ai-ml.jpg"}
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

export default Oracle;
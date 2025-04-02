import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { assets } from '../../assets/assets';
import { BarChart3, FileText, Database, Settings2, ArrowLeft } from 'lucide-react';

const BusinessIntelligence = () => {
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
                text: "For over a decade, we've been shaping the Business Intelligence landscape, transforming raw data into strategic insights that empower organizations to thrive."
            },
            {
                id: 2,
                text: "Our expertise goes beyond tools and dashboards, focusing on delivering actionable intelligence that aligns with your goals while addressing real-world business challenges."
            },
            {
                id: 3,
                text: "Partner with us to unlock the full potential of your data, driving smarter decisions and sustainable growth through our proven BI mastery."
            }
        ]
    };

    // What We Do cards

    const whatWeDoItems = [
        {
            id: 1,
            title: 'Data Visualization',
            description: 'We create intuitive dashboards and visualizations that turn complex datasets into clear, actionable insights for all stakeholders.',
            icon: <BarChart3 />,
            color: 'text-blue-600'
        },
        {
            id: 2,
            title: 'Performance Reporting',
            description: 'Our solutions deliver real-time performance metrics, enabling businesses to monitor KPIs and optimize operations effectively.',
            icon: <FileText />,
            color: 'text-purple-600'
        },
        {
            id: 3,
            title: 'Data Warehousing',
            description: 'We design robust data warehouses to centralize and manage your data, ensuring fast access and reliable analytics.',
            icon: <Database />,
            color: 'text-green-600'
        },
        {
            id: 4,
            title: 'Self-Service BI',
            description: 'Empower your teams with user-friendly BI tools that allow non-technical users to explore data and generate insights independently.',
            icon: <Settings2 />,
            color: 'text-orange-600'
        }
    ];


    // Challenges and Solutions
    const challengesItems = [
        {
            id: 1,
            challenge: 'Data Silos',
            solution: 'We break down silos with integrated BI platforms, ensuring all data sources work together for a unified view.'
        },
        {
            id: 2,
            challenge: 'Poor Data Quality',
            solution: 'Our advanced cleansing processes ensure your BI insights are built on accurate, consistent, and trustworthy data.'
        },
        {
            id: 3,
            challenge: 'Scalability Limits',
            solution: 'We architect BI systems that scale effortlessly, handling growing data volumes without compromising performance.'
        },
        {
            id: 4,
            challenge: 'User Adoption',
            solution: 'With intuitive interfaces and tailored training, we ensure your team embraces BI tools with confidence and ease.'
        },
        {
            id: 5,
            challenge: 'Integration Complexity',
            solution: 'Our expertise ensures seamless BI integration with existing systems, minimizing disruptions and maximizing value.'
        },
        {
            id: 6,
            challenge: 'Insight Delays',
            solution: 'We optimize data pipelines for real-time reporting, delivering timely insights to keep you ahead of the curve.'
        }
    ];

    // Differentiators
    const differentiatorItems = [
        {
            id: 1,
            title: 'End-to-End BI Mastery',
            description: 'From data collection to final reporting, we provide comprehensive BI services executed with precision.'
        },
        {
            id: 2,
            title: 'Scalable BI Frameworks',
            description: 'Our solutions are built to grow with your business, ensuring long-term performance and adaptability.'
        },
        {
            id: 3,
            title: 'Custom BI Strategies',
            description: 'We tailor BI solutions to your industry and objectives, delivering insights that matter most to you.'
        },
        {
            id: 4,
            title: 'Collaborative BI Design',
            description: 'We work closely with you to design BI tools that align with your vision and operational needs.'
        }
    ];

    // Approaches content as object
    const approachesContent = {
        title: 'Our Approaches',
        paragraphs: [
            {
                id: 1,
                text: "With years of Business Intelligence expertise, we transform raw data into a strategic asset, delivering clarity and value."
            },
            {
                id: 2,
                text: "Our approach emphasizes integrated data strategies and iterative development, ensuring precision and adaptability in every solution."
            },
            {
                id: 3,
                text: "We are committed to delivering transparent, user-focused BI tools that drive informed decisions and measurable outcomes."
            },
            {
                id: 4,
                text: "These principles, honed over a decade, define our BI services, offering you excellence in data-driven decision-making."
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
                                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Business Intelligence Solutions
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Unlock actionable insights from your data with our advanced BI solutions, turning raw information into strategic decision-making tools for business growth.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                                <div className="relative">
                                    <img
                                        src={assets.s3 || "/placeholder-ai-ml.jpg"}
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

export default BusinessIntelligence;
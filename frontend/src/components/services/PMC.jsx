import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { assets } from '../../assets/assets';
import { Calendar, AlertTriangle, Users, LineChart, ArrowLeft } from 'lucide-react';

const PMC = () => {
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
                text: "With a decade of project management expertise, we’ve successfully guided complex initiatives across industries to timely, on-budget completion."
            },
            {
                id: 2,
                text: "Our consultancy transcends traditional PM, blending strategic oversight with hands-on execution to deliver measurable results."
            },
            {
                id: 3,
                text: "We empower your projects with proven methodologies, ensuring alignment with goals, risk mitigation, and sustainable success."
            }
        ]
    };

    // What We Do cards
    const whatWeDoItems = [
        {
            id: 1,
            title: 'Project Planning',
            description: 'We create detailed roadmaps, aligning resources, timelines, and objectives for seamless project execution.',
            icon: <Calendar size={24} />,
            color: 'text-blue-600'
        },
        {
            id: 2,
            title: 'Risk Management',
            description: 'Proactive risk identification and mitigation strategies keep your projects on track and within scope.',
            icon: <AlertTriangle size={24} />,
            color: 'text-purple-600'
        },
        {
            id: 3,
            title: 'Resource Optimization',
            description: 'We maximize efficiency by aligning talent and tools with project demands, reducing waste and costs.',
            icon: <Users size={24} />,
            color: 'text-green-600'
        },
        {
            id: 4,
            title: 'Performance Monitoring',
            description: 'Real-time tracking and reporting ensure projects stay aligned with KPIs and deliverables.',
            icon: <LineChart size={24} />,
            color: 'text-orange-600'
        }
    ];

    // Challenges and Solutions
    const challengesItems = [
        {
            id: 1,
            challenge: 'Scope Creep',
            solution: 'We enforce strict scope management and change control processes to keep projects focused.'
        },
        {
            id: 2,
            challenge: 'Budget Overruns',
            solution: 'Detailed cost planning and continuous monitoring prevent financial surprises.'
        },
        {
            id: 3,
            challenge: 'Timeline Delays',
            solution: 'Our agile scheduling and contingency planning ensure timely project delivery.'
        },
        {
            id: 4,
            challenge: 'Stakeholder Misalignment',
            solution: 'Regular communication and alignment sessions keep all parties on the same page.'
        },
        {
            id: 5,
            challenge: 'Resource Conflicts',
            solution: 'We optimize allocation and resolve conflicts with strategic resource management.'
        },
        {
            id: 6,
            challenge: 'Quality Assurance',
            solution: 'Rigorous QA processes ensure deliverables meet or exceed expectations.'
        }
    ];

    // Differentiators
    const differentiatorItems = [
        {
            id: 1,
            title: 'End-to-End Oversight',
            description: 'We manage every project phase, from inception to closure, with precision and care.'
        },
        {
            id: 2,
            title: 'Scalable Methodologies',
            description: 'Our flexible frameworks adapt to projects of any size or complexity.'
        },
        {
            id: 3,
            title: 'Customized Strategies',
            description: 'We tailor PMC services to your specific goals, industry, and challenges.'
        },
        {
            id: 4,
            title: 'Collaborative Leadership',
            description: 'We partner with your team, fostering collaboration and ownership at every level.'
        }
    ];

    // Approaches content as object
    const approachesContent = {
        title: 'Our Approaches',
        paragraphs: [
            {
                id: 1,
                text: "With extensive PMC experience, we turn project complexity into structured success."
            },
            {
                id: 2,
                text: "Our approach blends proven methodologies with adaptability, ensuring consistent results."
            },
            {
                id: 3,
                text: "We focus on risk management, stakeholder engagement, and performance optimization."
            },
            {
                id: 4,
                text: "This refined process delivers projects that meet deadlines, budgets, and quality standards."
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
                                <span className="bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                                    PMC (Project Management Consultancy) Solutions
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Optimize project execution with our consultancy services, ensuring efficiency, risk mitigation, and strategic project alignment.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                                <div className="relative">
                                    <img
                                        src={assets.s9 || "/placeholder-ai-ml.jpg"}
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

export default PMC;
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { assets } from '../../assets/assets';
import { CloudUpload, ShieldCheck, Settings, Cloud, ArrowLeft } from 'lucide-react';

const CloudTechnologies = () => {
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
                text: "With a decade of expertise in Cloud Technologies, we've guided businesses through the shift to scalable, secure, and efficient cloud ecosystems."
            },
            {
                id: 2,
                text: "Our deep knowledge spans infrastructure, platforms, and services, delivering solutions that meet both technical and business demands."
            },
            {
                id: 3,
                text: "Partner with us to harness the power of the cloud, driving agility, cost-efficiency, and innovation for your organization."
            }
        ]
    };

    // What We Do cards

    const whatWeDoItems = [
        {
            id: 1,
            title: 'Cloud Migration',
            description: 'We seamlessly transition your workloads to the cloud, minimizing downtime and ensuring data integrity throughout.',
            icon: <CloudUpload />,
            color: 'text-blue-600'
        },
        {
            id: 2,
            title: 'Cloud Security',
            description: 'Our robust security frameworks protect your cloud assets, ensuring compliance and resilience against threats.',
            icon: <ShieldCheck />,
            color: 'text-purple-600'
        },
        {
            id: 3,
            title: 'Serverless Computing',
            description: 'We build scalable, cost-effective serverless applications, freeing you from infrastructure management.',
            icon: <Settings />,
            color: 'text-green-600'
        },
        {
            id: 4,
            title: 'Multi-Cloud Management',
            description: 'Optimize performance and costs with our expertise in managing multi-cloud environments tailored to your needs.',
            icon: <Cloud />,
            color: 'text-orange-600'
        }
    ];



    // Challenges and Solutions
    const challengesItems = [
        {
            id: 1,
            challenge: 'Migration Risks',
            solution: 'We mitigate risks with proven migration strategies, ensuring smooth transitions with zero data loss.'
        },
        {
            id: 2,
            challenge: 'Cost Overruns',
            solution: 'Our cost-optimization tools and practices keep cloud expenses in check without sacrificing performance.'
        },
        {
            id: 3,
            challenge: 'Security Gaps',
            solution: 'We implement end-to-end encryption and monitoring to secure your cloud infrastructure at every layer.'
        },
        {
            id: 4,
            challenge: 'Downtime Issues',
            solution: 'Our high-availability designs ensure minimal disruptions, keeping your operations running smoothly.'
        },
        {
            id: 5,
            challenge: 'Vendor Lock-In',
            solution: 'We design flexible architectures to avoid lock-in, giving you freedom across cloud providers.'
        },
        {
            id: 6,
            challenge: 'Scalability Bottlenecks',
            solution: 'Our elastic solutions scale dynamically, handling peak loads without compromising efficiency.'
        }
    ];

    // Differentiators
    const differentiatorItems = [
        {
            id: 1,
            title: 'Comprehensive Cloud Expertise',
            description: 'From migration to optimization, we deliver full-spectrum cloud services with precision.'
        },
        {
            id: 2,
            title: 'Scalability by Design',
            description: 'Our cloud solutions are built to scale effortlessly, supporting your growth at every stage.'
        },
        {
            id: 3,
            title: 'Tailored Cloud Strategies',
            description: 'We customize cloud deployments to align with your unique business needs and goals.'
        },
        {
            id: 4,
            title: 'Collaborative Cloud Planning',
            description: 'We partner with you to design cloud solutions that enhance agility and efficiency.'
        }
    ];

    // Approaches content as object
    const approachesContent = {
        title: 'Our Approaches',
        paragraphs: [
            {
                id: 1,
                text: "With a decade in Cloud Technologies, we turn infrastructure challenges into opportunities for innovation and growth."
            },
            {
                id: 2,
                text: "Our approach focuses on seamless migrations, robust security, and iterative optimization for peak performance."
            },
            {
                id: 3,
                text: "We prioritize flexibility and transparency, ensuring your cloud journey is cost-effective and future-ready."
            },
            {
                id: 4,
                text: "These core tenets, refined over years, drive our cloud services, delivering unmatched value to your business."
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
                                <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                                    Cloud Technologies Solutions
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Accelerate your digital transformation with scalable and secure cloud solutions, ensuring agility, security, and seamless business operations.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                                <div className="relative">
                                    <img
                                        src={assets.s4 || "/placeholder-ai-ml.jpg"}
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

export default CloudTechnologies;
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { assets } from '../../assets/assets';
import { ShieldAlert, Lock, Wifi, Scale, ArrowLeft } from 'lucide-react';

const CyberSecurity = () => {
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
            text: "In an era of increasing digital threats, our cybersecurity expertise ensures businesses stay protected with advanced security frameworks and proactive defense mechanisms."
        },
        {
            id: 2,
            text: "We go beyond standard security protocols, implementing risk assessments, AI-driven monitoring, and compliance strategies to safeguard digital assets."
        },
        {
            id: 3,
            text: "From securing networks to preventing cyber threats, our solutions help businesses mitigate risks and maintain a robust security posture."
        }
    ]
};

// What We Do cards

const whatWeDoItems = [
    {
        id: 1,
        title: 'Threat Detection & Response',
        description: 'Leveraging AI-driven analytics, we detect and neutralize cyber threats in real-time, ensuring data security and business continuity.',
        icon: <ShieldAlert />,
        color: 'text-red-600'
    },
    {
        id: 2,
        title: 'Data Encryption & Privacy',
        description: 'We implement industry-leading encryption and privacy frameworks to protect sensitive data from breaches and unauthorized access.',
        icon: <Lock />,
        color: 'text-blue-600'
    },
    {
        id: 3,
        title: 'Network Security',
        description: 'Our multi-layered network security solutions protect enterprises from cyberattacks, ensuring secure and resilient infrastructure.',
        icon: <Wifi />,
        color: 'text-green-600'
    },
    {
        id: 4,
        title: 'Compliance & Governance',
        description: 'We help businesses stay compliant with industry regulations through robust security policies and governance frameworks.',
        icon: <Scale />,
        color: 'text-purple-600'
    }
];


// Challenges and Solutions
const challengesItems = [
    {
        id: 1,
        challenge: 'Evolving Cyber Threats',
        solution: 'We utilize AI-driven security analytics to proactively detect and counter emerging cyber threats before they cause harm.'
    },
    {
        id: 2,
        challenge: 'Data Breach Risks',
        solution: 'Our encryption and secure access management solutions protect critical data from unauthorized access and breaches.'
    },
    {
        id: 3,
        challenge: 'Insider Threats',
        solution: 'Implementing behavioral analytics and zero-trust security models, we reduce risks posed by internal security threats.'
    },
    {
        id: 4,
        challenge: 'Regulatory Compliance',
        solution: 'We provide tailored security frameworks that align with evolving cybersecurity regulations, ensuring compliance and security integrity.'
    },
    {
        id: 5,
        challenge: 'Phishing & Ransomware Attacks',
        solution: 'Our multi-layered security approach protects against phishing, ransomware, and malware threats for uninterrupted operations.'
    },
    {
        id: 6,
        challenge: 'Cloud Security Concerns',
        solution: 'By implementing secure cloud architectures and identity management, we ensure robust cloud security across all operations.'
    }
];

// Differentiators
const differentiatorItems = [
    {
        id: 1,
        title: 'AI-Driven Security',
        description: 'We use AI-powered security intelligence to detect, prevent, and neutralize threats before they disrupt operations.'
    },
    {
        id: 2,
        title: 'Proactive Risk Management',
        description: 'Our cybersecurity frameworks focus on proactive risk mitigation, ensuring vulnerabilities are addressed before exploitation.'
    },
    {
        id: 3,
        title: 'Custom Security Strategies',
        description: 'We design tailored security solutions that align with industry best practices and unique organizational needs.'
    },
    {
        id: 4,
        title: 'End-to-End Protection',
        description: 'From endpoint security to enterprise-level protection, we provide comprehensive cybersecurity solutions for every threat vector.'
    }
];

// Approaches content as object
const approachesContent = {
    title: 'Our Approaches',
    paragraphs: [
        {
            id: 1,
            text: "With years of expertise in cybersecurity, we focus on proactive defense strategies, ensuring enterprises remain secure from digital threats."
        },
        {
            id: 2,
            text: "Our security frameworks leverage AI and automation to identify vulnerabilities, mitigate risks, and strengthen digital infrastructures."
        },
        {
            id: 3,
            text: "Ensuring compliance with industry standards, we help businesses align security strategies with regulatory requirements for data protection."
        },
        {
            id: 4,
            text: "By integrating threat intelligence and real-time monitoring, we provide businesses with cutting-edge security solutions for a resilient future."
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
                                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    Cyber Security Solutions
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Protect your digital assets with our advanced cybersecurity solutions. We provide AI-driven threat detection, risk management, and proactive security strategies to safeguard businesses.
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
                                        src={assets.s2 || "/placeholder-ai-ml.jpg"}
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

export default CyberSecurity;
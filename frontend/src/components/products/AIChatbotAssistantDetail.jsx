import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLeft, MessageSquare, Globe, Zap, Server } from "lucide-react";
import { assets } from "../../assets/assets";

const AIChatbotAssistantDetail = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const product = {
        id: 4,
        name: "AI Chatbot Assistant",
        description: "An AI-powered chatbot for businesses.",
        image: assets.product4,
        features: [
            "Natural language understanding",
            "Multi-channel deployment",
            "Knowledge base integration",
            "Custom training capabilities",
            "Sentiment analysis",
            "Multilingual support",
        ],
        techSpecs: {
            deployment: "Cloud-based or on-premises",
            integration: "REST API, webhooks, direct website embedding",
            languages: "Support for 40+ languages",
            customization: "Visual flow builder, custom entity recognition",
        },
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <RouterLink
                        to="/#products"
                        className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        <span>Back to Products</span>
                    </RouterLink>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <div className="md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden border border-gray-800">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <div className="mb-2">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-700/30">
                                BUSINESS AUTOMATION
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        <p className="text-gray-400 mb-8">
                            Transform customer interactions with our enterprise-grade AI Chatbot Assistant.
                            Powered by advanced natural language processing, our solution handles customer
                            inquiries 24/7, learns from interactions, and seamlessly escalates to human
                            agents when needed.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-purple-900/20 text-purple-400 mr-3">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Conversational</h4>
                                    <p className="text-sm text-gray-400">Natural dialog flows</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-purple-900/20 text-purple-400 mr-3">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Multilingual</h4>
                                    <p className="text-sm text-gray-400">Global customer support</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-purple-900/20 text-purple-400 mr-3">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Fast Deployment</h4>
                                    <p className="text-sm text-gray-400">Live in days, not months</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-purple-900/20 text-purple-400 mr-3">
                                    <Server size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Knowledge Base</h4>
                                    <p className="text-sm text-gray-400">Integrates with your data</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                                View Demo
                            </button>
                            <button className="flex-1 px-8 py-3 rounded-lg border border-gray-700 hover:border-purple-500 text-gray-300 font-medium transition-colors">
                                Technical Details
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
                    <div className="rounded-xl border border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-900/50">
                            <h3 className="text-xl font-semibold">Platform Details</h3>
                        </div>
                        <div className="p-6">
                            <table className="w-full">
                                <tbody>
                                    {Object.entries(product.techSpecs).map(([key, value], index) => (
                                        <tr key={index} className="border-b border-gray-800 last:border-0">
                                            <td className="py-3 text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                            <td className="py-3 text-white">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-6">Common Use Cases</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Customer Support",
                                description: "Handle common support inquiries, reducing wait times and agent workload.",
                            },
                            {
                                title: "Sales Assistance",
                                description: "Guide customers through product selection and purchasing decisions.",
                            },
                            {
                                title: "Internal HR Support",
                                description: "Answer employee questions about policies, benefits, and company procedures.",
                            },
                        ].map((useCase, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
                            >
                                <h4 className="text-lg font-semibold mb-2">{useCase.title}</h4>
                                <p className="text-gray-400">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatbotAssistantDetail;
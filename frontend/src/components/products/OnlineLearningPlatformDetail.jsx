import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLeft, Users, BookOpen, Clock, Award } from "lucide-react";
import { assets } from "../../assets/assets";

const OnlineLearningPlatformDetail = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const product = {
        id: 1,
        name: "Online Learning Platform",
        description: "A complete LMS for students and teachers.",
        image: assets.product1,
        features: [
            "Interactive course builder",
            "Live streaming classes",
            "Advanced analytics dashboard",
            "AI-powered student engagement tracking",
            "Mobile-friendly interface",
            "Certification management",
        ],
        techSpecs: {
            hosting: "Cloud-based, on-premise options available",
            userCapacity: "Unlimited (tiered pricing based on active users)",
            storage: "Starting at 1TB, expandable",
            integration: "API access, LTI compatibility, SSO",
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
                {/* Rest of your component remains the same */}
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
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-700/30">
                                EDUCATION SOLUTION
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        <p className="text-gray-400 mb-8">
                            Transform your educational institution with our comprehensive Learning Management System.
                            Designed for both educators and students, this platform provides all the tools needed
                            for effective online learning, course management, and educational analytics.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400 mr-3">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Support Thousands</h4>
                                    <p className="text-sm text-gray-400">Unlimited student capacity</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400 mr-3">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Rich Content</h4>
                                    <p className="text-sm text-gray-400">Support all media types</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400 mr-3">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">24/7 Access</h4>
                                    <p className="text-sm text-gray-400">Learn anytime, anywhere</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400 mr-3">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Certification</h4>
                                    <p className="text-sm text-gray-400">Built-in credential system</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                                View Demo
                            </button>
                            <button className="flex-1 px-8 py-3 rounded-lg border border-gray-700 hover:border-blue-500 text-gray-300 font-medium transition-colors">
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
                                title: "Higher Education",
                                description: "Support large-scale university courses with advanced grading and assessment tools.",
                            },
                            {
                                title: "Corporate Training",
                                description: "Track employee progress through required certification and compliance training.",
                            },
                            {
                                title: "Continuing Education",
                                description: "Offer professional development courses with certification and badging.",
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

export default OnlineLearningPlatformDetail;
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLeft, Heart, Activity, Battery, Wifi } from "lucide-react";
import { assets } from "../../assets/assets";

const SmartHealthMonitorDetail = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const product = {
        id: 2,
        name: "Smart Health Monitor",
        description: "AI-based device to monitor health parameters.",
        image: assets.product2,
        features: [
            "24/7 heart rate monitoring",
            "Blood oxygen level tracking",
            "Sleep quality analysis",
            "Stress level detection",
            "AI-powered health insights",
            "Emergency alert system",
        ],
        techSpecs: {
            battery: "Up to 7 days on a single charge",
            connectivity: "Bluetooth 5.2, Wi-Fi 6",
            sensors: "Optical heart rate, SpO2, accelerometer, temperature",
            compatibility: "iOS 14+, Android 10+, Web dashboard",
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
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-900/40 text-red-300 border border-red-700/30">
                                HEALTHCARE SOLUTION
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        <p className="text-gray-400 mb-8">
                            Take control of your health with our advanced Smart Health Monitor. This cutting-edge wearable
                            device uses AI to track vital health metrics, provide personalized insights, and alert you to
                            potential health concerns before they become serious issues.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-red-900/20 text-red-400 mr-3">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Continuous Tracking</h4>
                                    <p className="text-sm text-gray-400">24/7 health monitoring</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-red-900/20 text-red-400 mr-3">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Health Insights</h4>
                                    <p className="text-sm text-gray-400">AI-powered analysis</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-red-900/20 text-red-400 mr-3">
                                    <Battery size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Long Battery</h4>
                                    <p className="text-sm text-gray-400">Week-long performance</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-red-900/20 text-red-400 mr-3">
                                    <Wifi size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Connected</h4>
                                    <p className="text-sm text-gray-400">Seamless sync to all devices</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30">
                                View Demo
                            </button>
                            <button className="flex-1 px-8 py-3 rounded-lg border border-gray-700 hover:border-red-500 text-gray-300 font-medium transition-colors">
                                Technical Details
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
                    <div className="rounded-xl border border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-900/50">
                            <h3 className="text-xl font-semibold">Device Details</h3>
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
                                title: "Personal Health",
                                description: "Monitor your daily vitals and get insights to improve your overall health and wellness.",
                            },
                            {
                                title: "Chronic Condition Management",
                                description: "Track important health parameters for conditions like diabetes, hypertension, or heart disease.",
                            },
                            {
                                title: "Remote Patient Monitoring",
                                description: "Healthcare providers can remotely monitor patient vitals for better continuous care.",
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

export default SmartHealthMonitorDetail;
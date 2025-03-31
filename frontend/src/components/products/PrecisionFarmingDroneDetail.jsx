import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLeft, Leaf, Camera, Battery, Cloud } from "lucide-react";
import { assets } from "../../assets/assets";

const PrecisionFarmingDroneDetail = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const product = {
        id: 3,
        name: "Precision Farming Drone",
        description: "Drones for monitoring crop health and yield.",
        image: assets.product3,
        features: [
            "Multispectral imaging system",
            "AI crop analysis algorithms",
            "Automated flight patterns",
            "Weather-resistant design",
            "Real-time data transmission",
            "Field mapping and 3D modeling",
        ],
        techSpecs: {
            flightTime: "Up to 45 minutes per charge",
            range: "5 kilometers operational range",
            camera: "20MP RGB + 5-band multispectral sensors",
            software: "Cloud-based analytics platform with mobile app",
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
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/40 text-green-300 border border-green-700/30">
                                AGRICULTURAL TECHNOLOGY
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        <p className="text-gray-400 mb-8">
                            Revolutionize your agricultural operations with our Precision Farming Drone.
                            Using advanced multispectral imaging and AI analytics, this drone helps farmers
                            identify crop health issues, optimize irrigation, and maximize yields while
                            reducing resource usage.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-green-900/20 text-green-400 mr-3">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Crop Health</h4>
                                    <p className="text-sm text-gray-400">Early issue detection</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-green-900/20 text-green-400 mr-3">
                                    <Camera size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Multispectral</h4>
                                    <p className="text-sm text-gray-400">Beyond visible spectrum</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-green-900/20 text-green-400 mr-3">
                                    <Battery size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Extended Flight</h4>
                                    <p className="text-sm text-gray-400">Cover large areas easily</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-green-900/20 text-green-400 mr-3">
                                    <Cloud size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Cloud Analysis</h4>
                                    <p className="text-sm text-gray-400">Instant insights delivery</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30">
                                View Demo
                            </button>
                            <button className="flex-1 px-8 py-3 rounded-lg border border-gray-700 hover:border-green-500 text-gray-300 font-medium transition-colors">
                                Technical Details
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
                    <div className="rounded-xl border border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-900/50">
                            <h3 className="text-xl font-semibold">Drone Details</h3>
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
                                title: "Crop Monitoring",
                                description: "Regular assessment of crop health, early disease detection, and growth tracking.",
                            },
                            {
                                title: "Resource Optimization",
                                description: "Identify areas needing irrigation, fertilization, or pest control for targeted intervention.",
                            },
                            {
                                title: "Yield Estimation",
                                description: "Pre-harvest analysis to predict yields and optimize harvesting schedules.",
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

export default PrecisionFarmingDroneDetail;
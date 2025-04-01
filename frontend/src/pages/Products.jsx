import React, { useState, useEffect } from "react";
import { ChevronRight, Activity, Star, ArrowUpRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

// Sample product data
export const productsData = [
    { id: 1, name: "Online Learning Platform", description: "A complete LMS for students and teachers.", image: assets.product1, url: "/products/online-learning-platform" },
    { id: 2, name: "Smart Health Monitor", description: "AI-based device to monitor health parameters.", image: assets.product2, url: "/products/smart-health-monitor" },
    { id: 3, name: "Precision Farming Drone", description: "Drones for monitoring crop health and yield.", image: assets.product3, url: "/products/precision-farming-drone" },
    { id: 4, name: "AI Chatbot Assistant", description: "An AI-powered chatbot for businesses.", image: assets.product4, url: "/products/ai-chatbot-assistant" },
    { id: 5, name: "Cloud Security Suite", description: "Protect your cloud infrastructure with advanced security.", image: assets.product5, url: "/products/cloud-security-suite" },
    { id: 6, name: "Cyber Threat Analyzer", description: "Detect and analyze cyber threats in real time.", image: assets.product6, url: "/products/cyber-threat-analyzer" },
    { id: 7, name: "Robotics Research Kit", description: "An advanced robotics kit for research and development.", image: assets.product7, url: "/products/robotics-research-kit" },
];

const Products = () => {

    const [selectedProduct, setSelectedProduct] = useState(1);
    const navigate = useNavigate();


    // Get the selected product data
    const selectedProductData = productsData.find(p => p.id === selectedProduct);

    // Function for demo links since we don't have Router in this artifact
    const handleLinkClick = (e,url) => {
        e.preventDefault();
        navigate(url);  // Navigate to the respective product page
        // window.location.href = selectedProductData.url; // Navigate to the respective product page by refreshing the page

    };

    return (
        <div id="products" className="bg-zinc-950 p-4 md:p-8 min-h-screen">
            <div className="max-w-6xl py-12 mx-auto">
                <h1 className="text-white text-4xl font-bold mb-12">PRODUCTS</h1>

                {/* Product showcase with split view */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left sidebar with product list */}
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900/60 p-4 md:p-6 rounded-2xl border border-zinc-800">
                            <div className="mb-4">
                                <h2 className="text-zinc-400 text-sm uppercase font-medium">Product Catalog</h2>
                            </div>

                            <ul className="space-y-3">
                                {productsData.map((product) => (
                                    <li key={product.id}>
                                        <button
                                            onClick={() => setSelectedProduct(product.id)}
                                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center group ${selectedProduct === product.id
                                                ? 'bg-gradient-to-r from-cyan-900/50 to-indigo-900/30 border border-cyan-800/50'
                                                : 'hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <span className={`text-xs font-mono mr-2 ${selectedProduct === product.id ? 'text-cyan-400' : 'text-zinc-600'
                                                        }`}>
                                                        {String(product.id).padStart(2, '0')}
                                                    </span>
                                                    <h3 className={`font-medium ${selectedProduct === product.id ? 'text-white' : 'text-zinc-400'
                                                        }`}>
                                                        {product.name}
                                                    </h3>
                                                </div>
                                                <p className={`text-xs mt-1 ${selectedProduct === product.id ? 'text-zinc-300' : 'text-zinc-500'
                                                    }`}>
                                                    {product.description}
                                                </p>
                                            </div>

                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedProduct === product.id
                                                ? 'bg-cyan-400 text-zinc-900'
                                                : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'
                                                }`}>
                                                <ChevronRight size={16} />
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="lg:col-span-3">
                        {selectedProductData && (
                            <div className="relative">
                                {/* Main product display */}
                                <div className="relative overflow-hidden rounded-2xl border border-zinc-800 group">
                                    {/* Featured tag */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="flex items-center gap-2 bg-zinc-900/80 py-1 px-3 rounded-full border border-zinc-800">
                                            <Activity size={12} className="text-cyan-400" />
                                            <span className="text-xs font-medium text-cyan-400">FEATURED</span>
                                        </div>
                                    </div>

                                    {/* Image with overlay */}
                                    <div className="h-64 relative">
                                        <img
                                            src={selectedProductData.image}
                                            alt={selectedProductData.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/70 to-transparent"></div>
                                    </div>

                                    {/* Content overlay */}
                                    <div className="p-6">
                                        {/* Product details */}
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-bold mb-2 text-white">
                                                {selectedProductData.name}
                                            </h2>

                                            <p className="text-zinc-400 mb-4">
                                                {selectedProductData.description} Designed for advanced users and organizations
                                                looking to stay ahead of the curve with cutting-edge technology solutions.
                                            </p>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="mb-6">
                                            <button
                                                onClick={(e) => handleLinkClick(e,selectedProductData.url)}

                                                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full flex items-center gap-2"
                                            >
                                                <span>Explore Product</span>
                                                <ArrowUpRight size={16} />
                                            </button>

                                            {/* <button
                                                onClick={handleLinkClick}
                                                className="px-4 py-2 border border-zinc-700 text-zinc-300 font-medium rounded-full"
                                            >
                                                View Demo
                                            </button> */}
                                        </div>

                                        {/* Technical specs preview */}
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <p className="text-xs text-zinc-500 mb-1">COMPATIBILITY</p>
                                                <p className="text-sm text-zinc-300">Cross-platform</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500 mb-1">RELEASE</p>
                                                <p className="text-sm text-zinc-300">March 2025</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500 mb-1">LICENSE</p>
                                                <p className="text-sm text-zinc-300">Enterprise</p>
                                            </div>
                                        </div>

                                        {/* Technical features tags */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <div className="px-3 py-1 rounded-full bg-zinc-900/80 text-xs text-zinc-400 border border-zinc-800">
                                                Cloud-based
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-zinc-900/80 text-xs text-zinc-400 border border-zinc-800">
                                                AI-powered
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-zinc-900/80 text-xs text-zinc-400 border border-zinc-800">
                                                24/7 Support
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
import React from 'react';
import { Link } from 'react-router-dom';

const CyberSec = () => {
    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center py-16">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-gray-800 opacity-90 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
                {/* Back Button */}
                <Link to="/" className="inline-block mb-8 text-silver-400 hover:text-amber-200 transition-colors duration-300">
                    ← Back to Home
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6">
                    Cybersecurity Solutions
                </h1>

                {/* Intro */}
                <p className="text-lg md:text-xl text-silver-300 mb-10 font-light">
                    We protect your business from digital threats with smart, modern solutions.
                </p>

                {/* Key Points */}
                <ul className="space-y-6 mb-12">
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Stop hackers with advanced firewalls and encryption.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Keep your data safe with real-time monitoring.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Stay ahead of risks with expert threat analysis.</p>
                    </li>
                </ul>

                {/* Call to Action */}
                <button className="px-8 py-4 bg-gradient-to-r from-purple-900 to-gray-800 text-amber-100 font-medium rounded-md transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105">
                    Get Protected Today
                </button>
            </div>
        </section>
    );
};

export default CyberSec;
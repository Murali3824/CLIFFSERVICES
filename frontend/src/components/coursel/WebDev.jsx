// WebDev.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WebDev = () => {
    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center py-16">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-silver-900 opacity-90 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
                {/* Back Button */}
                <Link to="/" className="inline-block mb-8 text-silver-400 hover:text-amber-200 transition-colors duration-300">
                    ← Back to Home
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6">
                    Web Development
                </h1>

                {/* Intro */}
                <p className="text-lg md:text-xl text-silver-300 mb-10 font-light">
                    We build websites that are fast, secure, and easy to use.
                </p>

                {/* Key Points */}
                <ul className="space-y-6 mb-12">
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Create stunning designs that grab attention.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Ensure your site works perfectly on any device.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Scale up easily as your business grows.</p>
                    </li>
                </ul>

                {/* Call to Action */}
                <button className="px-8 py-4 bg-gradient-to-r from-gray-800 to-silver-900 text-amber-100 font-medium rounded-md transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105">
                    Launch Your Site
                </button>
            </div>
        </section>
    );
};

export default WebDev;
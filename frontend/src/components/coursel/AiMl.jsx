// AiMl.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AiMl = () => {
    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center py-16">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-gray-900 opacity-90 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
                {/* Back Button */}
                <Link to="/" className="inline-block mb-8 text-silver-400 hover:text-amber-200 transition-colors duration-300">
                    ← Back to Home
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6">
                    AI & Machine Learning
                </h1>

                {/* Intro */}
                <p className="text-lg md:text-xl text-silver-300 mb-10 font-light">
                    We use AI to make your business smarter, faster, and more efficient.
                </p>

                {/* Key Points */}
                <ul className="space-y-6 mb-12">
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Automate tasks with intelligent systems.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Predict trends with powerful data analysis.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <p className="text-silver-200">Boost productivity with custom AI tools.</p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default AiMl;
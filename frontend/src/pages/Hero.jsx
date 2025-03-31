import { Sparkles } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="products" className="min-h-screen bg-black text-white py-20 px-6 overflow-hidden relative">
      {/* Content Container */}
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}


        {/* Featured Product Banner */}
        <div className="mt-24 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(to right, #666 1px, transparent 1px), linear-gradient(to bottom, #666 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                <Sparkles size={14} className="mr-2" />
                <span>Premium Offering</span>
              </div>

              <h3 className="text-4xl font-bold mb-4">
                Next-Gen AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Innovation Hub
                </span>
              </h3>

              <p className="text-gray-400 mb-8 max-w-lg">
                Unlock the potential of artificial intelligence with our comprehensive development environment designed for researchers and enterprises.
              </p>

              <Link to="/products/ai-innovation-hub" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group">
                <span className="relative z-10">Discover More</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <Link to="/products/ai-innovation-hub" className="block relative w-64 h-64">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border-2 border-pink-500/40 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute inset-8 rounded-full border border-purple-500/50 animate-pulse" style={{ animationDelay: "1s" }}></div>

                {/* Center circle */}
                <div className="absolute inset-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <div className="text-4xl font-bold">AI+</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
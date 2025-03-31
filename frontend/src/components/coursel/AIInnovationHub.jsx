import React from 'react';

const AIInnovationHub = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden relative">

            {/* Impactful Background */}
            <div className="absolute inset-0 mt-20 pointer-events-none overflow-hidden">
                {/* Dynamic Gradient Waves */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/20 via-[#059669]/20 to-[#f59e0b]/20 animate-[wave_15s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-[#10b981]/10 via-[#f59e0b]/10 to-[#059669]/10 animate-[wave_20s_ease-in-out_infinite_-5s]"></div>
                {/* Orbit System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]">
                    <div className="relative w-full h-full animate-[spin_30s_linear_infinite]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-[#10b981] via-[#059669] to-[#f59e0b] rounded-full animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_50px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute w-8 h-8 bg-[#10b981] rounded-full opacity-70 top-[10%] left-[20%] animate-[orbit1_14s_infinite] shadow-[0_0_20px_#10b981]"></div>
                        <div className="absolute w-6 h-6 bg-[#059669] rounded-full opacity-70 top-[40%] right-[15%] animate-[orbit2_16s_infinite] shadow-[0_0_20px_#059669]"></div>
                        <div className="absolute w-7 h-7 bg-[#f59e0b] rounded-full opacity-70 bottom-[20%] left-[25%] animate-[orbit3_18s_infinite] shadow-[0_0_20px_#f59e0b]"></div>
                        <div className="absolute w-[700px] h-[700px] border-2 border-[#10b981]/40 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[float_6s_ease-in-out_infinite]"></div>
                    </div>
                </div>
                {/* Floating Particles */}
                <div className="absolute w-4 h-4 bg-[#10b981]/60 rounded-full top-[20%] left-[30%] animate-[floatParticle_5s_infinite]"></div>
                <div className="absolute w-3 h-3 bg-[#f59e0b]/60 rounded-full bottom-[15%] right-[25%] animate-[floatParticle_4s_infinite_0.5s]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pb-20 max-w-7xl mx-auto text-center text-gray-900">

                <div className="top-0 pt-40 pb-20 left-0 w-full h-1/3 bg-gradient-to-r from-[#10b981] via-[#059669] to-[#f59e0b] overflow-hidden">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-black uppercase animate-[glitch_2s_linear_infinite] tracking-tight">
                        Next-Gen AI Innovation
                    </h1>
                </div>

                <p className="mt-10 text-xl md:text-2xl max-w-3xl mx-auto text-gray-800 bg-white/80 p-6 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] backdrop-blur-sm">
                    Pioneering the AI revolution with a cutting-edge ecosystem integrating quantum computing,
                    exascale processing, and evolutionary algorithms for researchers and enterprises worldwide.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 px-6">
                    <div className="bg-white/90 p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 border-2 border-[#10b981]/50 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[slideGlow_3s_infinite]"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#10b981] mb-4">Quantum AI Labs</h3>
                            <p className="text-gray-700 mb-4">Breakthrough quantum-classical hybrid computing with industry-leading coherence</p>
                            <ul className="text-sm text-gray-600 list-none space-y-2">
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#10b981] rounded-full mr-2"></span>150+ qubits at 99.95% fidelity</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#10b981] rounded-full mr-2"></span>Quantum ML acceleration</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#10b981] rounded-full mr-2"></span>5x faster optimization</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white/90 p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 border-2 border-[#059669]/50 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#059669]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[slideGlow_3s_infinite_0.5s]"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#059669] mb-4">Enterprise AI Core</h3>
                            <p className="text-gray-700 mb-4">Unmatched scale and reliability for enterprise-grade AI solutions</p>
                            <ul className="text-sm text-gray-600 list-none space-y-2">
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#059669] rounded-full mr-2"></span>2T+ parameter models</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#059669] rounded-full mr-2"></span>99.999% uptime SLA</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#059669] rounded-full mr-2"></span>Global edge deployment</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white/90 p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 border-2 border-[#f59e0b]/50 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[slideGlow_3s_infinite_1s]"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#f59e0b] mb-4">Neural Evolution Studio</h3>
                            <p className="text-gray-700 mb-4">Next-level AI model development with evolutionary optimization</p>
                            <ul className="text-sm text-gray-600 list-none space-y-2">
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#f59e0b] rounded-full mr-2"></span>15x convergence speed</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#f59e0b] rounded-full mr-2"></span>Adaptive genetic AI</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-[#f59e0b] rounded-full mr-2"></span>Auto-scaling inference</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 mx-10 bg-white/95 p-8 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-sm">
                    <h2 className="text-3xl font-bold text-[#059669] mb-6">AI Hub Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-[#10b981]/30 rounded-full flex items-center justify-center animate-[bounce_2s_infinite]">
                                <span className="text-[#10b981] text-xl font-bold">∞</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800">Infinite Scalability</h4>
                                <p className="text-gray-600">Cloud-native architecture with auto-scaling up to 10,000+ nodes</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-[#f59e0b]/30 rounded-full flex items-center justify-center animate-[bounce_2s_infinite_0.3s]">
                                <span className="text-[#f59e0b] text-xl font-bold">⚡</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800">Lightning-Fast Processing</h4>
                                <p className="text-gray-600">50 PFLOPS peak performance with GPU/TPU acceleration</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 relative">
                    <button className="relative px-12 py-6 text-xl bg-gradient-to-r from-[#10b981] to-[#f59e0b] text-white rounded-full hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(16,185,129,0.6)] transition-all duration-300 overflow-hidden group">
                        <span className="relative z-10 font-semibold">Ignite Your AI Future</span>
                        <div className="absolute inset-0 bg-white/50 animate-[btnPulse_2s_infinite] group-hover:scale-[2] transition-transform"></div>
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#10b981]/40 rounded-full animate-[ripple_4s_infinite]"></div>
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#f59e0b]/40 rounded-full animate-[ripple_4s_infinite_0.7s]"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIInnovationHub;
import React from 'react';
import { assets } from "../assets/assets";

const TrustedBy = () => {
    // Define three sets of 7 companies using all 21 t images
    const row1Companies = [
        { name: "Company 1", logo: assets.t1 },
        { name: "Company 2", logo: assets.t2 },
        { name: "Company 3", logo: assets.t3 },
        { name: "Company 4", logo: assets.t4 },
        { name: "Company 5", logo: assets.t5 },
        { name: "Company 6", logo: assets.t6 },
        { name: "Company 7", logo: assets.t7 },
    ];

    const row2Companies = [
        { name: "Company 8", logo: assets.t8 },
        { name: "Company 9", logo: assets.t9 },
        { name: "Company 10", logo: assets.t10 },
        { name: "Company 11", logo: assets.t11 },
        { name: "Company 12", logo: assets.t12 },
        { name: "Company 13", logo: assets.t13 },
        { name: "Company 14", logo: assets.t14 },
    ];

    const row3Companies = [
        { name: "Company 15", logo: assets.t15 },
        { name: "Company 16", logo: assets.t16 },
        { name: "Company 17", logo: assets.t17 },
        { name: "Company 18", logo: assets.t18 },
        { name: "Company 19", logo: assets.t19 },
        { name: "Company 20", logo: assets.t20 },
        { name: "Company 21", logo: assets.t21 },
        { name: "Company 22", logo: assets.t22 },
    ];

    // Duplicate each row multiple times for seamless looping
    const scrollRow1 = [...row1Companies, ...row1Companies, ...row1Companies];
    const scrollRow2 = [...row2Companies, ...row2Companies, ...row2Companies];
    const scrollRow3 = [...row3Companies, ...row3Companies, ...row3Companies];

    return (
        <div className="py-24 pb-32 px-4 bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Trusted By</h2>
            <div className="relative max-w-6xl mx-auto space-y-12">
                {/* Row 1: Scrolls Right */}
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll-right whitespace-nowrap">
                        {scrollRow1.map((company, index) => (
                            <div
                                key={`row1-${index}`}
                                className="flex-shrink-0 mx-8"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    className="h-16 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Blur effect at ends */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                </div>

                {/* Row 2: Scrolls Left */}
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll-left whitespace-nowrap">
                        {scrollRow2.map((company, index) => (
                            <div
                                key={`row2-${index}`}
                                className="flex-shrink-0 mx-8"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    className="h-16 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Blur effect at ends */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                </div>

                {/* Row 3: Scrolls Right */}
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll-right whitespace-nowrap">
                        {scrollRow3.map((company, index) => (
                            <div
                                key={`row3-${index}`}
                                className="flex-shrink-0 mx-8"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    className="h-16 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Blur effect at ends */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes scroll-right {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); } /* Move 1/3 of the total width */
                }
                @keyframes scroll-left {
                    0% { transform: translateX(-33.33%); } /* Start at 1/3 shifted left */
                    100% { transform: translateX(0); }
                }
                .animate-scroll-right {
                    animation: scroll-right 10s linear infinite;
                }
                .animate-scroll-left {
                    animation: scroll-left 10s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default TrustedBy;
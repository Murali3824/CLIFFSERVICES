import React, { useState } from 'react';

const CookieStatement = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const cookieCategories = [
        {
            id: 'essential',
            name: 'Essential Cookies',
            description: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
            examples: ['Session ID', 'Security tokens', 'Server load balancing']
        },
        {
            id: 'functional',
            name: 'Functional Cookies',
            description: 'These cookies enable the website to provide enhanced functionality and personalization.',
            examples: ['Language preferences', 'Font size preferences', 'Form completion assistance']
        },
        {
            id: 'analytics',
            name: 'Analytics Cookies',
            description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
            examples: ['Visitor statistics', 'Page load times', 'Videos watched']
        },
        {
            id: 'marketing',
            name: 'Marketing Cookies',
            description: 'These cookies may be set through our site by our advertising partners to build a profile of your interests.',
            examples: ['Ad click tracking', 'Conversion tracking', 'Retargeting cookies']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br py-32 from-blue-50 to-purple-50">
            <div className="max-w-5xl mx-auto px-4 ">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Cookie Statement</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We believe in transparency about how we collect and use data. This statement explains how we use cookies and similar technologies on our website.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeTab === 'overview'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeTab === 'details'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Cookie Details
                        </button>
                        <button
                            onClick={() => setActiveTab('management')}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeTab === 'management'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Managing Cookies
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">What are cookies?</h2>
                            <p className="text-gray-600">
                                Cookies are small text files that are placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies and similar technologies for storing and honoring your preferences and settings, enabling you to sign in, providing interest-based advertising, combating fraud, analyzing how our products perform, and fulfilling other legitimate purposes.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <h3 className="text-lg font-medium text-blue-700 mb-2">Our Cookie Philosophy</h3>
                                <p className="text-blue-600">
                                    We strive to be transparent about our data collection practices, provide you with meaningful privacy choices, and protect your personal data.
                                </p>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-2">How we use cookies</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="font-medium text-gray-800">Site Functionality</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        To enable basic functions like page navigation, secure areas, and shopping carts.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-medium text-gray-800">Analytics</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        To understand how visitors interact with our website and improve user experience.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="font-medium text-gray-800">Personalization</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        To remember your preferences and customize your experience.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="font-medium text-gray-800">Advertising</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        To deliver relevant advertisements and measure their effectiveness.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Cookie Categories</h2>

                            <div className="space-y-6">
                                {cookieCategories.map((category) => (
                                    <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                            <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-gray-600 mb-4">{category.description}</p>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {category.examples.map((example, index) => (
                                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {example}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'management' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Manage Your Cookies</h2>

                            <p className="text-gray-600 mb-6">
                                You have the right to decide whether to accept or reject cookies. You can set or amend your cookie preferences in the following ways:
                            </p>

                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                    <h3 className="text-lg font-medium text-blue-800 mb-2">Browser Settings</h3>
                                    <p className="text-gray-700">
                                        Most web browsers allow you to control cookies through their settings preferences. For more information about how to do this, visit your browser's help page.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                                    <h3 className="text-lg font-medium text-purple-800 mb-2">Our Cookie Banner</h3>
                                    <p className="text-gray-700">
                                        You can set or amend your cookie preferences at any time by using our cookie consent banner.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-100">
                                    <h3 className="text-lg font-medium text-yellow-800 mb-2">Third-Party Tools</h3>
                                    <p className="text-gray-700">
                                        You can opt out of third-party advertising networks using tools provided by organizations like the Digital Advertising Alliance, Network Advertising Initiative, and European Interactive Digital Advertising Alliance.
                                    </p>
                                </div>
                            </div>

                            {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800 mb-3">Cookie Preferences</h3>
                                <p className="text-gray-600 mb-4">
                                    You can update your cookie preferences at any time:
                                </p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                                    Manage Cookie Preferences
                                </button>
                            </div> */}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm">
                    <p>Last updated: March 23, 2025</p>
                    <p className="mt-2">If you have any questions about our use of cookies, please contact us at privacy@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default CookieStatement;
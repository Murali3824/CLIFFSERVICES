import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Shield, FileText, Check, AlertTriangle, Info, Lock, Eye, Users, Globe, Server, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TermsAndPrivacy = () => {

    const location = useLocation();

    // Determine initial tab based on URL path or query param
    const getInitialTab = () => {
        const path = location.pathname;
        if (path.includes('privacy')) return 'privacy';
        return 'terms'; // Default to terms if no specific path matches
    };

    const [activeTab, setActiveTab] = useState('terms');
    const [expandedSections, setExpandedSections] = useState({
        terms: ['overview', 'intellectual-property'],
        privacy: ['data-collection']
    });

    // Update activeTab when location changes
    useEffect(() => {
        setActiveTab(getInitialTab());
    }, [location]);

    const toggleSection = (tab, sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [tab]: prev[tab].includes(sectionId)
                ? prev[tab].filter(id => id !== sectionId)
                : [...prev[tab], sectionId]
        }));
    };

    const isExpanded = (tab, sectionId) => {
        return expandedSections[tab]?.includes(sectionId);
    };

    const lastUpdated = 'March 15, 2025';

    return (
        <div className="min-h-screen bg-slate-50 py-28 px-4">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full shadow-sm border border-slate-100 mb-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-3 rounded-full">
                            {activeTab === 'terms' ? <FileText size={24} /> : <Shield size={24} />}
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        {activeTab === 'terms'
                            ? 'Please read these terms carefully before using our services. By accessing or using Cliff Services, you agree to be bound by these terms.'
                            : 'This Privacy Policy describes how we collect, use, and share your personal information when you use our services.'}
                    </p>
                    <div className="mt-8 bg-white rounded-full p-1 inline-flex shadow-sm border border-slate-200">
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'terms'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            Terms of Service
                        </button>
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'privacy'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            Privacy Policy
                        </button>
                    </div>
                </div>

                {/* Last Updated Banner */}
                <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-slate-200 flex items-center">
                    <Clock size={20} className="text-indigo-600 mr-3" />
                    <div>
                        <p className="text-slate-700">
                            <span className="font-medium">Last Updated:</span> {lastUpdated}
                        </p>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                    {/* Terms of Service Content */}
                    {activeTab === 'terms' && (
                        <div className="divide-y divide-slate-200">
                            {/* Overview Section */}
                            <div className="border-l-4 border-indigo-600">
                                <button
                                    onClick={() => toggleSection('terms', 'overview')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Info size={20} className="text-indigo-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
                                    </div>
                                    {isExpanded('terms', 'overview') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('terms', 'overview') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            Welcome to Cliff Services. By accessing our website, using our services, or engaging with our content, you agree to these Terms of Service ("Terms"). These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Cliff Services ("Company," "we," "us," or "our").
                                        </p>
                                        <p>
                                            We may modify these Terms at any time by posting the updated version on our website. Your continued use of our services after changes constitutes acceptance of those changes. It is your responsibility to review these Terms periodically.
                                        </p>
                                        <div className="bg-blue-50 p-4 rounded-lg mt-4">
                                            <h4 className="font-medium text-indigo-800 mb-2">Key Points:</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <Check size={18} className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                                                    <span>These Terms govern your use of all Cliff Services offerings</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <Check size={18} className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                                                    <span>We may update these Terms at any time with notice on our website</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <Check size={18} className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                                                    <span>Your continued use implies acceptance of current Terms</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Eligibility Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('terms', 'eligibility')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Users size={20} className="text-indigo-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Eligibility & Account</h3>
                                    </div>
                                    {isExpanded('terms', 'eligibility') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('terms', 'eligibility') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            To use our services, you must be at least 18 years old or have obtained parental consent. By using our services, you represent and warrant that you meet these eligibility requirements.
                                        </p>
                                        <p>
                                            When creating an account, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                                        </p>
                                        <div className="bg-amber-50 p-4 rounded-lg mt-4">
                                            <h4 className="flex items-center font-medium text-amber-800 mb-2">
                                                <AlertTriangle size={18} className="mr-2" />
                                                Account Security Notice
                                            </h4>
                                            <p className="text-amber-700">
                                                You are solely responsible for maintaining the security of your account credentials. We recommend using strong passwords and enabling two-factor authentication where available.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Intellectual Property Section */}
                            <div className="border-l-4 border-indigo-600">
                                <button
                                    onClick={() => toggleSection('terms', 'intellectual-property')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <FileText size={20} className="text-indigo-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Intellectual Property</h3>
                                    </div>
                                    {isExpanded('terms', 'intellectual-property') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('terms', 'intellectual-property') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            All content on our website and services, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Cliff Services or its content suppliers and is protected by international copyright laws.
                                        </p>
                                        <p>
                                            The compilation of all content on our website is the exclusive property of Cliff Services and is protected by international copyright laws. All software used on our website is the property of Cliff Services or its software suppliers and is protected by international copyright laws.
                                        </p>
                                        <p>
                                            Our name, logo, and all related product and service names, design marks, and slogans are trademarks of Cliff Services or its affiliates. You may not use these marks without our prior written permission.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* User Conduct Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('terms', 'user-conduct')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Users size={20} className="text-indigo-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">User Conduct</h3>
                                    </div>
                                    {isExpanded('terms', 'user-conduct') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('terms', 'user-conduct') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            You agree not to use our services to:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Violate any applicable laws or regulations</li>
                                            <li>Infringe upon the rights of others</li>
                                            <li>Post or transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                                            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                                            <li>Interfere with or disrupt our services or servers</li>
                                            <li>Engage in any activity that could damage, disable, or impair our services</li>
                                        </ul>
                                        <p>
                                            We reserve the right to terminate your access to our services for violation of these Terms.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Limitation of Liability Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('terms', 'liability')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Shield size={20} className="text-indigo-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Limitation of Liability</h3>
                                    </div>
                                    {isExpanded('terms', 'liability') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('terms', 'liability') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            To the maximum extent permitted by applicable law, Cliff Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Your use or inability to use our services</li>
                                            <li>Any unauthorized access to or use of our servers or data</li>
                                            <li>Any interruption or cessation of transmission to or from our services</li>
                                            <li>Any bugs, viruses, or other harmful code that may be transmitted through our services</li>
                                        </ul>
                                        <p>
                                            Our liability is limited to the maximum extent permitted by law, and in no event shall our total liability exceed the amount paid by you, if any, for accessing our services.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Privacy Policy Content */}
                    {activeTab === 'privacy' && (
                        <div className="divide-y divide-slate-200">
                            {/* Data Collection Section */}
                            <div className="border-l-4 border-purple-600">
                                <button
                                    onClick={() => toggleSection('privacy', 'data-collection')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Server size={20} className="text-purple-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Data Collection</h3>
                                    </div>
                                    {isExpanded('privacy', 'data-collection') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('privacy', 'data-collection') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            We collect information to provide, improve, and protect our services. The types of information we collect include:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                                <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                                                    <Users size={18} className="text-purple-600 mr-2" />
                                                    Personal Information
                                                </h4>
                                                <ul className="space-y-2 text-slate-700">
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Name, email address, and contact details</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Account login credentials</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Billing information when applicable</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                                <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                                                    <Globe size={18} className="text-purple-600 mr-2" />
                                                    Usage Information
                                                </h4>
                                                <ul className="space-y-2 text-slate-700">
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>IP address and device information</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Browser type and settings</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>How you use our services</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="mt-4">
                                            We collect information through direct interactions, automated technologies, and sometimes from third parties. We are committed to collecting only the information necessary to provide our services.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* How We Use Your Information Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('privacy', 'data-use')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Eye size={20} className="text-purple-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">How We Use Your Information</h3>
                                    </div>
                                    {isExpanded('privacy', 'data-use') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('privacy', 'data-use') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            We use your information for various purposes, including but not limited to:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Providing and maintaining our services</li>
                                            <li>Processing transactions and sending related information</li>
                                            <li>Responding to your comments, questions, and requests</li>
                                            <li>Sending you technical notices, updates, security alerts, and support messages</li>
                                            <li>Improving our services and developing new products and features</li>
                                            <li>Personalizing content and experiences</li>
                                            <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
                                        </ul>
                                        <div className="bg-purple-50 p-4 rounded-lg mt-4">
                                            <h4 className="font-medium text-purple-800 mb-2">Our Commitment:</h4>
                                            <p className="text-purple-700">
                                                We are committed to using your data responsibly and only for purposes that benefit you or are necessary for the operation of our services.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Information Sharing Section */}
                            <div className="border-l-4 border-purple-600">
                                <button
                                    onClick={() => toggleSection('privacy', 'sharing')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Users size={20} className="text-purple-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Information Sharing</h3>
                                    </div>
                                    {isExpanded('privacy', 'sharing') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('privacy', 'sharing') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            We do not sell your personal information. We may share your information in the following situations:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><span className="font-medium">With Service Providers:</span> We share information with trusted third parties who provide services on our behalf, such as hosting, data analysis, payment processing, and customer service.</li>
                                            <li><span className="font-medium">For Legal Reasons:</span> We may disclose information if we believe it's necessary to comply with applicable laws, regulations, legal processes, or governmental requests.</li>
                                            <li><span className="font-medium">Business Transfers:</span> If we're involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                                            <li><span className="font-medium">With Your Consent:</span> We may share information for other purposes with your consent or at your direction.</li>
                                        </ul>
                                        <p>
                                            When we share information with third parties, we require them to respect the security of your personal information and treat it in accordance with applicable laws.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Security Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('privacy', 'security')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Lock size={20} className="text-purple-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Data Security</h3>
                                    </div>
                                    {isExpanded('privacy', 'security') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('privacy', 'security') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                                <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                                                    <Lock size={18} className="text-purple-600 mr-2" />
                                                    Technical Safeguards
                                                </h4>
                                                <ul className="space-y-2 text-slate-700">
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Encryption of sensitive information</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Secure networks and firewalls</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Regular security assessments</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                                <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                                                    <Shield size={18} className="text-purple-600 mr-2" />
                                                    Organizational Practices
                                                </h4>
                                                <ul className="space-y-2 text-slate-700">
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Employee training on data protection</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Access controls and authentication</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check size={16} className="text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                                                        <span>Incident response procedures</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="mt-4">
                                            While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to implementing reasonable security measures.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Your Rights Section */}
                            <div className="border-l-4 border-purple-600">
                                <button
                                    onClick={() => toggleSection('privacy', 'your-rights')}
                                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <Users size={20} className="text-purple-600 mr-3" />
                                        <h3 className="text-lg font-semibold text-slate-900">Your Rights</h3>
                                    </div>
                                    {isExpanded('privacy', 'your-rights') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>

                                {isExpanded('privacy', 'your-rights') && (
                                    <div className="p-6 pt-0 pl-16 text-slate-700 space-y-4">
                                        <p>
                                            Depending on your location, you may have certain rights regarding your personal information. These may include:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><span className="font-medium">Access:</span> You can request a copy of the personal information we hold about you.</li>
                                            <li><span className="font-medium">Correction:</span> You can request that we correct inaccurate or incomplete information.</li>
                                            <li><span className="font-medium">Deletion:</span> You can request that we delete your personal information in certain circumstances.</li>
                                            <li><span className="font-medium">Restriction:</span> You can request that we restrict the processing of your information in certain circumstances.</li>
                                            <li><span className="font-medium">Data Portability:</span> You can request to receive your personal information in a structured, commonly used, and machine-readable format.</li>
                                            <li><span className="font-medium">Objection:</span> You can object to our processing of your personal information in certain circumstances.</li>
                                        </ul>
                                        <p>
                                            To exercise any of these rights, please contact us using the contact information provided in this Privacy Policy. We will respond to your request within the timeframe required by applicable law.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">
                        If you have any questions about our {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}, please contact us.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/#contact" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndPrivacy;
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, MapPin, Mail, Phone, ArrowRight, ExternalLink, Facebook } from 'lucide-react';
import { assets } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-950 text-slate-200 py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-600 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-600 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Top Section - Logo & Newsletter */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between mb-20">
                    {/* Logo & Tagline */}
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-3 mb-6">
                            <Link
                                to="/#home"
                                className="flex items-center gap-0.5 sm:gap-1 cursor-pointer"
                                onClick={() => handleNavClick('/#home')}
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                                    <img src={assets.logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                                </div>
                                <h1 className="text-3xl font-bold tracking-wide text-white'" >
                                    Cliff Services
                                </h1>
                            </Link>
                        </div>
                        <p className="text-slate-400 mb-8 max-w-md">
                            Pioneering excellence in educational and business solutions with a forward-thinking approach that transforms challenges into opportunities.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[
                                { name: "Twitter", icon: <Twitter size={18} />, color: "hover:bg-blue-500", url:"https://x.com/cliffservices9" },
                                { name: "LinkedIn", icon: <Linkedin size={18} />, color: "hover:bg-blue-700", url:"https://www.linkedin.com/company/cliff-services-inc" },
                                { name: "Facebook", icon: <Facebook size={18} />, color: "hover:bg-slate-700", url:"https://www.facebook.com/people/Cliff-Services/61552332898632" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className={`w-10 h-10 flex items-center justify-center rounded-md bg-slate-800 ${social.color} hover:text-white transition-all duration-300 group relative`}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {social.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="lg:w-1/2 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-3">Stay Updated</h3>
                        <p className="text-slate-400 mb-5">Join our newsletter for the latest updates on services, industry insights, and exclusive offers.</p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:outline-none text-slate-200"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center"
                            >
                                Subscribe
                                <ArrowRight size={18} className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-800/70">
                    {/* Navigation Links */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-semibold text-white mb-6 inline-flex items-center">
                            Navigation
                            <span className="ml-2 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></span>
                        </h3>
                        <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {[
                                { label: 'Home', to: '/#home' },
                                { label: 'About', to: '/#about' },
                                { label: 'Services', to: '/#services' },
                                { label: 'Staffing', to: '/#staffing-solutions' },
                                { label: 'Products', to: '/#products' },
                                { label: 'Contact', to: '/#contact' },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="text-slate-400 hover:text-white transition-colors duration-300 inline-flex items-center group"
                                    >
                                        <span className="w-0 h-0.5 bg-indigo-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services - Split into two columns */}
                    <div className="lg:col-span-5">
                        <h3 className="text-lg font-semibold text-white mb-6 inline-flex items-center">
                            Our Services
                            <span className="ml-2 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></span>
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                            {[
                                { label: 'AI/ML Solutions', to: '/services/AI-ML-Solutions' },
                                { label: 'Cyber Security', to: '/services/Cyber-Security' },
                                { label: 'Business Intelligence', to: '/services/Business-Intelligence' },
                                { label: 'Cloud Technologies', to: '/services/Cloud-Technologies' },
                                { label: 'Web Development', to: '/services/Web-Development' },
                                { label: 'Oracle', to: '/services/Oracle' },
                                { label: 'SAP Solutions', to: '/services/SAP-Solutions' },
                                { label: 'SAS CDM', to: '/services/SAS-CDM' },
                                { label: 'PMC', to: '/services/PMC' },
                                { label: 'Workforce Management', to: '/services/Workforce-Management' },
                                { label: 'GSI', to: '/services/GSI' },
                                { label: 'Healthcare', to: '/services/Healthcare' }
                            ].map((service, index) => (
                                <Link
                                    key={index}
                                    to={service.to}
                                    className="text-slate-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors"></div>
                                    {service.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info + Locations */}
                    <div className="lg:col-span-4">
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-white mb-6 inline-flex items-center">
                                Contact Us
                                <span className="ml-2 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></span>
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                            <Mail size={16} className="text-indigo-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-slate-300 font-medium">Email Us</p>
                                        <a href="mailto:info@cliffservices.com" className="text-slate-400 hover:text-indigo-400 transition-colors">
                                            info@cliffservices.com
                                        </a>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                            <Phone size={16} className="text-indigo-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-slate-300 font-medium">Call Us</p>
                                        <a href="tel:+18001234567" className="text-slate-400 hover:text-indigo-400 transition-colors">
                                            +1 (800) 123-4567
                                        </a>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                            <MapPin size={16} className="text-indigo-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-slate-300 font-medium">Main Office</p>
                                        <p className="text-slate-400">
                                            123 Business Ave, Suite 100
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Locations as Tags */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 inline-flex items-center">
                                Global Presence
                                <span className="ml-2 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['UK', 'USA', 'Canada', 'Australia', 'India'].map((location, index) => (
                                    <div
                                        key={index}
                                        // to={`/locations/${location.toLowerCase()}`}
                                        className=" cursor-pointer px-3 py-1.5 bg-slate-800/70 hover:bg-indigo-500/20 rounded-md text-sm text-slate-300 hover:text-white transition-all duration-300 flex items-center gap-1.5"
                                    >
                                        <MapPin size={14} />
                                        {location}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <p className="text-sm text-slate-400">
                        © {currentYear} Cliff Services. All rights reserved. Crafted with precision.
                    </p>

                    {/* Legal Links */}
                    <div className="flex gap-8">
                        <Link to="/terms" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                            <ExternalLink size={14} />
                            Terms of Service
                        </Link>
                        <Link to="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                            <ExternalLink size={14} />
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
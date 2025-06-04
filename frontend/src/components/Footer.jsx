import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, MapPin, Mail, Phone, ArrowRight, ExternalLink, Facebook, X } from 'lucide-react';
import { assets } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Location coordinates and details for Google Maps
const locations = {
    uk: {
        lat: 51.509865,
        lng: -0.118092,
        name: 'UK',
        address: 'Pera Business Park, Nottingham Road, Melton Mowbray, Leicestershire LE13 OPB',
        phone: '+44 330 133 4363',
        email: 'uk@cliffservice.com'
    },
    usa: {
        lat: 37.7749,
        lng: -122.4194,
        name: 'USA',
        address: '13873, Park Center Road, Suite 181, Herndon, VA 20171',
        phone: '+1 (571) 833-1714',
        email: 'usa@cliffservice.com'
    },
    canada: {
        lat: 43.6532,
        lng: -79.3832,
        name: 'Canada',
        address: 'Robert Speck Parkway, Suite 1500, Mississauga, ON L4Z 3Y4',
        phone: '+44 330 133 4363',
        email: 'canada@cliffservice.com'
    },
    australia: {
        lat: -33.8688,
        lng: 151.2093,
        name: 'Australia',
        address: '12 Spoonbill Cl, Williams Landing, Victoria, 3027',
        phone: '+44 330 133 4363',
        email: 'australia@cliffservice.com'
    },
    india: {
        lat: 28.6139,
        lng: 77.2090,
        name: 'India',
        address: 'Spacion Business Center, Hitec City, Hyderabad, Telangana, 500081 - IN',
        phone: '+91 8008432111',
        email: 'india@cliffservice.com'
    }
};


    // Different options for handling location clicks:

    // Option 1: Show modal with map (default in this code)
    const handleLocationClick = (location) => {
        const locationKey = location.toLowerCase();
        setSelectedLocation(selectedLocation === locationKey ? null : locationKey);
    };

    // Option 2: Direct redirect to internal page (uncomment to use)
    const redirectToLocationPage = (location) => {
        const locationKey = location.toLowerCase();
        window.location.href = `/locations/${locationKey}`;
    };

    // Option 3: Open in Google Maps (uncomment to use)
    const openInGoogleMaps = (location) => {
        const locationKey = location.toLowerCase();
        const { lat, lng, address } = locations[locationKey];
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    };

    const closeMap = () => {
        setSelectedLocation(null);
    };

    const handleNavClick = (target) => {
        // Your navigation handling code
    };

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
                                { name: "Twitter", icon: <Twitter size={18} />, color: "hover:bg-blue-500", url: "https://x.com/cliffservices9" },
                                { name: "LinkedIn", icon: <Linkedin size={18} />, color: "hover:bg-blue-700", url: "https://www.linkedin.com/company/cliff-services-inc" },
                                { name: "Facebook", icon: <Facebook size={18} />, color: "hover:bg-slate-700", url: "https://www.facebook.com/people/Cliff-Services/61552332898632" },
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
                                        <a href="mailto:careers@cliffservice.com" className="text-slate-400 hover:text-indigo-400 transition-colors">
                                            info@cliffservice.com
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
                                            +44 330 133 4363
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
                                            Pera Business Park, Nottingham Road, Melton Mowbray, LE13 0PB.
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
                                        onClick={() => handleLocationClick(location)}
                                        // Alternative options (uncomment one to use):
                                        // onClick={() => redirectToLocationPage(location)}
                                        // onClick={() => openInGoogleMaps(location)}
                                        className="cursor-pointer px-2 py-1.5 bg-slate-800/70 hover:bg-indigo-500/20 rounded-md text-xs text-slate-300 hover:text-white transition-all duration-300 flex items-center gap-1.5"
                                    >
                                        <MapPin size={14} />
                                        {location}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Modal */}
                {selectedLocation && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 rounded-xl w-full max-w-3xl border border-slate-700 overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b border-slate-800">
                                <h3 className="text-lg font-semibold text-white">
                                    {locations[selectedLocation].name} Office
                                </h3>
                                <button
                                    onClick={closeMap}
                                    className="p-1 rounded-full hover:bg-slate-800 transition-colors"
                                >
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <div className="md:w-1/2">
                                        <p className="text-slate-300 mb-2 flex items-start gap-2">
                                            <MapPin size={16} className="mt-1 flex-shrink-0 text-indigo-400" />
                                            <span>{locations[selectedLocation].address}</span>
                                        </p>
                                        <p className="text-slate-300 mb-2 flex items-start gap-2">
                                            <Phone size={16} className="mt-1 flex-shrink-0 text-indigo-400" />
                                            <span>{locations[selectedLocation].phone}</span>
                                        </p>
                                        <p className="text-slate-300 mb-2 flex items-start gap-2">
                                            <Mail size={16} className="mt-1 flex-shrink-0 text-indigo-400" />
                                            <span>{locations[selectedLocation].email}</span>
                                        </p>
                                    </div>
                                    {/* <div className="md:w-1/2 h-40 md:h-auto bg-slate-800 rounded-lg overflow-hidden">
                                        <iframe
                                            title={`${locations[selectedLocation].name} Map`}
                                            width="100%" 
                                            height="100%" 
                                            frameBorder="0" 
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(locations[selectedLocation].address)}&center=${locations[selectedLocation].lat},${locations[selectedLocation].lng}&zoom=14`}
                                            allowFullScreen
                                        ></iframe>
                                    </div> */}
                                </div>
                                <div className="flex justify-between flex-wrap gap-3">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locations[selectedLocation].address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg text-white text-sm flex items-center gap-1.5"
                                    >
                                        <ArrowRight size={16} /> Get Directions
                                    </a>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={closeMap}
                                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
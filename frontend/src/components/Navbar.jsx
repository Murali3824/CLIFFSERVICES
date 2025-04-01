import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, Menu, X, ChevronRight, Home, User, LogOut, ChevronDown } from 'lucide-react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { API_URL } from '../App';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeSection, setActiveSection] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInitials, setUserInitials] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userFullName, setUserFullName] = useState('');
    const navRef = useRef(null);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { label: 'Home', href: '/#home', icon: <Home size={18} /> },
        { label: 'About', href: '/#about', icon: <Camera size={18} /> },
        { label: 'Services', href: '/#services', icon: <ChevronRight size={18} /> },
        { label: 'Staffing Solutions', href: '/#staffing-solutions', icon: <ChevronRight size={18} /> },
        { label: 'Products', href: '/#products', icon: <ChevronRight size={18} /> },
        { label: 'Careers', href: '/careers', icon: <ChevronRight size={18} /> },
        { label: 'Contact', href: '/#contact', icon: <ChevronRight size={18} /> },
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserProfile(token);
        } else {
            setIsLoggedIn(false);
            setUserInitials('');
            setUserFullName('');
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get(API_URL + '/api/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { firstName, lastName } = response.data;
            setUserInitials(`${firstName[0]}${lastName[0]}`.toUpperCase());
            setUserFullName(`${firstName} ${lastName}`);
        } catch (error) {
            console.error('Error fetching profile:', error);
            handleLogout(); // Logout if profile fetch fails (e.g., token expired)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserInitials('');
        setUserFullName('');
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            
            // Only do scroll-based highlighting on the home page
            if (location.pathname === '/') {
                const sections = navItems.map(item => item.href.split('#')[1]).filter(Boolean);
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            setActiveSection(section);
                            break;
                        }
                    }
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, navItems]);

    useEffect(() => {
        // Check for specific product or service pages
        if (location.pathname.startsWith('/services/')) {
            setActiveSection('services');
        } else if (location.pathname.startsWith('/products/')) {
            setActiveSection('products');
        } else if (location.pathname === '/careers') {
            setActiveSection('careers');
        } else if (location.pathname === '/loginsignup' && isLoggedIn) {
            navigate('/'); // Redirect to home if logged in
        } else if (location.pathname === '/') {
            // On home page, use hash or default to 'home'
            const hash = location.hash.slice(1);
            setActiveSection(hash || 'home');
        }
    }, [location, isLoggedIn, navigate]);

    const handleNavClick = (href) => {
        const isFullPath = !href.startsWith('/#');
        
        if (href === '/careers') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        if (isFullPath) {
            // For full paths like /careers or /services/something
            const section = href.split('/')[1] || '';
            setActiveSection(section);
        } else {
            // For hash links like /#services
            const section = href.split('#')[1] || '';
            setActiveSection(section);
        }
        
        setIsMenuOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
    };

    const isScrolled = scrollPosition > 50;
    const navbarBg = isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black/80';
    const textColor = isScrolled ? 'text-white' : 'text-white';

    const renderUserProfileDropdown = () => {
        return (
            <div ref={dropdownRef} className="relative">
                <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                >
                    <User size={20} className="text-white" />
                    <ChevronDown
                        className={`w-4 h-4 text-white transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''} ml-1`}
                    />
                </button>
                {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                        <div className="py-1">
                            <button
                                onClick={handleProfileClick}
                                className="group flex w-full items-center px-4 py-2 text-sm text-black hover:bg-gray-100"
                            >
                                <User className="mr-3 h-5 w-5 text-black" />
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="group flex w-full items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                            >
                                <LogOut className="mr-3 h-5 w-5 text-black" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Helper function to determine if a nav item is active
    const isNavItemActive = (item) => {
        // Direct match for non-hash routes like /careers
        if (item.href === '/careers' && location.pathname === '/careers') {
            return true;
        }
        
        // Handle services pages
        if (item.href === '/#services' && location.pathname.startsWith('/services/')) {
            return true;
        }
        
        // Handle products pages
        if (item.href === '/#products' && location.pathname.startsWith('/products/')) {
            return true;
        }
        
        // Handle hash-based navigation
        const section = item.href.split('#')[1] || '';
        return location.pathname === '/' && section === activeSection;
    };

    return (
        <header className="fixed w-full z-50 transition-all duration-300">
            <nav ref={navRef} className={`${navbarBg} transition-all duration-300 px-4 lg:px-8`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link to="/#home" onClick={() => handleNavClick('/#home')} className="flex items-center group">
                            <div className="relative overflow-hidden rounded-full">
                                <img src={assets.logo} alt="Cliff Services Logo" className="h-10 w-10 object-contain" />
                            </div>
                            <div className={`ml-1 ${textColor}`}>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    <span className="relative">
                                        Cliff
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </span>
                                    <span className="font-light"> Services</span>
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <div className={`flex gap-1 p-1 ${isScrolled ? 'bg-gray-100' : 'bg-black/20'} rounded-full backdrop-blur-sm`}>
                                {navItems.map((item) => {
                                    const isActive = isNavItemActive(item);
                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            onClick={() => handleNavClick(item.href)}
                                            className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 flex items-center gap-2
                                                ${isActive ? 'bg-white text-gray-800 shadow-sm' : `${isScrolled ? 'text-gray-700 hover:bg-gray-200/70' : 'text-white/90 hover:bg-white/10'}`}`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                            {/* Auth Buttons */}
                            <div className="flex gap-2">
                                {isLoggedIn ? (
                                    renderUserProfileDropdown()
                                ) : (
                                    <Link
                                        to="/loginsignup"
                                        className="px-3 py-1.5 text-base rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                    >
                                        Get Started
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile Controls - Profile and Menu Toggle side by side */}
                        <div className="lg:hidden flex items-center space-x-2">
                            {/* Profile icon for mobile */}
                            {isLoggedIn && (
                                <button
                                    onClick={handleProfileClick}
                                    className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                                >
                                    <User size={24} className="text-white" />
                                </button>
                            )}

                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/90 backdrop-blur-md transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ top: navRef.current ? navRef.current.offsetHeight : 0 }}
            >
                <div className={`h-full transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-10'}`}>
                    <div className="h-full flex flex-col p-6 max-h-screen overflow-auto space-y-2">
                        {navItems.map((item) => {
                            const isActive = isNavItemActive(item);
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`group relative flex items-center p-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-white text-black' : 'bg-black/40 text-white hover:bg-black/60'}`}
                                >
                                    <div className={`mr-4 ${isActive ? 'text-black' : 'text-white'}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">{item.label}</p>
                                    </div>
                                </Link>
                            );
                        })}

                        {/* Logout in menu list only for mobile */}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="group relative flex items-center p-4 rounded-xl transition-all duration-300 bg-black/40 text-white hover:bg-black/60"
                            >
                                <div className="mr-4 text-white">
                                    <LogOut size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-lg">Logout</p>
                                </div>
                            </button>
                        )}

                        {/* Sign In button (only shown if not logged in) */}
                        {!isLoggedIn && (
                            <Link
                                to="/loginsignup"
                                onClick={() => setIsMenuOpen(false)}
                                className="p-4 rounded-xl text-lg font-medium bg-white text-black"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
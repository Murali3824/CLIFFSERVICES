import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { assets } from '../assets/assets';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceID = 'service_yla6w1u'; // Replace with your EmailJS Service ID
        const templateID = 'template_gpr86j8'; // Replace with your EmailJS Template ID
        const publicKey = 'CQhQ6NC8px4ES2ePa'; // Replace with your EmailJS Public Key
        const companyEmail = 'careers@cliffservice.com'; // Replace with your company email

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: companyEmail,
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully:', response.status, response.text);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setIsSubmitted(true);
                setError(null);
                setTimeout(() => setIsSubmitted(false), 5000);
            })
            .catch((err) => {
                setError('Failed to send message. Please try again.');
                setTimeout(() => setError(null), 5000);
                console.error('Error sending email:', err);
            });
    };

    return (
        <div id="contact" className="min-h-screen bg-gray-50 flex flex-col">
            {/* Main Content Container */}
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col">
                {/* Section Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-teal-800">Get In Touch</h2>
                    <div className="flex justify-center items-center space-x-4 mt-2">
                        <a href="mailto:info@cliffservices.com" className="cursor-pointer w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-teal-600"/>
                        </a>
                        <a href="tel:+18001234567" className="cursor-pointer w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-teal-600"/>
                        </a>
                    </div>
                </div>
                
                {/* Two Column Layout - Made responsive for small screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Contact Form */}
                    <div className="bg-white rounded-2xl shadow-md p-5 md:p-8 border-t-4 border-teal-500">
                        <h2 className="text-3xl font-semibold text-teal-800 text-center mb-4">Contact Us</h2>
                        <p className="text-gray-600 text-center mb-8">We’d love to hear from you. Fill out the form below to get in touch.</p>

                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-teal-100 text-teal-800 rounded-lg text-center">
                                Your message has been sent successfully. We’ll respond soon!
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300"
                                    placeholder="Enter the subject"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300 resize-none"
                                    placeholder="Type your message here"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition-all duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Locations */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-teal-800 mb-4">Our Locations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {[
                                {
                                    "country": "United States",
                                    "city": "Herndon, Virginia",
                                    "address": "13873 Park Center Road, Suite 155-33, Herndon, Virginia 20171, US",
                                    "frontImage": assets.usa1,
                                    "backImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                },
                                {
                                    "country": "United Kingdom",
                                    "city": "Melton Mowbray, Leicestershire",
                                    "address": "Pera Business Park, Melton Mowbray, Leicestershire LE13 0PB, GB",
                                    "frontImage": assets.uk1,
                                    "backImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                },
                                {
                                    "country": "Canada",
                                    "city": "Toronto, Ontario",
                                    "address": "130 Westmore Dr, Unit #5, Toronto, Ontario M9V 5E2, CA",
                                    "frontImage": assets.c1,
                                    "backImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                },
                                {
                                    "country": "India",
                                    "city": "Hyderabad, Telangana",
                                    "address": "8-2-78, 1st Floor, CNR Complex, Chintal Kunta Road, L B Nagar, Hyderabad, Telangana 500074, IN",
                                    "frontImage": assets.i1,
                                    "backImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                },
                                {
                                    "country": "Australia",
                                    "city": "Williams Landing, Victoria",
                                    "address": "12 Spoonbill Cl, Williams Landing, Victoria, 3027, AU",
                                    "frontImage": assets.a1,
                                    "backImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                }
                            ].map((office, index) => (
                                <div
                                    key={index}
                                    className="flip-container h-40 w-full"
                                >
                                    <div className="flipper">
                                        {/* Front Side */}
                                        <div
                                            className="front w-full h-full bg-cover bg-center rounded-lg shadow-md flex items-center justify-center"
                                            style={{ backgroundImage: `url(${office.frontImage})` }}
                                        >
                                            <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center rounded-lg">
                                                <h4 className="text-base font-semibold text-white">{office.country}</h4>
                                                <p className="text-xs text-white">{office.city}</p>
                                            </div>
                                        </div>
                                        {/* Back Side */}
                                        <div
                                            className="back w-full h-full bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-center"
                                            style={{ backgroundImage: `url(${office.backImage})` }}
                                        >
                                            <div className="bg-black bg-opacity-70 w-full h-full flex items-center justify-center p-2 rounded-lg">
                                                <p className="text-xs text-white">{office.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .flip-container {
                    perspective: 1000px;
                }
                .flipper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.7s;
                    transform-style: preserve-3d;
                }
                .flip-container:hover .flipper {
                    transform: rotateY(180deg);
                }
                .front, .back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    text-align: center;
                }
                .back {
                    transform: rotateY(180deg);
                }
                
                /* Custom media query for extra small screens */
                @media (max-width: 640px) {
                    .xs\\:grid-cols-2 {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;
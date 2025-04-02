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
        <div id="contact" className="min-h-screen bg-gray-50 py-20 flex flex-col items-center justify-start">
            {/* Contact Form - Top */}
            <div className="w-full max-w-6xl mx-auto px-3 md:px-6 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Unique Design */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl transform -rotate-6"></div>
                        <div className="relative bg-white rounded-2xl shadow-md p-8 h-full flex flex-col justify-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold text-teal-800 leading-tight">
                                    Let's Connect
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Your thoughts matter to us. Reach out and let's start a conversation!
                                </p>
                                <div className="flex space-x-4">
                                    <a href="mailto:info@cliffservices.com" className=" cursor-pointer w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                        <Mail className='w-6 h-6 text-teal-600'/>
                                    </a>
                                    <a href="tel:+18001234567" className="w-12 h-12 cursor-pointer bg-teal-100 rounded-full flex items-center justify-center">
                                        <Phone className='w-6 h-6 text-teal-600'/>
                                    </a>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-200 rounded-tl-full opacity-30"></div>
                        </div>
                    </div>

                    {/* Right Side - Original Contact Form */}
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
                </div>
            </div>

            {/* Contact Info - Bottom */}
            <div className="w-full max-w-5xl mx-auto px-6 space-y-12">
                <h3 className="text-4xl font-bold text-teal-700 text-center mb-8">Our Locations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
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
                            "frontImage":assets.a1,
                            "backImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        }
                    ].map((office, index) => (
                        <div
                            key={index}
                            className="flip-container h-[350px] w-full min-w-[320px] max-w-[360px] mx-auto"
                        >
                            <div className="flipper">
                                {/* Front Side */}
                                <div
                                    className="front w-full h-full bg-cover bg-center rounded-xl shadow-lg flex items-center justify-center"
                                    style={{ backgroundImage: `url(${office.frontImage})` }}
                                >
                                    <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center rounded-xl">
                                        <h4 className="text-3xl font-semibold text-white">{office.country}</h4>
                                        <p className="text-xl text-white px-4">{office.city}</p>
                                    </div>
                                </div>
                                {/* Back Side */}
                                <div
                                    className="back w-full h-full bg-cover bg-center rounded-xl shadow-lg flex flex-col items-center justify-start"
                                    style={{ backgroundImage: `url(${office.backImage})` }}
                                >
                                    <div className="bg-black bg-opacity-60 w-full p-8 rounded-t-xl">
                                        <p className="text-xl text-white">{office.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
            `}</style>

        </div>
    );
};

export default Contact;
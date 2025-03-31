import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await axios.post(`${API_URL}/api/user/forgot-password`, { email });
            setMessage(response.data.msg);
            setTimeout(() => navigate('/reset-password'), 2000); // Redirect after 2s
        } catch (err) {
            console.error('Forgot Password Error:', err);
            setError(err.response?.data?.msg || 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-32 flex items-center justify-center bg-white">
            <div className="w-full max-w-xl bg-white p-6 shadow-md">
                <div className="flex justify-center mb-4 relative">
                    <div className="relative inline-flex items-center">
                        <span className="px-3 py-1 text-sm font-medium text-black">Forgot Password</span>
                        <div className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 left-0 w-28" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="text-xl font-semibold text-black text-center">
                        Career Opportunities: Reset Your Password
                    </h2>

                    <p className="text-center text-sm">
                        Enter your email address below to receive a password reset OTP.
                        <br />
                        <Link to="/loginsignup" className="text-blue-500 hover:underline">
                            Return to login
                        </Link>
                    </p>

                    <div className="md:flex md:items-center md:gap-2 mt-2">
                        <label className="text-sm flex items-center md:w-1/3">
                            Email Address: <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full md:w-2/3 p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs text-center italic">{error}</p>}
                    {message && <p className="text-green-500 text-xs text-center">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Send OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
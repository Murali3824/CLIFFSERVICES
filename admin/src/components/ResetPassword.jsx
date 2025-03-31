import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../App';

const ResetPassword = ({ setState }) => {
    const [formData, setFormData] = useState({ email: '', otp: '', newPassword: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/hr/reset-password`, formData);
            setMessage(response.data.msg);
            setTimeout(() => setState('Login'), 2000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Reset failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-32 flex items-center justify-center bg-white">
            <div className="w-full max-w-xl bg-white p-6 shadow-md">
                <div className="flex justify-center mb-4 relative">
                    <div className="relative inline-flex items-center">
                        <span className="px-3 py-1 text-sm font-medium text-black">Reset Password</span>
                        <div className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 left-0 w-28" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="text-xl font-semibold text-black text-center">
                        Career Opportunities: Set New Password
                    </h2>

                    <p className="text-center text-sm">
                        Enter the OTP sent to your email and create a new password.
                        <br />
                        <button
                            type="button"
                            onClick={() => setState('Login')}
                            className="text-blue-500 hover:underline"
                        >
                            Return to login
                        </button>
                    </p>

                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none mt-2"
                        placeholder="Email Address"
                        required
                    />
                    <input
                        type="text"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                        placeholder="OTP"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                            placeholder="New Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 bg-gray-200 px-2 py-1 text-xs rounded"
                        >
                            {showPassword ? 'HIDE' : 'SHOW'}
                        </button>
                    </div>

                    <div className="text-xs text-gray-600 bg-blue-100 p-2 rounded">
                        <ul className="list-disc list-inside">
                            <li>Password must be at least 8 characters long.</li>
                            <li>Password must not be longer than 18 characters.</li>
                            <li>Password must contain at least one upper case and one lower case letter.</li>
                            <li>Password must contain at least one number and one special character.</li>
                            <li>Password must not contain spaces or Unicode characters.</li>
                        </ul>
                    </div>

                    {error && <p className="text-red-500 text-xs text-center italic">{error}</p>}
                    {message && <p className="text-green-500 text-xs text-center">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
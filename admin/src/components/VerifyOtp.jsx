import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../App';

const VerifyOtp = ({ email, setState }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(API_URL+'/api/hr/verify-otp', {
                email,
                otp
            }, {
                headers: { "Content-Type": "application/json" }
            });

            setSuccess('Email verified successfully!');
            setTimeout(() => {
                setState('Login');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.msg || "Error verifying OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-32 flex items-center justify-center bg-white">
            <div className="w-full max-w-xl bg-white p-6 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="text-xl font-semibold text-black text-center">
                        Career Opportunities: Verify
                    </h2>

                    <div>
                        <p className="text-sm py-2 text-stone-500 text-center">
                            Enter the OTP sent to <span className="text-base text-black">{email}</span>
                        </p>
                        <input
                            name="otp"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            type="text"
                            placeholder="OTP"
                            className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs text-center italic">{error}</p>}
                    {success && <p className="text-green-500 text-xs text-center">{success}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Verify'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
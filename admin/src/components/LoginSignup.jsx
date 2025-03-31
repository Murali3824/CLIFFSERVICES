import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyOtp from './VerifyOtp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { API_URL } from '../App';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('Login');
    const [loginType, setLoginType] = useState('HR'); // Default to HR
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        employeeId: '',
        department: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordConstraints, setPasswordConstraints] = useState({
        length: '8 more character(s)',
        lowercase: '1 lower case letter',
        uppercase: '1 upper case letter',
        numberOrSpecial: '1 number or punctuation character',
        noSpace: 'No space or unicode characters',
    });

    const updatePasswordConstraints = (password) => {
        const constraints = {
            length: '',
            lowercase: '',
            uppercase: '',
            numberOrSpecial: '',
            noSpace: '',
        };

        if (password.length < 8) constraints.length = `${8 - password.length} more character(s)`;
        else if (password.length > 18) constraints.length = 'Password too long';
        if (!password.match(/[a-z]/)) constraints.lowercase = '1 lower case letter';
        if (!password.match(/[A-Z]/)) constraints.uppercase = '1 upper case letter';
        if (!password.match(/[0-9!@#$%^&*]/)) constraints.numberOrSpecial = '1 number or punctuation character';
        if (password.match(/\s/) || password.match(/[^\x20-\x7E]/)) constraints.noSpace = 'No space or unicode characters';

        setPasswordConstraints(constraints);
    };

    const handleStateChange = (newState) => {
        setState(newState);
        setFormData({
            username: '',
            email: '',
            password: '',
            employeeId: '',
            department: ''
        });
        setError('');
        setSuccess('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'password' && state === 'Sign Up') {
            updatePasswordConstraints(value);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        let apiUrl = state === 'Sign Up' 
            ? `${API_URL}/api/hr/register`
            : loginType === 'HR'
                ? `${API_URL}/api/hr/login`
                : `${API_URL}/api/admin/login`;

        let requestBody = state === 'Sign Up' 
            ? formData 
            : { email: formData.email, password: formData.password };

        try {
            const response = await axios.post(apiUrl, requestBody, {
                headers: { "Content-Type": "application/json" }
            });

            if (state === 'Sign Up') {
                setSuccess('Registration successful! Please verify your email.');
                setTimeout(() => setState('Verify OTP'), 2000);
            } else if (state === 'Login' && response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userType", loginType.toLowerCase());
                const destination = loginType.toLowerCase() === 'hr' ? "/hr" : "/admin";
                setSuccess(`${loginType} login successful!`);
                setTimeout(() => navigate(destination), 1000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.msg || "Error connecting to the server";
            
            // Check if the error is related to email verification
            if (errorMessage.toLowerCase().includes("verify your email") || 
                errorMessage.toLowerCase().includes("not verified")) {
                setError("Please verify your email first");
                setSuccess("Redirecting to email verification...");
                
                // After a short delay, redirect to the OTP verification page
                setTimeout(() => {
                    setState('Verify OTP');
                }, 1500);
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    if (state === 'Verify OTP') return <VerifyOtp email={formData.email} setState={setState} />;
    if (state === 'Forgot Password') return <ForgotPassword setState={setState} />;
    if (state === 'Reset Password') return <ResetPassword email={formData.email} setState={setState} />;

    return (
        <div className="min-h-screen py-32 flex items-center justify-center bg-white">
            <div className="w-full max-w-xl bg-white p-6 shadow-md">
                {!state.includes('Verify') && (
                    <div className="flex justify-center mb-4 relative">
                        <div className="relative inline-flex items-center">
                            {state === 'Login' ? (
                                <>
                                    <button
                                        onClick={() => setLoginType('HR')}
                                        className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${loginType === 'HR' ? 'text-black' : 'text-gray-400'}`}
                                    >
                                        HR Login
                                    </button>
                                    <span className="px-2 text-gray-300">|</span>
                                    <button
                                        onClick={() => setLoginType('Admin')}
                                        className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${loginType === 'Admin' ? 'text-black' : 'text-gray-400'}`}
                                    >
                                        Admin Login
                                    </button>
                                    <div
                                        className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ${loginType === 'HR' ? 'left-0 w-16' : 'left-16 w-20'}`}
                                    />
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleStateChange('Sign Up')}
                                        className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${state === 'Sign Up' ? 'text-black' : 'text-gray-400'}`}
                                    >
                                        Register
                                    </button>
                                    <span className="px-2 text-gray-300">|</span>
                                    <button
                                        onClick={() => handleStateChange('Login')}
                                        className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${state === 'Login' ? 'text-black' : 'text-gray-400'}`}
                                    >
                                        Login
                                    </button>
                                    <div
                                        className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ${state === 'Sign Up' ? 'left-0 w-16' : 'left-16 w-12'}`}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="text-xl font-semibold text-black text-center">
                        Career Opportunities: {state === 'Sign Up' ? 'Create HR Account' : `${loginType} Login`}
                    </h2>

                    <div>
                        <p className="text-center text-sm">
                            {state === 'Login' ? (
                                <>
                                    Not a registered {loginType} yet?{' '}
                                    {loginType === 'HR' && (
                                        <button type="button" onClick={() => handleStateChange('Sign Up')} className="text-blue-500 hover:underline">
                                            Create an account
                                        </button>
                                    )}
                                    <br />
                                    <span className="text-xs italic">Login credentials are case sensitive</span>
                                </>
                            ) : (
                                <>
                                    Already registered?{' '}
                                    <button type="button" onClick={() => handleStateChange('Login')} className="text-blue-500 hover:underline">
                                        Please sign in
                                    </button>
                                    <br />
                                    <span className="text-xs italic">Registration credentials are case sensitive</span>
                                </>
                            )}
                        </p>

                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none mt-2"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    {state === 'Sign Up' && (
                        <>
                            <input
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                placeholder="Full Name"
                                required
                            />
                            <input
                                name="employeeId"
                                type="text"
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                placeholder="Employee ID"
                                required
                            />
                            <input
                                name="department"
                                type="text"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                placeholder="Department"
                                required
                            />
                        </>
                    )}

                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 bg-gray-200 px-2 py-1 text-xs rounded"
                        >
                            {showPassword ? 'HIDE' : 'SHOW'}
                        </button>
                    </div>

                    {state === 'Sign Up' && (
                        <>
                            <div className="text-xs text-yellow-600">
                                Required:{' '}
                                {passwordConstraints.length && `${passwordConstraints.length}, `}
                                {passwordConstraints.lowercase && `${passwordConstraints.lowercase}, `}
                                {passwordConstraints.uppercase && `${passwordConstraints.uppercase}, `}
                                {passwordConstraints.numberOrSpecial && `${passwordConstraints.numberOrSpecial}`}
                            </div>
                            <div className="text-xs text-gray-600 bg-blue-100 p-2 rounded">
                                <ul className="list-disc list-inside">
                                    <li>Password must be at least 8 characters long.</li>
                                    <li>Password must not be longer than 18 characters.</li>
                                    <li>Password must contain at least one upper case and one lower case letter.</li>
                                    <li>Password must contain at least one number or punctuation character.</li>
                                    <li>Password must not contain space or unicode characters.</li>
                                </ul>
                            </div>
                        </>
                    )}

                    {error && <p className="text-red-500 text-xs text-center italic">{error}</p>}
                    {success && <p className="text-green-500 text-xs text-center">{success}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : state === 'Sign Up' ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                {state === 'Login' && loginType === 'HR' && (
                    <div className="mt-3 text-center">
                        <button
                            onClick={() => handleStateChange('Forgot Password')}
                            className="text-black text-xs hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
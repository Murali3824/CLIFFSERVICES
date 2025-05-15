import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';
import countryData from 'country-data';

// List of countries and their country codes
const countries = countryData.countries.all
    .map((country) => ({ name: country.name, code: country.name + `(${country.countryCallingCodes[0]})` }))
    .filter((country) => country.code !== '+undefined')
    .sort((a, b) => a.name.localeCompare(b.name));

const LoginSignup = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        retypeEmail: '',
        password: '',
        retypePassword: '',
        firstName: '',
        lastName: '',
        countryCode: '',
        PhoneNo: '',
        country: '',
        otp: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [passwordConstraints, setPasswordConstraints] = useState({
        length: '8 more character(s)',
        lowercase: '1 lower case letter',
        uppercase: '1 upper case letter',
        numberOrSpecial: '1 number or punctuation character',
        noSpace: 'No space or unicode characters',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const updatePasswordConstraints = (password) => {
        const constraints = {
            length: '',
            lowercase: '',
            uppercase: '',
            numberOrSpecial: '',
            noSpace: '',
        };

        // Length check (8-18 characters)
        if (password.length < 8) {
            constraints.length = `${8 - password.length} more character(s)`;
        } else if (password.length > 18) {
            constraints.length = 'Password too long';
        }

        // Lowercase check
        if (!password.match(/[a-z]/)) {
            constraints.lowercase = '1 lower case letter';
        }

        // Uppercase check
        if (!password.match(/[A-Z]/)) {
            constraints.uppercase = '1 upper case letter';
        }

        // Number or special character check
        if (!password.match(/[0-9!@#$%^&*]/)) {
            constraints.numberOrSpecial = '1 number or punctuation character';
        }

        // No space or unicode check
        if (password.match(/\s/) || password.match(/[^\x20-\x7E]/)) {
            constraints.noSpace = 'No space or unicode characters';
        }

        setPasswordConstraints(constraints);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setFormData({ ...formData, password: newPassword });
        if (isRegister) {
            updatePasswordConstraints(newPassword);
        }
    };

    const handleRetypePasswordChange = (e) => {
        setFormData({ ...formData, retypePassword: e.target.value });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowRetypePassword = () => {
        setShowRetypePassword(!showRetypePassword);
    };

    const handleCountryChange = (e) => {
        const selectedCountry = countries.find(country => country.name === e.target.value);
        setFormData({
            ...formData,
            country: e.target.value,
            countryCode: selectedCountry ? selectedCountry.code : '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        // Additional validation for retype fields
        if (isRegister) {
            if (formData.email !== formData.retypeEmail) {
                setError('Emails do not match');
                setLoading(false);
                return;
            }
            if (formData.password !== formData.retypePassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }
        }

        try {
            if (showVerify) {
                const response = await axios.post(`${API_URL}/api/user/verify-otp`, {
                    email: formData.email,
                    otp: formData.otp,
                });
                setMessage(response.data.msg);
                setShowVerify(false);
                setIsRegister(false);
            } else if (isRegister) {
                const response = await axios.post(`${API_URL}/api/user/register`, formData);
                setMessage(response.data.msg);
                setShowVerify(true);
            } else {
                try {
                    const response = await axios.post(`${API_URL}/api/user/login`, {
                        email: formData.email,
                        password: formData.password,
                    });
                    localStorage.setItem('token', response.data.token);
                    setMessage('Login successful');
                    const loginSuccessEvent = new Event('loginSuccess');
                    window.dispatchEvent(loginSuccessEvent);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500);
                } catch (err) {
                    console.error('Auth Error:', err);
                    const errorMsg =
                        err.response?.data?.errors?.[0]?.msg ||
                        err.response?.data?.msg ||
                        'Operation failed';

                    // Check if error is about email verification
                    if (errorMsg.toLowerCase().includes('verify your email') ||
                        errorMsg.toLowerCase().includes('not verified')) {
                        setMessage('Please enter the OTP sent to your email');
                        setShowVerify(true);
                        // We keep the email they entered for verification
                    } else {
                        setError(errorMsg);
                    }
                }
            }
        } catch (err) {
            console.error('Auth Error:', err);
            const errorMsg =
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.msg ||
                'Operation failed';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen py-32 flex items-center justify-center bg-white">
            <div className="w-full max-w-xl bg-white p-6 shadow-md">
                {!showVerify && (
                    <div className="flex justify-center mb-4 relative">
                        <div className="relative inline-flex items-center">
                            <button
                                onClick={() => setIsRegister(true)}
                                className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${isRegister ? 'text-black' : 'text-gray-400'
                                    }`}
                            >
                                Register
                            </button>
                            <span className="px-2 text-gray-300">|</span>
                            <button
                                onClick={() => setIsRegister(false)}
                                className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${!isRegister ? 'text-black' : 'text-gray-400'
                                    }`}
                            >
                                Login
                            </button>
                            <div
                                className={`absolute bottom-0 h-0.5 bg-black transition-all duration-300 ${isRegister ? 'left-0 w-16' : 'left-16 w-12'
                                    }`}
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <h2 className="text-xl font-semibold text-black text-center">
                        Career Opportunities:{' '}
                        {showVerify ? 'Verify' : isRegister ? 'Create an Account' : 'Sign In'}
                    </h2>

                    {showVerify ? (
                        <div>
                            <p className='text-sm py-2 text-stone-500'>Enter the OTP sent to <span className='text-base text-black'>{formData.email}</span></p>
                            <input
                                type="text"
                                placeholder="OTP"
                                value={formData.otp}
                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                    ) : (
                        <>
                            <div>
                                <p className="text-center text-sm">
                                    {!isRegister ? (
                                        <>
                                            Not a registered user yet?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setIsRegister(true)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Create an account
                                            </button>
                                            <br />
                                            <span className="text-xs italic">Login credentials are case sensitive</span>
                                        </>
                                    ) : (
                                        <>
                                            Already a registered user?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setIsRegister(false)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Please sign in
                                            </button>
                                            <br />
                                            <span className="text-xs italic">Registration credentials are case sensitive</span>
                                        </>
                                    )}
                                </p>

                                <div className="md:flex md:items-center md:gap-2 mt-2">
                                    <label className="text-sm flex items-center md:w-1/3">
                                        Email Address: <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full md:w-2/3 p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {isRegister && (
                                <div className="md:flex md:items-center md:gap-2">
                                    <label className="text-sm flex items-center md:w-1/3">
                                        Retype Email Address: <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.retypeEmail}
                                        onChange={(e) =>
                                            setFormData({ ...formData, retypeEmail: e.target.value })
                                        }
                                        className="w-full md:w-2/3 p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                        required
                                    />
                                </div>
                            )}

                            <div className="relative md:flex md:items-center md:gap-2">
                                <label className="text-sm flex items-center md:w-1/3">
                                    Choose Password: <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="w-full md:w-2/3 relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPassword}
                                        className="absolute right-2 top-2 bg-gray-200 px-2 py-1 text-xs rounded"
                                    >
                                        {showPassword ? 'HIDE' : 'SHOW'}
                                    </button>
                                </div>
                            </div>

                            {isRegister && (
                                <>
                                    <div className="text-xs text-yellow-600 md:ml-1/3">
                                        Required:{' '}
                                        {passwordConstraints.length && `${passwordConstraints.length}, `}
                                        {passwordConstraints.lowercase && `${passwordConstraints.lowercase}, `}
                                        {passwordConstraints.uppercase && `${passwordConstraints.uppercase}, `}
                                        {passwordConstraints.numberOrSpecial &&
                                            `${passwordConstraints.numberOrSpecial}`}
                                    </div>
                                    <div className="text-xs text-gray-600 bg-blue-100 p-2 rounded md:ml-1/3">
                                        <ul className="list-disc list-inside">
                                            <li>Password must be at least 8 characters long.</li>
                                            <li>Password must not be longer than 18 characters.</li>
                                            <li>
                                                Password must contain at least one upper case and one lower case
                                                letter.
                                            </li>
                                            <li>
                                                Password must contain at least one number or punctuation character.
                                            </li>
                                            <li>Password must not contain space or unicode characters.</li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            {isRegister && (
                                <div className="relative md:flex md:items-center md:gap-2">
                                    <label className="text-sm flex items-center md:w-1/3">
                                        Retype Password: <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <div className="w-full md:w-2/3 relative">
                                        <input
                                            type={showRetypePassword ? 'text' : 'password'}
                                            value={formData.retypePassword}
                                            onChange={handleRetypePasswordChange}
                                            className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleShowRetypePassword}
                                            className="absolute right-2 top-2 bg-gray-200 px-2 py-1 text-xs rounded"
                                        >
                                            {showRetypePassword ? 'HIDE' : 'SHOW'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isRegister && (
                                <>
                                    <div className="md:flex md:items-center md:gap-2">
                                        <label className="text-sm flex items-center md:w-1/3">
                                            First Name: <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, firstName: e.target.value })
                                            }
                                            className="w-full md:w-2/3 p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="md:flex md:items-center md:gap-2">
                                        <label className="text-sm flex items-center md:w-1/3">
                                            Last Name: <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, lastName: e.target.value })
                                            }
                                            className="w-full md:w-2/3 p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="md:flex md:items-center md:gap-2">
                                        <label className="text-sm md:w-1/3">Phone:</label>
                                        <div className="flex gap-2 w-full md:w-2/3">
                                            <div className="w-1/3">
                                                <select
                                                    value={formData.countryCode}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, countryCode: e.target.value })
                                                    }
                                                    className="w-full p-2 border rounded text-sm text-black focus:outline-none"
                                                    required
                                                >
                                                    <option value="">Code</option>
                                                    {countries.map((country, index) => (
                                                        <option key={index} value={country.code}>
                                                            {country.code}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-2/3">
                                                <input
                                                    type="tel"
                                                    value={formData.PhoneNo}
                                                    onChange={(e) => {
                                                        const onlyNumbers = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                                        setFormData({ ...formData, PhoneNo: onlyNumbers });
                                                    }}
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    className="w-full p-2 border rounded text-sm text-black placeholder-gray-400 focus:outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex md:items-center md:gap-2">
                                        <label className="text-sm md:w-1/3">Country:</label>
                                        <select
                                            value={formData.country}
                                            onChange={handleCountryChange}
                                            className="w-full md:w-2/3 p-2 border rounded text-sm text-black focus:outline-none"
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((country, index) => (
                                                <option key={index} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {error && <p className="text-red-500 text-xs text-center italic">{error}</p>}
                    {message && <p className="text-green-500 text-xs text-center">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            <>
                                Processing...
                            </>
                        ) : (
                            showVerify ? 'Verify' : isRegister ? 'Sign Up' : 'Sign In'
                        )}
                    </button>
                </form>

                {!isRegister && !showVerify && (
                    <div className="mt-3 text-center">
                        <Link to="/forgot-password" className="text-black text-xs hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
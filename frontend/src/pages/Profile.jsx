import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, MapPin, ShieldCheck, Calendar } from 'lucide-react';
import { API_URL } from '../App';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
                <div className="w-16 h-16 border-4 border-transparent border-t-4 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center mt-10 bg-red-50 p-4 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen py-32 md:py-36 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="p-8 bg-gradient-to-r from-emerald-100 to-lime-100">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-14 md:w-24 md:h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <User className="w-10 h-10 md:w-12 md:h-12 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-800">
                                {profile.firstName} {profile.lastName}
                            </h2>
                            <p className="text-emerald-600 font-medium">{profile.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-emerald-700 border-b pb-2">
                            Personal Information
                        </h3>
                        <div className="space-y-4">
                            <ProfileDetail 
                                Icon={User} 
                                label="Full Name" 
                                value={`${profile.firstName} ${profile.lastName}`} 
                            />
                            <ProfileDetail 
                                Icon={Mail} 
                                label="Email" 
                                value={profile.email} 
                            />
                            <ProfileDetail 
                                Icon={Phone} 
                                label="Phone" 
                                value={`+${profile.countryCode} ${profile.PhoneNo}`} 
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-emerald-700 border-b pb-2">
                            Account Details
                        </h3>
                        <div className="space-y-4">
                            <ProfileDetail 
                                Icon={MapPin} 
                                label="Country" 
                                value={profile.country} 
                            />
                            <ProfileDetail 
                                Icon={ShieldCheck} 
                                label="Verification" 
                                value={profile.isVerified ? 'Verified' : 'Not Verified'}
                                valueClassName={profile.isVerified ? 'text-emerald-600' : 'text-red-600'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable component for profile details
const ProfileDetail = ({ Icon, label, value, valueClassName = '' }) => (
    <div className="flex items-center space-x-4 bg-neutral-50 p-1.5 md:p-3 rounded-lg shadow-sm">
        <div className="bg-emerald-100 p-3 rounded-full">
            <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
            <p className="text-neutral-500 text-sm">{label}</p>
            <p className={`font-medium text-neutral-800 ${valueClassName}`}>{value}</p>
        </div>
    </div>
);

export default Profile;
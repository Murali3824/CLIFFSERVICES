import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Edit, Save, X, Check, AlertTriangle } from 'lucide-react';
import { API_URL } from '../../App';

const HRProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(null);

    useEffect(() => {
        const fetchHRProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found in localStorage');
                }
                const response = await axios.get(API_URL+'/api/hr/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch HR profile');
                setLoading(false);
            }
        };
        fetchHRProfile();
    }, []);

    const handleEdit = () => {
        setEditedProfile({ ...profile });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setUpdating(true);
            setError(null);
            setSuccess(false);
            const token = localStorage.getItem('token');
            const response = await axios.put(API_URL+'/api/hr/profile', editedProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
            setUpdating(false);
            setSuccess(true);
            setTimeout(() => {
                setIsEditing(false);
                setSuccess(false);
            }, 1500);
        } catch (err) {
            setError('Failed to update profile');
            setUpdating(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Loading Overlay
    if (loading) {
        return (
            <div className="fixed inset-0  bg-stone-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 ease-in-out">
                    <div className="animate-pulse">
                        <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping"></div>
                            <div className="relative z-10 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                                <Loader2 className="w-12 h-12 text-white animate-spin" />
                            </div>
                        </div>
                        <p className="text-amber-600 font-semibold text-lg">
                            Loading Profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-4 max-w-2xl mx-auto relative">
            <div className="bg-white rounded-lg ">
            <h1 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-amber-500 pb-3">HR Profile</h1>


                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 flex items-center">
                        <AlertTriangle className="mr-3 text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-colors"
                        >
                            <Edit size={24} />
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                disabled={updating}
                                className={`p-2 rounded-full transition-colors ${updating
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-emerald-600 hover:bg-emerald-50'
                                    }`}
                            >
                                <Save size={24} />
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={updating}
                                className={`p-2 rounded-full transition-colors ${updating
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-red-600 hover:bg-red-50'
                                    }`}
                            >
                                <X size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {!isEditing ? (
                    <div className="space-y-4">
                        <ProfileField label="Full Name" value={profile.username} />
                        <ProfileField label="Email" value={profile.email} />
                        <ProfileField label="Employee ID" value={profile.employeeId} />
                        <ProfileField label="Department" value={profile.department} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <EditField
                            label="Full Name"
                            name="username"
                            value={editedProfile.username}
                            onChange={handleInputChange}
                            disabled={updating}
                        />
                        <EditField
                            label="Email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleInputChange}
                            disabled={updating}
                        />
                        <EditField
                            label="Employee ID"
                            name="employeeId"
                            value={editedProfile.employeeId}
                            onChange={handleInputChange}
                            disabled={updating}
                        />
                        <EditField
                            label="Department"
                            name="department"
                            value={editedProfile.department}
                            onChange={handleInputChange}
                            disabled={updating}
                        />
                    </div>
                )}
            </div>

            {/* Updating Overlay */}
            {updating && (
                <div className="fixed inset-0 bg-emerald-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 ease-in-out">
                        <div className="animate-pulse">
                            <div className="w-24 h-24 mx-auto mb-4 relative">
                                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping"></div>
                                <div className="relative z-10 w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                            </div>
                            <p className="text-emerald-600 font-semibold text-lg">
                                Updating Profile...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Overlay */}
            {success && (
                <div className="fixed inset-0 bg-emerald-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 ease-in-out">
                        <div className="animate-bounce">
                            <div className="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                            <p className="text-green-600 font-semibold text-lg">
                                Profile Updated Successfully!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileField = ({ label, value }) => (
    <div className="flex justify-between border-b pb-2">
        <span className="text-stone-600">{label}</span>
        <span className="font-medium text-stone-800">{value || 'Not specified'}</span>
    </div>
);

const EditField = ({ label, name, value, onChange, disabled }) => (
    <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-2">{label}</label>
        <input
            type="text"
            name={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none ${disabled
                ? 'bg-gray-100 cursor-not-allowed'
                : 'focus:ring-2 focus:ring-emerald-500'
                } transition`}
        />
    </div>
);

export default HRProfile;
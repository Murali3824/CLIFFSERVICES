import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Loader2, UserCheck, Check } from 'lucide-react';
import { API_URL } from '../../App';

const HRProfilesManagement = () => {
    const [hrProfiles, setHRProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const fetchHRProfiles = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found. Please log in.');
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.get(API_URL + '/api/admin/hr-profiles', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setHRProfiles(response.data.hrProfiles);
                setError(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch HR profiles');
            console.error('Error fetching HR profiles:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHRProfile = async (userId) => {
        try {
            setDeleting(userId);
            const token = localStorage.getItem('token');

            const response = await axios.delete(API_URL + '/api/admin/delete/hr-profile', {
                headers: { 'Authorization': `Bearer ${token}` },
                data: { userId }
            });

            if (response.data.success) {
                setHRProfiles(hrProfiles.filter(profile => profile._id !== userId));
                setDeleteSuccess(true);
                setTimeout(() => setDeleteSuccess(false), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete HR profile');
            console.error('Delete error:', err.response?.data || err.message);
        } finally {
            setDeleting(null);
        }
    };

    useEffect(() => {
        fetchHRProfiles();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-stone-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white shadow-2xl rounded-xl p-8 text-center">
                    <div className="animate-pulse">
                        <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping"></div>
                            <div className="relative z-10 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                                <Loader2 className="w-12 h-12 text-white animate-spin" />
                            </div>
                        </div>
                        <p className="text-amber-600 font-semibold text-lg">
                            Loading HR profiles...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (deleting) {
        return (
            <div className="fixed inset-0 bg-stone-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white shadow-2xl rounded-xl p-8 text-center">
                    <div className="animate-pulse">
                        <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping"></div>
                            <div className="relative z-10 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
                                <Loader2 className="w-12 h-12 text-white animate-spin" />
                            </div>
                        </div>
                        <p className="text-red-600 font-semibold text-lg">
                            Deleting HR profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (deleteSuccess) {
        return (
            <div className="fixed inset-0 bg-stone-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white shadow-2xl rounded-xl p-8 text-center">
                    <div className="animate-bounce">
                        <div className="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-green-600 font-semibold text-lg">
                            HR Profile Deleted Successfully!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-4 rounded-lg">
            <div className='flex flex-col gap-3 md:flex-row items-start justify-between border-b-2 border-amber-500 pb-3 md:items-center'>
                <h1 className="text-3xl font-bold text-stone-800">HR Profiles Management</h1>
                <button
                    onClick={fetchHRProfiles}
                    disabled={loading}
                    className=" bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 animate-spin" size={16} />
                            Loading...
                        </>
                    ) : (
                        'Refresh Profiles'
                    )}
                </button>
            </div>
            {/* Error message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {hrProfiles.length === 0 ? (
                <div className="text-center text-stone-500">
                    No HR profiles found
                </div>
            ) : (
                <div className="space-y-4 mt-3">
                    {hrProfiles.map((profile) => (
                        <div
                            key={profile._id}
                            className="flex  flex-col md:flex-row items-start md:items-center justify-between p-4 border border-stone-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <UserCheck className="text-amber-600" size={24} />
                                <div>
                                    <p className="font-medium text-stone-800">{profile.username}</p>
                                    <p className="text-sm text-stone-500">{profile.email}</p>
                                    <div className="text-xs text-stone-400 mt-1">
                                        <span>Dept: {profile.department}</span>
                                        <span className="mx-3">Employee ID: {profile.employeeId}</span>
                                        <span className={profile.isVerified ? 'text-green-500' : 'text-yellow-500'}>
                                            {profile.isVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteHRProfile(profile._id)}
                                disabled={deleting === profile._id}
                                className={`
                                    flex items-center justify-center 
                                    w-24 py-2 rounded-lg 
                                    text-red-600 hover:bg-red-50 
                                    transition-colors
                                    ${deleting === profile._id ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {deleting === profile._id ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" size={16} />
                                        Deleting
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="mr-2" size={16} />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default HRProfilesManagement;
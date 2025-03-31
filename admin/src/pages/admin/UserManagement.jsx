import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Loader2, UserCircle, Check } from 'lucide-react';
import { API_URL } from '../../App';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    // Fetch all users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found. Please log in.');
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_URL}/api/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setUsers(response.data.users);
                setError(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
            console.error('Error fetching users:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a user
    const handleDeleteUser = async (userId) => {
        try {
            setDeleting(userId);
            const token = localStorage.getItem('token');

            const response = await axios.delete(`${API_URL}/api/admin/delete/user`, {
                headers: { 'Authorization': `Bearer ${token}` },
                data: { userId }
            });

            if (response.data.success) {
                setUsers(users.filter(user => user._id !== userId));
                setDeleteSuccess(true);
                setTimeout(() => setDeleteSuccess(false), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete user');
            console.error('Delete error:', err.response?.data || err.message);
        } finally {
            setDeleting(null);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) : 'N/A';
    };

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
                            Loading users...
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
                            Deleting user...
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
                            User Deleted Successfully!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-4 rounded-lg">
            <div className='flex flex-col gap-3 md:flex-row items-start justify-between border-b-2 border-amber-500 pb-3 md:items-center'>
                <h1 className="text-3xl font-bold text-stone-800">User Profile Management</h1>
                <button
                    onClick={fetchUsers}
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

            {users.length === 0 ? (
                <div className="text-center text-stone-500">
                    No users found
                </div>
            ) : (
                <div className="space-y-4 mt-3">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="flex  flex-col md:flex-row items-start md:items-center justify-between p-4 border border-stone-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <span className="text-amber-600 font-medium">
                                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : '?'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-stone-800">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-sm text-stone-500">{user.email}</p>
                                    <div className="text-xs text-stone-400 mt-1 flex flex-wrap gap-3">
                                        {user.PhoneNo && (
                                            <span>
                                                Phone: +{user.countryCode || ''} {user.PhoneNo}
                                            </span>
                                        )}
                                        {user.country && (
                                            <span>
                                                Country: {user.country}
                                            </span>
                                        )}
                                        <span className={user.isVerified ? 'text-green-500' : 'text-yellow-500'}>
                                            {user.isVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteUser(user._id)}
                                disabled={deleting === user._id}
                                className={`
                  flex items-center justify-center 
                  w-24 py-2 rounded-lg 
                  text-red-600 hover:bg-red-50 
                  transition-colors
                  ${deleting === user._id ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                            >
                                {deleting === user._id ? (
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

            <button
                onClick={fetchUsers}
                disabled={loading}
                className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 animate-spin" size={16} />
                        Loading...
                    </>
                ) : (
                    'Refresh Users'
                )}
            </button>
        </div>
    );
};

export default UserManagement;
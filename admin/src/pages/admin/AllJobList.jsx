import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Loader2, 
    Eye, 
    Trash2,  
    X, 
    Search, 
    Check,
    Filter,
    IndianRupee,
    MapPin,
    Briefcase 
} from 'lucide-react';
import JobDetailsModal from '../../components/JobDetailsModel';
import { API_URL } from '../../App';

const AllJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    // Enhanced filter states
    const [filters, setFilters] = useState({
        searchTerm: '',
        titleFilter: '',
        employmentTypeFilter: '',
        locationFilter: '',
        minSalary: '',
        postedByFilter: ''
    });

    // Unique categories for filtering
    const [filterOptions, setFilterOptions] = useState({
        titles: [],
        employmentTypes: [],
        locations: [],
        postedBy: [],
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL+'/api/jobs/list', {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });
                const fetchedJobs = response.data.jobs;
                // console.log(response.data.jobs);
                
                setJobs(fetchedJobs);
                setFilteredJobs(fetchedJobs);

                // Populate unique filter options
                setFilterOptions(prev => ({
                    ...prev,
                    titles: [...new Set(fetchedJobs.map(job => job.title))],
                    employmentTypes: [...new Set(fetchedJobs.map(job => job.employmentType))],
                    locations: [...new Set(fetchedJobs.map(job => job.location))],
                    postedBy: [...new Set(fetchedJobs.map(job => job.postedBy.username))]
                }));

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Enhanced Filter Logic
    useEffect(() => {
        let result = jobs;

        // Search filter (more comprehensive)
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            result = result.filter(job => 
                job.title.toLowerCase().includes(searchLower) ||
                job.overview.toLowerCase().includes(searchLower) ||
                job.location.toLowerCase().includes(searchLower) ||
                job.postedBy.username.toLowerCase().includes(searchLower)
            );
        }

        // Title filter
        if (filters.titleFilter) {
            result = result.filter(job => job.title === filters.titleFilter);
        }

        // Employment type filter
        if (filters.employmentTypeFilter) {
            result = result.filter(job => job.employmentType === filters.employmentTypeFilter);
        }

        // Location filter
        if (filters.locationFilter) {
            result = result.filter(job => job.location === filters.locationFilter);
        }

        // Posted By filter
        if (filters.postedByFilter) {
            result = result.filter(job => job.postedBy.username === filters.postedByFilter);
        }

        setFilteredJobs(result);
    }, [filters, jobs]);

    // Reset Filters
    const resetFilters = () => {
        setFilters({
            searchTerm: '',
            titleFilter: '',
            employmentTypeFilter: '',
            locationFilter: '',
            postedByFilter: ''
        });
    };

    const handleDeleteJob = async (jobId) => {
        try {
            setDeleting(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Unauthorized. Please log in.');
                setDeleting(false);
                return;
            }
    
            const response = await axios.delete(`${API_URL}/api/jobs/admin/delete/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Simulate a brief success state
            setTimeout(() => {
                // Check for successful deletion
                if (response.status === 200 || response.status === 204) {
                    // Update both jobs and filteredJobs
                    const updatedJobs = jobs.filter(job => job._id !== jobId);
                    setJobs(updatedJobs);
                    setFilteredJobs(updatedJobs);
                    
                    setDeleting(false);
                    setDeleteSuccess(true);
                    
                    // Reset success state after a short delay
                    setTimeout(() => {
                        setDeleteSuccess(false);
                    }, 2000);
                    
                    setError(null);
                } else {
                    setError(`Failed to delete job: Unexpected status ${response.status}`);
                    setDeleting(false);
                }
            }, 1500);
        } catch (err) {
            // More specific error handling
            if (err.response) {
                const { status, data } = err.response;
                if (status === 401) {
                    setError('Unauthorized: Invalid or expired token. Please log in again.');
                } else if (status === 403) {
                    setError('Forbidden: You do not have permission to delete this job.');
                } else if (status === 404) {
                    setError('Job not found.');
                } else {
                    setError(`Failed to delete job: ${data.message || 'Unknown error'}`);
                }
            } else {
                setError('Network error: Could not connect to the server.');
            }
            console.error('Error deleting job:', err);
            setDeleting(false);
        }
    };

    const handleViewJobDetails = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/jobs/details/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(response.data.job);
            
            setSelectedJob(response.data.job);
        } catch (err) {
            setError('Failed to fetch job details');
        }
    };

    // Loading/Deleting/Success State Component
    if (loading || deleting || deleteSuccess) {
        return (
            <div className="fixed inset-0 bg-stone-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 ease-in-out">
                    {loading && (
                        <div className="animate-pulse">
                            <div className="w-24 h-24 mx-auto mb-4 relative">
                                <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping"></div>
                                <div className="relative z-10 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                            </div>
                            <p className="text-amber-600 font-semibold text-lg">
                                Loading job listings...
                            </p>
                        </div>
                    )}
                    
                    {deleting && (
                        <div className="animate-pulse">
                            <div className="w-24 h-24 mx-auto mb-4 relative">
                                <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping"></div>
                                <div className="relative z-10 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                            </div>
                            <p className="text-amber-600 font-semibold text-lg">
                                Deleting job listing...
                            </p>
                        </div>
                    )}
                    
                    {deleteSuccess && (
                        <div className="animate-bounce">
                            <div className="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                            <p className="text-green-600 font-semibold text-lg">
                                Job Deleted Successfully!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="container mx-auto p-2 sm:p-4 min-h-screen">
            {selectedJob && (
                <JobDetailsModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}

            {/* Enhanced Filtering Section */}
            <div className="mb-6 rounded-lg ">
                <h2 className="text-xl font-semibold text-stone-800 border-b-2 pb-2 border-amber-500 mb-4 flex items-center">
                    <Filter className="mr-2 text-emerald-600" /> Advanced Job Filters
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search jobs..."
                            value={filters.searchTerm}
                            onChange={(e) => setFilters(prev => ({...prev, searchTerm: e.target.value}))}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <Search className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    {/* Job Title Filter */}
                    <select 
                        value={filters.titleFilter} 
                        onChange={(e) => setFilters(prev => ({...prev, titleFilter: e.target.value}))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">All Job Titles</option>
                        {filterOptions.titles.map(title => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>

                    {/* Employment Type Filter */}
                    <select 
                        value={filters.employmentTypeFilter} 
                        onChange={(e) => setFilters(prev => ({...prev, employmentTypeFilter: e.target.value}))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">All Employment Types</option>
                        {filterOptions.employmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    {/* Location Filter */}
                    <select 
                        value={filters.locationFilter} 
                        onChange={(e) => setFilters(prev => ({...prev, locationFilter: e.target.value}))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">All Locations</option>
                        {filterOptions.locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>

                    {/* Posted By Filter */}
                    <select 
                        value={filters.postedByFilter} 
                        onChange={(e) => setFilters(prev => ({...prev, postedByFilter: e.target.value}))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">All Recruiters</option>
                        {filterOptions.postedBy.map(recruiter => (
                            <option key={recruiter} value={recruiter}>{recruiter}</option>
                        ))}
                    </select>
                </div>

                {/* Reset Filters Button */}
                {Object.values(filters).some(filter => filter !== '') && (
                    <div className="mt-4 text-right">
                        <button 
                            onClick={resetFilters}
                            className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
                        >
                            <X className="mr-2" /> Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Job Listings Header */}
            <h1 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-amber-500 pb-3">
                Job Listings 
                {filteredJobs.length !== jobs.length && 
                    <span className="text-sm text-stone-500 ml-2">
                        ({filteredJobs.length} of {jobs.length} jobs)
                    </span>
                }
            </h1>

            {filteredJobs.length === 0 ? (
                <div className="text-center text-stone-500 bg-white shadow-md rounded-lg p-10">
                    <p className="text-xl">No jobs found matching your filters</p>
                    <button 
                        onClick={resetFilters} 
                        className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-stone-800">{job.title}</h2>
                                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs">
                                    {job.category}
                                </span>
                            </div>
                            <p className="text-stone-600 mb-4 line-clamp-3">{job.overview}</p>
                            
                            {/* Enhanced Job Details */}
                            <div className="space-y-2 mb-4 text-stone-700">
                                <div className="flex items-center">
                                    <Briefcase className="mr-2 text-emerald-600 w-5 h-5" />
                                    <span>{job.employmentType}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 text-emerald-600 w-5 h-5" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <IndianRupee className="mr-2 text-emerald-600 w-5 h-5" />
                                    <span>{job.salaryRange}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleViewJobDetails(job._id)}
                                    className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                                >
                                    <Eye className="mr-2" /> View Details
                                </button>
                                <button
                                    onClick={() => handleDeleteJob(job._id)}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllJobList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Loader2, 
  Eye, 
  Trash2, 
  Edit,
  Check,
  AlertTriangle
} from 'lucide-react';
import JobDetailsModal from '../../components/JobDetailsModel';
import { API_URL } from '../../App';

const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(API_URL+'/api/jobs/hr', {
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {}
        });
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      setDeleting(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found, please log in');
      
      await axios.delete(`${API_URL}/api/jobs/delete/${jobId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Simulate a brief success state
      setTimeout(() => {
        setJobs(jobs.filter(job => job._id !== jobId));
        setDeleting(false);
        setDeleteSuccess(true);
        
        // Reset success state after a short delay
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 2000);
      }, 1500);
      
      setError(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error('Delete Job Error:', err.response?.data || err);
      setError(`Failed to delete job: ${errorMsg}`);
      setDeleting(false);
    }
  };

  const handleUpdateJob = async (job) => {
    try {
        setUpdating(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found, please log in');

        // Clean the job data to only send updateable fields
        const updateData = {
            title: job.title,
            overview: job.overview,
            responsibilities: job.responsibilities,
            qualifications: job.qualifications,
            location: job.location,
            employmentType: job.employmentType,
            salaryRange: job.salaryRange
        };

        const response = await axios.put(
            `${API_URL}/api/jobs/update/${job._id}`,
            updateData,
            {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        setJobs(prevJobs => 
            prevJobs.map(j => j._id === job._id ? response.data.job : j)
        );
        
        setUpdateSuccess(true);
        setTimeout(() => {
            setUpdateSuccess(false);
            setUpdating(false);
        }, 2000);

    } catch (err) {
        // Improved error logging
        console.error('Full error:', err);
        const errorMsg = err.response?.data?.message || err.message;
        setError(`Failed to update job: ${errorMsg}`);
        setUpdating(false);
    }
};

  const navigateToEditJob = (job) => {
    // Navigate to AddJob component with job data for editing
    navigate('/hr/addjobs', { state: { jobToEdit: job } });
  };

  const handleViewJobDetails = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/jobs/details/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSelectedJob(response.data.job);
    } catch (err) {
      setError('Failed to fetch job details');
    }
  };

  // Loading and success states
  if (loading || deleting || updating || deleteSuccess || updateSuccess) {
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
          
          {updating && (
            <div className="animate-pulse">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping"></div>
                <div className="relative z-10 w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              </div>
              <p className="text-emerald-600 font-semibold text-lg">
                Updating job listing...
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

          {updateSuccess && (
            <div className="animate-bounce">
              <div className="w-24 h-24 mx-auto mb-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-white" />
              </div>
              <p className="text-emerald-600 font-semibold text-lg">
                Job Updated Successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md">
          <div className="mb-4 flex justify-center">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-stone-700 mb-6">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 min-h-screen">
      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

      <h1 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-amber-500 pb-3">Job Listings</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-stone-500">No jobs found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div 
              key={job._id} 
              className="bg-white shadow-lg rounded-2xl p-4  hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500"
            >
              <h2 className="text-xl font-semibold mb-2 text-stone-800">{job.title}</h2>
              <p className="text-stone-600 mb-4 line-clamp-3">{job.overview}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleViewJobDetails(job._id)}
                    className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    <Eye className="mr-2" />
                  </button>
                  <button 
                    onClick={() => navigateToEditJob(job)}
                    className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    <Edit className="mr-2" /> 
                  </button>
                </div>
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

export default JobList;
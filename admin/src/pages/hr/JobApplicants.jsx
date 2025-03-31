// src/components/JobApplicants.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Loader2,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { API_URL } from '../../App';

const JobApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedApplication, setExpandedApplication] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch HR's jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL + '/api/jobs/hr', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data.jobs);
      } catch (err) {
        setError('Failed to fetch jobs');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, navigate]);

  // Fetch applications for selected job
  const fetchApplications = async (jobId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/applications/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data.applications);
      setSelectedJob(jobId);
    } catch (err) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  // Update application status
  const updateStatus = async (applicationId, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/applications/status/${applicationId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(applications.map(app =>
        app._id === applicationId ? response.data.application : app
      ));
    } catch (err) {
      setError('Failed to update status');
    }
  };

  // Download resume
  // Download resume function for both components
const downloadResume = async (applicationId) => {
  try {
    setLoading(true); // Add this if you have a loading state
    
    console.log(`Downloading resume for application ${applicationId}`);
    
    const response = await axios.get(
      `${API_URL}/api/applications/resume/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      }
    );
    
    // Check if response has data
    if (response.data.size === 0) {
      throw new Error('Empty file received');
    }
    
    const contentType = response.headers['content-type'];
    // console.log(`File content type: ${contentType}`);
    
    const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume-${applicationId}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    link.remove();
    
    // console.log('Download completed successfully');
  } catch (err) {
    console.error('Download error:', err);
    setError(`Failed to download resume: ${err.message}`);
    
    // If there's a response with error details, log it
    if (err.response?.data) {
      console.error('Server error details:', err.response.data);
    }
  } finally {
    setLoading(false); // Add this if you have a loading state
  }
};

  if (loading) {
    return (
      <div className="fixed inset-0 bg-stone-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 ease-in-out">

          <div className="animate-pulse">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping"></div>
              <div className="relative z-10 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </div>
            </div>
            <p className="text-amber-600 font-semibold text-lg">
              Loading Job Applicants...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <h1 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-amber-500 pb-3">Job Applicants</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Job Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-stone-600 mb-2">
          Select Job
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={(e) => fetchApplications(e.target.value)}
          value={selectedJob || ''}
        >
          <option value="">Select a job</option>
          {jobs.map(job => (
            <option key={job._id} value={job._id}>
              {job.title} ({job.employmentType})
            </option>
          ))}
        </select>
      </div>

      {/* Applications List */}
      {selectedJob && applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app._id} className="border rounded-lg p-4 bg-white">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedApplication(
                  expandedApplication === app._id ? null : app._id
                )}
              >
                <div>
                  <h3 className="font-medium text-stone-800">
                    {app.firstName} {app.lastName}
                  </h3>
                  <p className="text-sm text-stone-500">{app.email}</p>
                </div>
                {expandedApplication === app._id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>

              {expandedApplication === app._id && (
                <div className="mt-4">
                  <p><strong>Phone:</strong> {app.phone}</p>
                  <p><strong>Visa Status:</strong> {app.visaStatus}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                  {app.coverLetter && (
                    <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                  )}
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => downloadResume(app._id)}
                      className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download Resume
                    </button>
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      className="p-2 border rounded-lg"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : selectedJob ? (
        <p className="text-stone-500">No applications found for this job.</p>
      ) : null}
    </div>
  );
};

export default JobApplicants;
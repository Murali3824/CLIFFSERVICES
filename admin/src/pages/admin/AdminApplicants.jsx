import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../App';
import { 
  Loader2, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Trash2
} from 'lucide-react';

const AdminApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedApplication, setExpandedApplication] = useState(null);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL + '/api/applications/admin/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(response.data.applications);
      } catch (err) {
        setError('Failed to fetch applications');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token, navigate]);

  const downloadResume = async (applicationId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/applications/resume/${applicationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );
      
      if (response.data.size === 0) {
        throw new Error('Empty file received');
      }
      
      const contentType = response.headers['content-type'];
      const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${applicationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      console.error('Download error:', err);
      setError(`Failed to download resume: ${err.message}`);
    } finally {
      setLoading(false);
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
              Loading Applicants...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <h1 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-amber-500 pb-3">All Job Applications</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Applications List */}
      {applications.length > 0 ? (
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
                  <p className="text-sm text-stone-500">
                    Applied for: {app.job ? `${app.job.title} (${app.job.employmentType})` : 'Job Deleted'}
                  </p>
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
                  <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
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
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-stone-500">No applications found.</p>
      )}
    </div>
  );
};

export default AdminApplicants;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Check, AlertTriangle } from 'lucide-react';
import { API_URL } from '../../App';

const AddJob = () => {
  const location = useLocation();
  const jobToEdit = location.state?.jobToEdit;

  const [jobData, setJobData] = useState({
    title: '',
    overview: '',
    shortdescription: '',
    responsibilities: [''],
    qualifications: [''],
    location: '',
    employmentType: 'Full-time',
    salaryRange: 'Negotiable'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Populate form with job data if editing
  useEffect(() => {
    if (jobToEdit) {
      setJobData({
        title: jobToEdit.title || '',
        overview: jobToEdit.overview || '',
        shortdescription: jobToEdit.shortdescription || '',
        responsibilities: jobToEdit.responsibilities || [''],
        qualifications: jobToEdit.qualifications || [''],
        location: jobToEdit.location || '',
        employmentType: jobToEdit.employmentType || 'Full-time',
        salaryRange: jobToEdit.salaryRange || 'Negotiable'
      });
    }
  }, [jobToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const newArray = [...jobData[field]];
    newArray[index] = e.target.value;
    setJobData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayField = (field) => {
    setJobData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    const newArray = jobData[field].filter((_, i) => i !== index);
    setJobData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const url = jobToEdit
        ? `${API_URL}/api/jobs/update/${jobToEdit._id}`
        : API_URL + '/api/jobs/add';

      const method = jobToEdit ? axios.put : axios.post;

      await method(url, jobData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/hr/joblist');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit job';
      setError(errorMessage);
      console.error('Job submission error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || success) {
    return (
      <div className="fixed inset-0 bg-emerald-50/90 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all duration-300 ease-in-out">
          {loading && (
            <div className="animate-pulse">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping"></div>
                <div className="relative z-10 w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              </div>
              <p className="text-emerald-600 font-semibold text-lg">
                {jobToEdit ? 'Updating Job Listing...' : 'Processing your job listing...'}
              </p>
            </div>
          )}

          {success && (
            <div className="animate-bounce">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-white" />
              </div>
              <p className="text-green-600 font-semibold text-lg">
                {jobToEdit ? 'Job Updated Successfully!' : 'Job Listed Successfully!'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-2 sm:p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-stone-800 border-b-2 border-amber-500 pb-3">
          {jobToEdit ? 'Edit Job Listing' : 'Create New Job Listing'}
        </h1>


        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 flex items-center">
            <AlertTriangle className="mr-3 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
            <textarea
              name="shortdescription"
              value={jobData.shortdescription}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              rows="2"
              placeholder="Provide a short description of the job..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Overview</label>
            <textarea
              name="overview"
              value={jobData.overview}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              rows="4"
              placeholder="Provide a brief description of the job..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Employment Type</label>
            <select
              name="employmentType"
              value={jobData.employmentType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Salary Range</label>
            <input
              type="text"
              name="salaryRange"
              value={jobData.salaryRange}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="e.g., $50,000 - $75,000"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Responsibilities</label>
            {jobData.responsibilities.map((resp, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange(e, 'responsibilities', index)}
                  className="flex-grow px-4 py-3 border-2 border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  placeholder="Enter a responsibility"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('responsibilities', index)}
                    className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('responsibilities')}
              className="bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition"
            >
              Add Responsibility
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Qualifications</label>
            {jobData.qualifications.map((qual, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={qual}
                  onChange={(e) => handleArrayChange(e, 'qualifications', index)}
                  className="flex-grow px-4 py-3 border-2 border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  placeholder="Enter a qualification"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('qualifications', index)}
                    className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('qualifications')}
              className="bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition"
            >
              Add Qualification
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-4 rounded-lg hover:bg-emerald-600 transition-colors font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {jobToEdit ? 'Update Job Listing' : 'Create Job Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
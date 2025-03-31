import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { BarChart, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import {
  Users, Briefcase, FileText, CheckCircle,
  X, User, LogOut, Download,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../App';
import JobDetailsModal from '../../components/JobDetailsModel';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalHR: 0,
    totalJobs: 0,
    totalApplications: 0,
    applicationStatus: {},
    jobsByDepartment: {},
    applicationTrend: [],
    recentApplications: [],
    activeJobs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // State to store job details for display

  // const API_URL = 'http://localhost:4000/api';
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const [
          hrResponse,
          jobsResponse,
          applicationsResponse,
          usersResponse
        ] = await Promise.all([
          axios.get(`${API_URL}/api/admin/hr-profiles`, config),
          axios.get(`${API_URL}/api/jobs/list`, config),
          axios.get(`${API_URL}/api/applications/admin/all`, config),
          axios.get(`${API_URL}/api/admin/users`, config)
        ]);

        const hrData = hrResponse.data.hrProfiles;
        const totalHR = hrData.length;

        const hrDepartmentMap = hrData.reduce((acc, hr) => {
          acc[hr._id] = hr.department || 'Unspecified';
          return acc;
        }, {});

        const jobsData = jobsResponse.data.jobs;
        const totalJobs = jobsData.length;
        const jobsByDepartment = jobsData.reduce((acc, job) => {
          const dept = hrDepartmentMap[job.postedBy._id] || 'Unspecified';
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {});

        const validApplicationsData = applicationsResponse.data.applications.filter(app => app.job != null);
        const totalApplications = validApplicationsData.length;

        const applicationStatus = validApplicationsData.reduce((acc, app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        }, {});

        const applicationTrend = [];
        const currentDate = new Date();
        for (let i = 4; i >= 0; i--) {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() - i);
          const monthName = date.toLocaleString('default', { month: 'short' });
          const count = validApplicationsData.filter(app => {
            const appDate = new Date(app.appliedAt);
            return appDate.getMonth() === date.getMonth() &&
              appDate.getFullYear() === date.getFullYear();
          }).length;
          applicationTrend.push({ month: monthName, applications: count });
        }

        const recentApplications = validApplicationsData
          .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
          .slice(0, 5)
          .map(app => ({
            id: app._id,
            name: `${app.firstName} ${app.lastName}`,
            position: app.job && app.job.title ? app.job.title : 'Job Deleted',
            date: new Date(app.appliedAt).toLocaleDateString(),
            status: app.status
          }));

        const activeJobs = jobsData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map(job => ({
            id: job._id,
            title: job.title,
            department: hrDepartmentMap[job.postedBy._id] || 'Unspecified',
            applications: validApplicationsData.filter(app =>
              app.job && app.job._id && app.job._id.toString() === job._id.toString()
            ).length,
            posted: new Date(job.createdAt).toLocaleDateString(),
            details: job // Store full job details for display
          }));

        setStats({
          totalHR,
          totalJobs,
          totalApplications,
          applicationStatus,
          jobsByDepartment,
          applicationTrend,
          recentApplications,
          activeJobs
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    } else {
      setError('Please login to view dashboard');
      setLoading(false);
    }
  }, [token]);

  const statusData = Object.entries(stats.applicationStatus).map(([name, value]) => ({ name, value }));
  const departmentData = Object.entries(stats.jobsByDepartment).map(([name, value]) => ({ name, value }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Under Review': return 'bg-purple-100 text-purple-800';
      case 'Shortlisted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Hired': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadResumes = async (jobId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const applicationsResponse = await axios.get(`${API_URL}/api/applications/admin/all`, config);
      const jobApplications = applicationsResponse.data.applications.filter(app =>
        app.job && app.job._id && app.job._id.toString() === jobId.toString()
      );

      if (jobApplications.length === 0) {
        alert('No applications found for this job');
        return;
      }

      for (const app of jobApplications) {
        try {
          const resumeResponse = await axios.get(
            `${API_URL}/applications/resume/${app._id}`,
            {
              ...config,
              responseType: 'blob'
            }
          );

          const url = window.URL.createObjectURL(new Blob([resumeResponse.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `resume-${app.firstName}-${app.lastName}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (downloadError) {
          console.error(`Error downloading resume for application ${app._id}:`, downloadError);
        }
      }
    } catch (err) {
      console.error('Error downloading resumes:', err);
      alert('Failed to download resumes');
    }
  };

  const handleViewJobDetails = (job) => {
    // console.log(job);

    setSelectedJob(job.details); // Set the selected job details for display
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`${API_URL}/api/jobs/admin/delete/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update the activeJobs list by filtering out the deleted job
      setStats(prevStats => ({
        ...prevStats,
        totalJobs: prevStats.totalJobs - 1,
        activeJobs: prevStats.activeJobs.filter(job => job.id !== jobId)
      }));
      alert('Job deleted successfully');
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete job');
    }
  };

  const handleViewAllApplications = () => {
    navigate('/admin/applications'); // Navigate to /admin/applications
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
              Loading Dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen">
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
      <main className="flex-1 overflow-y-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center mr-4">
              <User size={24} className="text-rose-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total HR Staff</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalHR}</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mr-4">
              <Briefcase size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Jobs</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalJobs}</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
              <FileText size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Applications</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalApplications}</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Hired Candidates</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.applicationStatus.Hired || 0}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Application Trend</h3>
            <div className="h-64">
              <LineChart width={400} height={240} data={stats.applicationTrend}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#ff6b6b"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  fill="url(#colorUv)"
                />

              </LineChart>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
            <div className="flex h-64">
              <div className="w-1/2">
                <PieChart width={200} height={240}>
                  <defs>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorShortlisted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => {
                      const colors = ['url(#colorPending)', 'url(#colorReview)', 'url(#colorShortlisted)', 'url(#colorRejected)', 'url(#colorHired)'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                </PieChart>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-2 ${item.name === 'Pending' ? 'bg-amber-400' :
                      item.name === 'Under Review' ? 'bg-purple-400' :
                        item.name === 'Shortlisted' ? 'bg-green-400' :
                          item.name === 'Rejected' ? 'bg-red-400' :
                            'bg-emerald-500'
                      }`}></div>
                    <span className="text-sm text-gray-700">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jobs by Department</h3>
            <div className="space-y-4">
              {departmentData.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm font-medium text-gray-800">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-rose-500 h-2 rounded-full"
                      style={{ width: `${(item.value / Math.max(...departmentData.map(d => d.value), 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Applications</h3>
              <button
                onClick={handleViewAllApplications}
                className="text-sm text-rose-600 hover:text-rose-700 font-medium"
              >
                View All
              </button>            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.recentApplications.map((app) => (
                    <tr key={app.id}>
                      <td className="py-4 text-sm font-medium text-gray-900">{app.name}</td>
                      <td className="py-4 text-sm text-gray-500">{app.position}</td>
                      <td className="py-4 text-sm text-gray-500">{app.date}</td>
                      <td className="py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Active Job Listings</h3>
            <button className="text-sm bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium">Add New Job</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.activeJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{job.department}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{job.applications}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{job.posted}</td>
                    <td className="py-4 px-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                          onClick={() => handleDownloadResumes(job.id)}
                          title="Download Resumes"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="p-1 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                          onClick={() => handleViewJobDetails(job)}
                          title="View Job Details"
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          className="p-1 rounded text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteJob(job.id)}
                          title="Delete Job"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
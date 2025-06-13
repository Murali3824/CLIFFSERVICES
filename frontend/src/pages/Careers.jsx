import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';

const JobDescriptionPanel = ({ job, isOpen, onClose }) => (
    <div
        className={`fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
    >
        <div
            className={`bg-white w-full h-full max-w-4xl max-h-full rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ${isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="flex flex-col h-full">
                <div className="p-8 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-bold text-gray-800">{job?.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">×</button>
                </div>
                <div className="p-8 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Overview</h3>
                            <p className="text-gray-600">{job?.overview}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Short Description</h3>
                            <p className="text-gray-600">{job?.shortdescription}</p>
                        </div>
                        <div className='md:col-span-2'>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Responsibilities</h3>
                            <ul className="space-y-2 text-gray-600">
                                {job?.responsibilities.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-gray-500 mr-2">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Qualifications</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                                {job?.qualifications.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-gray-500 mr-2">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t">
                    <button
                        onClick={onClose}
                        className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const ApplyNowPanel = ({ job, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        visaStatus: '',
        resume: null,
        coverLetter: ''
    });
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!job) return;

        setSubmitStatus({ loading: true, success: false, error: null });

        try {
            // Create FormData object for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('visaStatus', formData.visaStatus);
            formDataToSend.append('coverLetter', formData.coverLetter);
            formDataToSend.append('jobId', job._id);

            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            }

            const response = await fetch(`${API_URL}/api/applications/submit`, {
                method: 'POST',
                body: formDataToSend,
                // Don't set Content-Type header when sending FormData
            });

            const data = await response.json();
            // console.log(response);

            if (response.ok) {
                setSubmitStatus({ loading: false, success: true, error: null });
                // Reset form after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    visaStatus: '',
                    resume: null,
                    coverLetter: ''
                });

                // Close the panel after a short delay to show success message
                setTimeout(() => {
                    onClose();
                    setSubmitStatus({ loading: false, success: false, error: null });
                }, 2000);
            } else {
                setSubmitStatus({ loading: false, success: false, error: data.message || 'Application submission failed' });
            }
        } catch (error) {
            setSubmitStatus({ loading: false, success: false, error: 'Failed to submit application. Please try again.' });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reset status when closing
    useEffect(() => {
        if (!isOpen) {
            setSubmitStatus({ loading: false, success: false, error: null });
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div
                className={`bg-white w-full h-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all duration-500 ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 overflow-y-auto hidden md:block">
                    <h2 className="text-2xl font-bold mb-4">About Us</h2>
                    <p className="text-gray-200 mb-6">
                        We are a forward-thinking company dedicated to innovation and excellence. Join us to make an impact!
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Our Mission</h3>
                            <p>Empowering people to solve real-world challenges through technology.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Our Values</h3>
                            <ul className="space-y-2">
                                <li>Integrity</li>
                                <li>Collaboration</li>
                                <li>Innovation</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Why Join Us?</h3>
                            <ul className="space-y-2">
                                <li>Work with cutting-edge technology</li>
                                <li>Supportive and inclusive culture</li>
                                <li>Opportunities for growth</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {job ? `Apply for ${job.title}` : 'Apply Now'}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">×</button>
                    </div>

                    {submitStatus.success ? (
                        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                            <p className="font-semibold">Application submitted successfully!</p>
                            <p>Thank you for your interest. We'll be in touch soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                            {submitStatus.error && (
                                <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
                                    <p>{submitStatus.error}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Visa Status</label>
                                <select
                                    name="visaStatus"
                                    value={formData.visaStatus}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option>US Citizen</option>
                                    <option>Permanent Resident</option>
                                    <option>H1B</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Resume/CV</label>
                                <input
                                    type="file"
                                    name="resume"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cover Letter (Optional)</label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="flex gap-4 justify-end mt-auto">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                    disabled={submitStatus.loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors ${submitStatus.loading ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                    disabled={submitStatus.loading}
                                >
                                    {submitStatus.loading ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// Employment Type Badge Component
const EmploymentTypeBadge = ({ type }) => {
    const badgeColors = {
        'Full-time': 'bg-green-100 text-green-800',
        'Part-time': 'bg-blue-100 text-blue-800',
        'Contract': 'bg-yellow-100 text-yellow-800',
        'Freelance': 'bg-purple-100 text-purple-800',
        'Internship': 'bg-pink-100 text-pink-800'
    };

    return (
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[type] || 'bg-gray-100 text-gray-800'}`}>
            {type}
        </div>
    );
};

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);


    // Fetch jobs from backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/api/jobs/list`);
                const data = await response.json();
                if (data.success) {
                    setJobs(data.jobs);
                    // console.log(data.jobs);
                    } else {
                    setError(data.message || 'Failed to fetch job listings');
                }
            } catch (err) {
                setError('Failed to fetch job listings');
                console.error('Error fetching jobs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const openDescription = (job) => {
        setSelectedJob(job);
        setIsDescriptionOpen(true);
    };

    const closeDescription = () => {
        setIsDescriptionOpen(false);
        setTimeout(() => setSelectedJob(null), 500);
    };

    const openApply = (job) => {
        setSelectedJob(job);
        setIsApplyOpen(true);
    };

    const closeApply = () => {
        setIsApplyOpen(false);
        setTimeout(() => setSelectedJob(null), 500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="relative bg-gray-900 text-white py-20 pt-32 px-6">
                <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1600x900?tech')] opacity-10"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Join Our Innovation Journey</h1>
                    <p className="text-xl text-gray-300">Build the future with a team that values creativity and impact.</p>
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-6 py-12 pt-20">
                {loading ? (
                    <p className="text-center text-gray-600">Loading job listings...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : jobs.length === 0 ? (
                    <p className="text-center text-gray-600">No job listings available at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-gray-700 relative"
                            >
                                {/* Employment Type Badge */}
                                <EmploymentTypeBadge type={job.employmentType} />

                                <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">{job.salaryRange}</p>
                                <p className="text-gray-600 text-sm mb-2">📍 {job.location}</p>
                                <p className="text-gray-700 mb-6 line-clamp-2">{job.overview}</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => openApply(job)}
                                        className="flex-1 bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition-colors"
                                    >
                                        Apply Now
                                    </button>
                                    <button
                                        onClick={() => openDescription(job)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-full hover:bg-gray-300 transition-colors"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr className='mt-32' />
            <section className="text-black py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-lg text-gray-900 mb-6">Reach out to explore opportunities with us.</p>
                <Link to="/#contact">
                    <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors">
                        Contact Us
                    </button>
                </Link>
            </section>

            <JobDescriptionPanel job={selectedJob} isOpen={isDescriptionOpen} onClose={closeDescription} />
            <ApplyNowPanel job={selectedJob} isOpen={isApplyOpen} onClose={closeApply} />
        </div>
    );
};

export default Careers;
import Application from '../models/applicationModel.js';
import Job from '../models/jobModel.js';
import fs from 'fs';

// Submit a job application
export const submitApplication = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, visaStatus, coverLetter, jobId } = req.body;
        
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found" 
            });
        }
        
        // Check if resume file was uploaded
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Resume file is required" 
            });
        }

        // Check if applicant has already applied for this job
        const existingApplication = await Application.findOne({ 
            email: email, 
            job: jobId 
        });
        
        if (existingApplication) {
            // Delete the uploaded file to avoid clutter
            fs.unlinkSync(req.file.path);
            
            return res.status(400).json({ 
                success: false, 
                message: "You have already applied for this job" 
            });
        }
        
        // Create new application
        const newApplication = new Application({
            firstName,
            lastName,
            email,
            phone,
            visaStatus,
            resume: req.file.path, // Store path to resume file
            coverLetter,
            job: jobId
        });
        
        await newApplication.save();
        
        res.status(201).json({ 
            success: true, 
            message: "Application submitted successfully",
            application: {
                id: newApplication._id,
                name: `${firstName} ${lastName}`,
                email,
                appliedAt: newApplication.appliedAt
            }
        });
        
    } catch (error) {
        console.error('Application submission error:', error);
        
        // Clean up file if there was an error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ 
            success: false, 
            message: "Failed to submit application",
            error: error.message 
        });
    }
};

// Get all applications (for admin)
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('job', 'title employmentType salaryRange')
            .sort({ createdAt: -1 });
            
        res.status(200).json({ 
            success: true, 
            applications 
        });
        
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch applications",
            error: error.message 
        });
    }
};

// Get applications for a specific job (HR only, if they posted the job)
export const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found" 
            });
        }
        
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to view these applications" 
            });
        }
        
        const applications = await Application.find({ job: jobId })
            .populate('job', 'title employmentType salaryRange') // Populate job details
            .sort({ appliedAt: -1 });
            
        res.status(200).json({ 
            success: true, 
            count: applications.length,
            applications 
        });
        
    } catch (error) {
        console.error('Get job applications error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch applications",
            error: error.message 
        });
    }
};

// Get application details
export const getApplicationDetails = async (req, res) => {
    try {
        const { applicationId } = req.params;
        
        const application = await Application.findById(applicationId)
            .populate('job', 'title employmentType location salaryRange postedBy');
            
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found" 
            });
        }
        
        // Check if the HR requesting is the one who posted the job
        const job = await Job.findById(application.job._id);
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to view this application" 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            application 
        });
        
    } catch (error) {
        console.error('Get application details error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch application details",
            error: error.message 
        });
    }
};

// Update application status (HR only)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        
        // Validate status
        const validStatuses = ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status provided"
            });
        }
        
        // Get application
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found" 
            });
        }
        
        // Verify HR permission
        const job = await Job.findById(application.job);
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to update this application" 
            });
        }
        
        // Update status
        application.status = status;
        await application.save();
        
        res.status(200).json({ 
            success: true, 
            message: "Application status updated successfully",
            application
        });
        
    } catch (error) {
        console.error('Update application status error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update application status",
            error: error.message 
        });
    }
};

// Get resume file
export const getResume = async (req, res) => {
    try {
        const { applicationId } = req.params;
        
        // Validate applicationId
        if (!applicationId) {
            return res.status(400).json({ 
                success: false, 
                message: "Application ID is required" 
            });
        }
        
        // Find the application
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found" 
            });
        }
        
        // Check if the resume path exists
        const resumePath = application.resume;
        if (!resumePath) {
            return res.status(404).json({ 
                success: false, 
                message: "Resume path not found in application data" 
            });
        }
        
        // Check if file exists
        if (!fs.existsSync(resumePath)) {
            return res.status(404).json({ 
                success: false, 
                message: `Resume file not found at path: ${resumePath}` 
            });
        }
        
        // Log before sending the file
        console.log(`Sending resume file from path: ${resumePath}`);
        
        // Send the file
        return res.download(resumePath, `resume-${applicationId}.pdf`, (err) => {
            if (err) {
                console.error('Error during file download:', err);
                // If headers are not sent yet, send error response
                if (!res.headersSent) {
                    return res.status(500).json({
                        success: false,
                        message: "Error downloading file",
                        error: err.message
                    });
                }
            }
        });
        
    } catch (error) {
        console.error('Get resume error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve resume",
            error: error.message 
        });
    }
};
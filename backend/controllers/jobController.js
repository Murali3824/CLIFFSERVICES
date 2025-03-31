import Job from "../models/jobModel.js";
// import hrAuth from "../middleware/hrAuth.js"; // Middleware to authenticate HR users

// Add a new job (HR Only)
export const addJob = async (req, res) => {
    try {
        const { 
            title, 
            overview, 
            shortdescription,
            responsibilities, 
            qualifications, 
            location = "Not specified",
            employmentType = "Full-time",
            salaryRange = "Negotiable"
        } = req.body;

        // Validate required fields
        if (!title || !overview || !responsibilities || !qualifications) {
            return res.status(400).json({ 
                success: false, 
                message: "Title, overview, responsibilities, and qualifications are required" 
            });
        }

        const userId = req.user.id; // Ensure this comes from your authentication middleware

        const newJob = new Job({
            title,
            overview,
            shortdescription,
            responsibilities,
            qualifications,
            location,
            employmentType,
            salaryRange,
            postedBy: userId
        });

        await newJob.save();

        res.status(201).json({ 
            success: true, 
            message: "Job added successfully", 
            job: newJob 
        });
    } catch (error) {
        console.error('Job creation error:', error); // Log full error for server-side debugging
        res.status(500).json({ 
            success: false, 
            message: "Failed to create job",
            error: error.message 
        });
    }
};

// Get all jobs (Anyone can view)
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "username email"); // Populate HR details
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get jobs by HR ID (HR can view their own jobs)
export const getJobsByHR = async (req, res) => {
    try {
        const userId = req.user.id; // Retrieved from hrAuth middleware
        const jobs = await Job.find({ postedBy: userId }).populate("postedBy", "username email");;

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("postedBy", "username email");

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a job by HR (Only the HR who posted it can delete it)
export const deleteJob = async (req, res) => {
    try {
        const userId = req.user.id; // Retrieved from hrAuth middleware
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (job.postedBy.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this job" });
        }

        await job.deleteOne();
        res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a job (Only by the HR who posted it)
export const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found" 
            });
        }

        if (job.postedBy.toString() !== userId) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to update this job" 
            });
        }

        // Only update provided fields
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { $set: updateData },
            { 
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({ 
            success: true, 
            message: "Job updated successfully", 
            job: updatedJob 
        });

    } catch (error) {
        console.error('Job update error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update job",
            error: error.message
        });
    }
};

export const adminDeleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found" 
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        res.status(200).json({ 
            success: true, 
            message: "Job deleted successfully by admin" 
        });

    } catch (error) {
        console.error('Admin job deletion error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to delete job",
            error: error.message
        });
    }
};




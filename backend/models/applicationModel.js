import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true 
    },
    phone: { 
        type: String, 
        required: true, 
        trim: true 
    },
    visaStatus: { 
        type: String, 
        required: true, 
        trim: true 
    },
    resume: {
        type: String,  // Store the path or URL to the resume file
        required: true
    },
    coverLetter: {
        type: String,
        required: false,
        trim: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'],
        default: 'Pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Index for efficient querying by job
applicationSchema.index({ job: 1 });
// Index for efficient querying by email
applicationSchema.index({ email: 1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
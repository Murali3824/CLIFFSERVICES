import express from 'express';
import { getAllApplications, getApplicationDetails, getJobApplications, getResume, submitApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import adminAuth from '../middleware/adminAuth.js';
import hrAuth from '../middleware/hrAuth.js';
import resumeUpload from '../middleware/multer.js';


const applicationRouter = express.Router();

// Public route - anyone can apply without authentication
applicationRouter.post('/submit', resumeUpload.single('resume'), submitApplication);

// Admin routes
applicationRouter.get('/admin/all', adminAuth, getAllApplications);

// HR routes
applicationRouter.get('/job/:jobId', hrAuth, getJobApplications);

applicationRouter.get('/details/:applicationId', hrAuth, getApplicationDetails);

applicationRouter.put('/status/:applicationId', hrAuth, updateApplicationStatus);

applicationRouter.get('/resume/:applicationId', getResume);

export default applicationRouter;
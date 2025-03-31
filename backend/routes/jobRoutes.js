import express from "express";
import hrAuth from "../middleware/hrAuth.js";
import adminAuth from '../middleware/adminAuth.js'
import { addJob, adminDeleteJob, deleteJob, getAllJobs, getJobById, getJobsByHR, updateJob } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/add", hrAuth, addJob);         // HRs can post a job
jobRouter.get("/list", getAllJobs);              // Anyone can view jobs
jobRouter.get("/hr", hrAuth, getJobsByHR);  // HRs can view their own jobs
jobRouter.get("/details/:id", getJobById);          // Get job details
jobRouter.delete("/delete/:id", hrAuth, deleteJob); // HRs can delete their jobs
jobRouter.put('/update/:jobId', hrAuth, updateJob);
jobRouter.delete('/admin/delete/:jobId', adminAuth, adminDeleteJob);
// jobRouter.get('/applicants/:jobId', hrAuth, getJobApplications);

export default jobRouter;

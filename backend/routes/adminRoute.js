import express from "express";
import adminAuth from '../middleware/adminAuth.js';
import {
    adminLogin,
    getAdminProfile,  // Import the correct function
    deleteHRProfile,
    getAllHRProfiles,
    getAllUsers,
    deleteUser
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", adminLogin);
adminRouter.get("/profile", adminAuth, getAdminProfile);  // Change function and add auth middleware

// HR profile routes
adminRouter.get("/hr-profiles", adminAuth, getAllHRProfiles);
adminRouter.delete("/delete/hr-profile", adminAuth, deleteHRProfile);

// User routes
adminRouter.get("/users", adminAuth, getAllUsers);
adminRouter.delete("/delete/user", adminAuth, deleteUser);

export default adminRouter;
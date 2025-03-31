import express from "express";
import { check } from "express-validator";
import {
    registerHR,
    loginHR,
    getHRProfile,
    updateHRProfile,
    verifyOtp,
    forgotPassword,
    resetPassword,
} from "../controllers/hrController.js";
import hrAuth from "../middleware/hrAuth.js";

const hrRouter = express.Router();

// Register HR
hrRouter.post(
    "/register",
    [
        check("email").isEmail().withMessage("Invalid email format"),
        check("password")
            .isLength({ min: 8, max: 18 })
            .withMessage("Password must be 8-18 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
            .withMessage(
                "Password must contain uppercase, lowercase, number, and special character"
            ),
        check("employeeId").notEmpty().withMessage("Employee ID is required"),
    ],
    registerHR
);

// Verify OTP
hrRouter.post("/verify-otp", verifyOtp);

// Login HR
hrRouter.post("/login", loginHR);

// Get HR Profile
hrRouter.get("/profile", hrAuth, getHRProfile);

// Update HR Profile
hrRouter.put("/profile", hrAuth, updateHRProfile);

// Forgot Password
hrRouter.post("/forgot-password", forgotPassword);

// Reset Password
hrRouter.post(
    "/reset-password",
    check("newPassword")
        .isLength({ min: 8, max: 18 })
        .withMessage("Password must be 8-18 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .withMessage(
            "Password must contain uppercase, lowercase, number, and special character"
        ),
    resetPassword
);

export default hrRouter;

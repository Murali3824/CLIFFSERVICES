import express from 'express';
import { check } from 'express-validator';
// import authController from '../controllers/authController.js';
import { forgotPassword, getUserProfile, login, register, resetPassword, verifyOtp, } from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

// Register
userRouter.post(
  '/register',
  check('password')
    .isLength({ min: 8, max: 18 })
    .withMessage('Password must be 8-18 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  register
);

// Verify OTP
userRouter.post('/verify-otp', verifyOtp);

// Login
userRouter.post('/login', login);

// Get User Profile
userRouter.get('/profile', userAuth, getUserProfile);

// Forgot Password
userRouter.post('/forgot-password', forgotPassword);

// Reset Password
userRouter.post(
  "/reset-password",
  check("newPassword")
    .isLength({ min: 8, max: 18 })
    .withMessage("Password must be 8-18 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage("Password must contain uppercase, lowercase, number, and special character"),
  resetPassword
);


export default userRouter;
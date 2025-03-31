import HR from "../models/hrModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import transporter from "../config/nodemailer.js";

const generateToken = (hr) => {
    return jwt.sign({ id: hr._id, email: hr.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Register HR
export const registerHR = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { username, email, password, employeeId, department } = req.body;

    try {
        let hr = await HR.findOne({ email });
        if (hr) return res.status(400).json({ msg: "HR already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        hr = new HR({
            username,
            email,
            password: hashedPassword,
            employeeId,
            department,
            otp,
        });

        await hr.save();

        await transporter.sendMail({
            to: email,
            subject: "Verify Your HR Account",
            text: `Your OTP is: ${otp}`,
        });

        res.status(201).json({
            msg: "HR registered. Please verify your email with the OTP sent.",
        });
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const hr = await HR.findOne({ email });
        if (!hr) return res.status(400).json({ msg: "HR not found" });

        if (hr.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

        hr.isVerified = true;
        hr.otp = null;
        await hr.save();

        res.status(200).json({ msg: "Email verified successfully. You can now log in." });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Login HR
export const loginHR = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hr = await HR.findOne({ email });
        if (!hr) return res.status(400).json({ msg: "User not exists" });

        if (!hr.isVerified) {
            // Generate a new OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            hr.otp = otp;
            await hr.save();

            // Send OTP email
            await transporter.sendMail({
                to: email,
                subject: "Verify Your HR Account",
                text: `Your OTP is: ${otp}`,
            });

            return res.status(400).json({ msg: "Please verify your email first" });
        }

        const isMatch = await bcrypt.compare(password, hr.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

        const token = generateToken(hr);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get HR Profile
export const getHRProfile = async (req, res) => {
    try {
        const hr = await HR.findById(req.user.id).select('-password -otp -otpExpires');
        if (!hr) return res.status(404).json({ msg: "HR not found" });
        res.status(200).json(hr);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Update HR Profile
export const updateHRProfile = async (req, res) => {
    const { username, email, employeeId, department } = req.body;

    try {
        const hr = await HR.findById(req.user.id);
        if (!hr) return res.status(404).json({ msg: "HR not found" });

        hr.username = username || hr.username;
        hr.email = email || hr.email;
        hr.employeeId = employeeId || hr.employeeId;
        hr.department = department || hr.department;

        await hr.save();

        const updatedHR = hr.toObject();
        delete updatedHR.password;
        delete updatedHR.otp;
        delete updatedHR.otpExpires;

        res.status(200).json(updatedHR);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const hr = await HR.findOne({ email });
        if (!hr) return res.status(400).json({ msg: "HR not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        hr.otp = otp;
        await hr.save();

        await transporter.sendMail({
            to: email,
            subject: "Reset Your HR Password",
            text: `Your OTP is: ${otp}`,
        });

        res.status(200).json({ msg: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, otp, newPassword } = req.body;

    try {
        const hr = await HR.findOne({ email });
        if (!hr) return res.status(400).json({ msg: "HR not found" });
        if (hr.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

        const salt = await bcrypt.genSalt(10);
        hr.password = await bcrypt.hash(newPassword, salt);
        hr.otp = null;
        await hr.save();

        res.status(200).json({ msg: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
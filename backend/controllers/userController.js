import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import transporter from "../config/nodemailer.js";

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Register User
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password, firstName, lastName, countryCode, PhoneNo, country } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            countryCode,
            PhoneNo,
            country,
            otp,
        });

        await user.save();
        // console.log('User saved successfully');

        // console.log('Sending email to:', email);
        await transporter.sendMail({
            to: email,
            subject: "Verify Your Email",
            text: `Your OTP is: ${otp}`,
        });
        
        // console.log('Email sent successfully');

        res.status(201).json({
            msg: "User registered. Please verify your email with the OTP sent.",
        });
    } catch (error) {
        console.error('Registration Error:', error.message, error.stack);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

        user.isVerified = true;
        user.otp = null; // Clear OTP after verification
        await user.save();

        res
            .status(200)
            .json({ msg: "Email verified successfully. You can now log in." });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not exist" });
        }

        if (!user.isVerified) {
            // Generate a new OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = otp;
            await user.save();

            // Send OTP email
            await transporter.sendMail({
                to: email,
                subject: "Verify Your Email",
                text: `Your OTP is: ${otp}`,
            });

            return res.status(400).json({ msg: "Please verify your email first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }

        const token = generateToken(user);
        res.status(200).json({ token });

    } catch (error) {
        console.error("Login API error:", error.message);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -otp -otpExpires'); // Exclude sensitive fields
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.error('Get Profile Error:', error.message);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        await user.save();

        await transporter.sendMail({
            to: email,
            subject: "Verify Your Email",
            text: `Your OTP is: ${otp}`,
        });
        

        res.status(200).json({ msg: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
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
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

        // Hash and update new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.otp = null; // Clear OTP
        await user.save();

        res.status(200).json({ msg: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

export const contactController = {
    sendContactEmail: async (req, res) => {
        const { name, email, subject, message, to_email } = req.body;

        // Validate input
        if (!name || !email || !subject || !message || !to_email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: to_email,
            subject: subject,
            text: `
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                Message: ${message}
            `,
            html: `
                <h2>Cliff Services Customer Contact Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    },
};
import jwt from "jsonwebtoken";
import HR from "../models/hrModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js"; // Add User model import

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email: process.env.ADMIN_EMAIL, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            return res.status(200).json({ success: true, token });
        }

        return res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// Get admin profile
const getAdminProfile = async (req, res) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!adminEmail) {
            return res.status(500).json({
                success: false,
                message: "Admin email is not configured"
            });
        }

        res.status(200).json({
            success: true,
            admin: {
                email: adminEmail,
                role: "admin"
            }
        });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve admin profile",
            error: error.message
        });
    }
};
// Get all HR profiles (Admin functionality)
const getAllHRProfiles = async (req, res) => {
    try {
        const hrProfiles = await HR.find().select("-password");
        res.status(200).json({
            success: true,
            count: hrProfiles.length,
            hrProfiles,
        });
    } catch (error) {
        console.error("Error fetching HR profiles:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve HR profiles",
            error: error.message,
        });
    }
};

// Delete HR Profile (with option to remove associated jobs)
const deleteHRProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        await Job.deleteMany({ postedBy: userId });
        const deletedHR = await HR.findByIdAndDelete(userId);

        if (!deletedHR) {
            return res.status(404).json({
                success: false,
                message: "HR profile not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "HR profile and associated jobs deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting HR profile:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete HR profile",
            error: error.message
        });
    }
};

// New function: Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -otp"); // Exclude sensitive fields
        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error.message,
        });
    }
};

// New function: Delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

export { adminLogin,getAdminProfile, getAllHRProfiles, deleteHRProfile, getAllUsers, deleteUser };
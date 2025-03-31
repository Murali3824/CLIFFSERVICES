import mongoose from 'mongoose';

const hrSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true, trim: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const HR = mongoose.model("HR", hrSchema);
export default HR;
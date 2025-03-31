import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        shortdescription: {
            type:String,
            required:true,
        },
        overview: {
            type: String,
            required: true,
        },
        responsibilities: {
            type: [String], // Array of responsibilities
            required: true,
        },
        qualifications: {
            type: [String], // Array of qualifications
            required: true,
        },
        location: {
            type: String,
            default: "Not specified",
        },
        employmentType: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Internship"],
            default: "Full-time",
        },
        salaryRange: {
            type: String,
            default: "Negotiable",
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HR", // Reference to HR model
            required: true,
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;

import React from "react";
import { X, MapPin, Briefcase, IndianRupee,  } from "lucide-react";

const JobDetailsModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="fixed inset-0 bg-stone-900 bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border-4 border-amber-500">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>

                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-4 text-stone-800 border-b-4 border-amber-500 pb-2">
                        {job.title}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4 mb-6 mt-4">
                        <div className="flex items-center">
                            <MapPin className="mr-2 text-amber-600" />
                            <span className="text-stone-700">{job.location || "Not specified"}</span>
                        </div>
                        <div className="flex items-center">
                            <Briefcase className="mr-2 text-amber-600" />
                            <span className="text-stone-700">{job.employmentType}</span>
                        </div>
                        <div className="flex items-center">
                            <IndianRupee className="mr-2 text-amber-600" />
                            <span className="text-stone-700">{job.salaryRange}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-stone-700 border-b border-amber-300 pb-1">
                            Job Overview
                        </h3>
                        <p className="text-stone-600">{job.overview}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-stone-700 border-b border-amber-300 pb-1">
                            Responsibilities
                        </h3>
                        <ul className="list-disc list-inside text-stone-600 space-y-2">
                            {job.responsibilities.map((resp, index) => (
                                <li key={index}>{resp}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-stone-700 border-b border-amber-300 pb-1">
                            Qualifications
                        </h3>
                        <ul className="list-disc list-inside text-stone-600 space-y-2">
                            {job.qualifications.map((qual, index) => (
                                <li key={index}>{qual}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-between items-center border-t pt-4 border-amber-300">
                        <span className="text-sm text-stone-500">
                            Posted by: {job.postedBy?.username || "Unknown"}
                        </span>
                        <span className="text-sm text-stone-500">
                            Posted on: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;

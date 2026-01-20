import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, role, onDelete }) => {
    // 1. STATE FOR APPLYING
    const [isApplied, setIsApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 2. HANDLE APPLY CLICK
    const handleApply = () => {
        setIsLoading(true);
        
        // Simulate Backend Delay (1 second)
        setTimeout(() => {
            setIsLoading(false);
            setIsApplied(true);
            // alert(`Applied to ${job.title} successfully!`); // Optional
        }, 1000);
    };

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0 hover-card">
                {/* Image Section */}
                <div style={{ height: '180px', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                     <img 
                        src={`https://picsum.photos/id/${job.id}/500/300`}
                        className="card-img-top" 
                        alt="job cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                </div>

                {/* Body Section */}
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold text-dark mb-0">{job.title}</h5>
                        <span className="badge bg-primary rounded-pill">Active</span>
                    </div>

                    <p className="text-muted small mb-3">
                        <i className="fas fa-map-marker-alt me-1"></i> {job.location || "Remote"}
                    </p>

                    <p className="card-text text-secondary" style={{ fontSize: '0.9rem' }}>
                        {job.description.substring(0, 100)}...
                    </p>
                    
                    {/* View Details Link (For reading full description) */}
                    <Link to={`/jobs/${job.id}`} className="text-decoration-none small fw-bold">
                        Read full description <i className="fas fa-arrow-right ms-1"></i>
                    </Link>
                </div>

                {/* Footer Section */}
                <div className="card-footer bg-white border-top-0 p-4 pt-0">
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-muted small fw-bold">
                            Exp: {job.experienceRequired} Years
                        </span>

                        {role === 'RECRUITER' ? (
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(job.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                                <Link to={`/jobs/${job.id}/applicants`} className="btn btn-dark btn-sm">
                                    Applicants
                                </Link>
                            </div>
                        ) : (
                            // --- CANDIDATE BUTTON LOGIC ---
                            <button 
                                className={`btn ${isApplied ? 'btn-success' : 'btn-primary'} w-100`}
                                onClick={handleApply}
                                disabled={isApplied || isLoading}
                            >
                                {isLoading ? (
                                    <span><i className="fas fa-spinner fa-spin me-2"></i>Sending...</span>
                                ) : isApplied ? (
                                    <span><i className="fas fa-check me-2"></i>Applied</span>
                                ) : (
                                    "Apply Now"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
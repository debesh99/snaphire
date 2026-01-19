import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, role, onDelete }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4"> {/* Responsive Grid Logic */}
            <div className="card h-100 shadow border-0 hover-card">
                {/* Fallback image if unsplash is slow, or remove src entirely */}
                <div style={{ height: '180px', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                     <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60"
                        className="card-img-top" 
                        alt="job cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                </div>

                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold text-dark mb-0">{job.title}</h5>
                        <span className="badge bg-primary rounded-pill">Active</span>
                    </div>

                    <p className="text-muted small mb-3">
                        <i className="fas fa-map-marker-alt me-1"></i> {job.location || "Remote"}
                    </p>

                    <p className="card-text text-secondary" style={{ fontSize: '0.9rem' }}>
                        {job.description}
                    </p>
                </div>

                <div className="card-footer bg-white border-top-0 p-4 pt-0">
                    <div className="d-flex justify-content-between align-items-center">
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
                                <button className="btn btn-dark btn-sm">
                                    Applicants
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary w-100">
                                Apply Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
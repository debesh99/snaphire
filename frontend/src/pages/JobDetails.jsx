import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false);
    
    // Mock Role (Replace with actual logic later)
    const role = 'CANDIDATE'; 

    useEffect(() => {
        // Simulate fetching single job details from backend
        // In real app: axios.get(`http://localhost:8080/jobs/${id}`)
        const demoJob = {
            id: id,
            title: "Frontend Developer",
            description: "We are seeking a skilled React Developer to join our team. \n\nResponsibilities:\n- Build efficient UI components\n- Integrate with REST APIs\n- Ensure mobile responsiveness\n\nRequirements:\n- 3+ years of experience\n- Strong proficiency in JavaScript (ES6+)\n- Experience with Redux and Tailwind",
            location: "Remote",
            salary: "$80,000 - $120,000",
            experienceRequired: 3,
            postedDate: "2023-10-27"
        };
        setJob(demoJob);
    }, [id]);

    const handleApply = () => {
        // Simulate Apply
        setIsApplied(true);
        alert("Application Submitted!");
    };

    if (!job) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />
            
            <div className="container py-5 flex-grow-1">
                <button onClick={() => navigate('/jobs')} className="btn btn-link text-decoration-none text-muted mb-3 ps-0">
                    <i className="fas fa-arrow-left me-2"></i>Back to Jobs
                </button>

                <div className="row">
                    {/* LEFT COLUMN: Main Details */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body p-5">
                                <h2 className="fw-bold mb-3">{job.title}</h2>
                                <div className="d-flex gap-3 mb-4 text-muted">
                                    <span><i className="fas fa-map-marker-alt me-1"></i> {job.location}</span>
                                    <span><i className="fas fa-briefcase me-1"></i> {job.experienceRequired} Years Exp</span>
                                    <span><i className="fas fa-money-bill-wave me-1"></i> {job.salary}</span>
                                </div>
                                
                                <hr />
                                
                                <h5 className="fw-bold mt-4 mb-3">Job Description</h5>
                                <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Action Card */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">Interested?</h5>
                                <p className="text-muted small">Read the requirements carefully before applying.</p>
                                
                                {role === 'CANDIDATE' ? (
                                    <button 
                                        className={`btn btn-lg w-100 ${isApplied ? 'btn-success' : 'btn-primary'}`}
                                        onClick={handleApply}
                                        disabled={isApplied}
                                    >
                                        {isApplied ? "Already Applied" : "Apply Now"}
                                    </button>
                                ) : (
                                    <div className="alert alert-info">
                                        You are viewing this as a Recruiter.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default JobDetails;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createJob } from '../services/ApiService';

const PostJob = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    
    // Check if user is a RECRUITER on component mount
    useEffect(() => {
        const role = localStorage.getItem('role');
        console.log("User Role from localStorage:", role);
        setUserRole(role);
        
        if (role !== 'RECRUITER') {
            alert('You must be logged in as a Recruiter to post jobs!');
            navigate('/jobs');
        }
    }, [navigate]);
    
    // Form State
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        company: '',
        experienceRequired: '',
        location: ''
    });

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Prepare data (Convert experience to number just to be safe)
            const payload = {
                ...jobData,
                experienceRequired: parseInt(jobData.experienceRequired)
            };

            // Call Backend
            await createJob(payload);
            
            alert("Job Posted Successfully!");
            
            // Redirect back to Feed to see the new job
            navigate('/jobs');
            
        } catch (error) {
            console.error("Failed to post job", error);
            alert("Failed to post job. Are you logged in as a Recruiter?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />
            
            <div className="container py-5 flex-grow-1">
                <Link to="/jobs" className="text-decoration-none text-muted mb-2 d-inline-block">
                    <i className="fas fa-arrow-left me-1"></i>Back to Jobs
                </Link>
                
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-5">
                                <h3 className="fw-bold mb-4 text-center">Post a New Job</h3>
                                
                                <form onSubmit={handleSubmit}>
                                    {/* Job Title */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Job Title</label>
                                        <input 
                                            type="text" 
                                            name="title"
                                            className="form-control form-control-lg"
                                            placeholder="e.g. Senior Java Developer"
                                            value={jobData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Location</label>
                                        <input 
                                            type="text" 
                                            name="location"
                                            className="form-control"
                                            placeholder="e.g. Remote, New York, Mumbai"
                                            value={jobData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Company */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Company</label>
                                        <input 
                                            type="text" 
                                            name="company"
                                            className="form-control"
                                            placeholder="e.g. Google, Microsoft, Amazon"
                                            value={jobData.company}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Experience (Years)</label>
                                        <input 
                                            type="number" 
                                            name="experienceRequired"
                                            className="form-control"
                                            placeholder="e.g. 2"
                                            min="0"
                                            value={jobData.experienceRequired}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Job Description</label>
                                        <textarea 
                                            name="description"
                                            className="form-control"
                                            rows="5"
                                            placeholder="Describe the role, responsibilities, and requirements..."
                                            value={jobData.description}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-grid gap-2">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Publishing..." : "Publish Job"}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate('/jobs')}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PostJob;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PostJob = () => {
    const navigate = useNavigate();
    
    // Form State
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        experienceRequired: '',
        location: ''
    });

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // FOR TESTING: Just log data and redirect
        console.log("Job Posting Data:", jobData);
        alert("Job Posted Successfully! (Frontend Demo)");
        
        // Redirect back to Feed
        navigate('/jobs');
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
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            Publish Job
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
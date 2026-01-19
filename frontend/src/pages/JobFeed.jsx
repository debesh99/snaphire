import { useState } from 'react';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobFeed = () => {
    // 1. DEMO DATA (Fixed unique IDs to prevent React errors)
    const demoJobs = [
        {
            id: 1,
            title: "Frontend Developer",
            description: "Looking for a React expert to build responsive UIs. Must know Redux and Tailwind CSS.",
            experienceRequired: 2,
            location: "Remote"
        },
        {
            id: 2,
            title: "Backend Engineer",
            description: "Java Spring Boot developer needed for high-scale architecture. Microservices experience is a plus.",
            experienceRequired: 4,
            location: "New York, USA"
        },
        {
            id: 3,
            title: "Data Scientist",
            description: "Analyze large datasets using Python and Spark. Machine Learning background preferred.",
            experienceRequired: 3,
            location: "London, UK"
        },
        {
            id: 4,
            title: "Product Manager",
            description: "Lead the product roadmap and collaborate with engineering teams to deliver value.",
            experienceRequired: 5,
            location: "San Francisco, USA"
        },
        {
            id: 5,
            title: "DevOps Engineer",
            description: "Manage AWS infrastructure and CI/CD pipelines. Docker and Kubernetes knowledge essential.",
            experienceRequired: 3,
            location: "Berlin, Germany"
        },
        {
            id: 6,
            title: "QA Tester",
            description: "Manual and automated testing for web applications. Selenium experience required.",
            experienceRequired: 1,
            location: "Remote"
        },
        {
            id: 7, // Fixed ID
            title: "UI/UX Designer",
            description: "Create intuitive user experiences and wireframes using Figma and Adobe XD.",
            experienceRequired: 2,
            location: "Austin, USA"
        },
        {
            id: 8, // Fixed ID
            title: "Mobile Developer",
            description: "iOS and Android development using Flutter or React Native.",
            experienceRequired: 3,
            location: "Remote"
        }
    ];

    // 2. STATE 
    const [jobs, setJobs] = useState(demoJobs);
    const [loading, setLoading] = useState(false);
    
    // HARDCODED ROLE FOR TESTING 
    // Change to 'CANDIDATE' to hide the "Post Job" and "Delete" buttons
    const [role, setRole] = useState('RECRUITER'); // 'RECRUITER' or 'CANDIDATE'

    // Fake Delete Function
    const handleDelete = (id) => {
        if(window.confirm("Delete this job?")) {
            setJobs(jobs.filter(job => job.id !== id));
        }
    };

    return (
        // OUTER CONTAINER: Forces the page to take full height and uses Flexbox
        <div className="min-vh-100 d-flex flex-column bg-light">
            
            {/* 1. Navbar at the top */}
            <Navbar />
            
            {/* 2. Main Content: flex-grow-1 pushes the footer down */}
            <div className="container py-5 flex-grow-1">
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold text-dark">Current Openings</h2>
                        <p className="text-muted">Find your dream job or hire the best talent.</p>
                    </div>
                    
                    {/* Post Job Button (Recruiter Only) */}
                    {role === 'RECRUITER' && (
                        <button className="btn btn-primary btn-lg shadow-sm" onClick={() => window.location.href = '/post-job'}>
                            Post New Job
                        </button>
                    )}
                </div>

                {/* Grid Section */}
                {loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="row g-4">
                        {jobs.map(job => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                role={role} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </div>
                ) : (
                    // Empty State Design
                    <div className="text-center mt-5 p-5 bg-white rounded shadow-sm">
                        <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
                        <p className="text-muted">No jobs available at the moment.</p>
                    </div>
                )}
            </div>

            {/* 3. Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default JobFeed;
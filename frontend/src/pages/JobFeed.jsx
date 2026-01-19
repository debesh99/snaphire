import { useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';

const JobFeed = () => {
    // 1. DEMO DATA (Hardcoded jobs to test the grid)
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
            id: 6,
            title: "QA Tester",
            description: "Manual and automated testing for web applications. Selenium experience required.",
            experienceRequired: 1,
            location: "Remote"
        },
        {
            id: 6,
            title: "QA Tester",
            description: "Manual and automated testing for web applications. Selenium experience required.",
            experienceRequired: 1,
            location: "Remote"
        }
    ];

    // 2. STATE (Initialized with demo data)
    const [jobs, setJobs] = useState(demoJobs);
    
    // HARDCODED ROLE FOR TESTING (Change to 'CANDIDATE' to test the other view)
    const [role, setRole] = useState('RECRUITER'); 

    // Fake Delete Function (Just removes it from the screen)
    const handleDelete = (id) => {
        if(window.confirm("Delete this job?")) {
            setJobs(jobs.filter(job => job.id !== id));
        }
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Navbar would go here */}
            
            <div className="container py-5">
                {/* 1. Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold text-dark">Current Openings</h2>
                        <p className="text-muted">Find your dream job or hire the best talent.</p>
                    </div>
                    
                    {/* Test Button Visibility */}
                    {role === 'RECRUITER' && (
                        <button className="btn btn-primary btn-lg shadow-sm">
                            <i className="fas fa-plus me-2"></i> Post New Job
                        </button>
                    )}
                </div>

                {/* 2. The Grid Layout */}
                <div className="row g-4"> 
                    {/* g-4 adds a gap between cards */}
                    {jobs.map(job => (
                        <JobCard 
                            key={job.id} 
                            job={job} 
                            role={role} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobFeed;
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ViewApplicants = () => {
    const { jobId } = useParams(); // Get the Job ID from the URL

    // 1. DEMO APPLICANTS DATA
    const demoApplicants = [
        { id: 101, name: "Alice Johnson", email: "alice@example.com", phone: "+1 234 567 890", status: "Pending" },
        { id: 102, name: "Bob Smith", email: "bob@tech.com", phone: "+1 987 654 321", status: "Pending" },
        { id: 103, name: "Charlie Davis", email: "charlie@web.com", phone: "+1 555 123 456", status: "Pending" },
        { id: 104, name: "Diana Prince", email: "diana@amazon.com", phone: "+1 555 999 888", status: "Pending" }
    ];

    const [applicants, setApplicants] = useState(demoApplicants);

    // Toggle "Select" status
    const handleSelect = (id) => {
        setApplicants(applicants.map(app => 
            app.id === id 
                ? { ...app, status: app.status === "Selected" ? "Pending" : "Selected" } 
                : app
        ));
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />
            
            <div className="container py-5 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <Link to="/jobs" className="text-decoration-none text-muted mb-2 d-inline-block">
                            <i className="fas fa-arrow-left me-1"></i> Back to Jobs
                        </Link>
                        <h2 className="fw-bold">Applicants for Job #{jobId}</h2>
                    </div>
                </div>

                {/* Applicants List */}
                <div className="card shadow-sm border-0">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3">Candidate Name</th>
                                        <th className="py-3">Email</th>
                                        <th className="py-3">Phone</th>
                                        <th className="py-3">Status</th>
                                        <th className="text-end pe-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applicants.map(app => (
                                        <tr key={app.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{width: '40px', height: '40px'}}>
                                                        {app.name.charAt(0)}
                                                    </div>
                                                    <span className="fw-bold">{app.name}</span>
                                                </div>
                                            </td>
                                            <td>{app.email}</td>
                                            <td>{app.phone}</td>
                                            <td>
                                                <span className={`badge ${app.status === 'Selected' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="text-end pe-4">
                                                <button 
                                                    className={`btn btn-sm ${app.status === 'Selected' ? 'btn-outline-danger' : 'btn-success'}`}
                                                    onClick={() => handleSelect(app.id)}
                                                    style={{ minWidth: '100px' }}
                                                >
                                                    {app.status === 'Selected' ? (
                                                        <span><i className="fas fa-times me-1"></i> Remove</span>
                                                    ) : (
                                                        <span><i className="fas fa-check me-1"></i> Select</span>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ViewApplicants;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getApplicants, deleteApplication, updateApplicationStatus } from '../services/ApiService';

const ViewApplicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchApplicants();
    }, [jobId]);

    const fetchApplicants = async () => {
        try {
            const data = await getApplicants(jobId);
            setApplicants(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch applicants", err);
            setError("Failed to load applicants. Ensure you are logged in as a Recruiter.");
            setLoading(false);
        }
    };

    // 1. Handle "Select" (Updates status to Accepted)
    const handleSelect = async (applicationId) => {
        try {
            // Call API to update status
            await updateApplicationStatus(applicationId, 'Accepted');
            
            // Update UI
            setApplicants(applicants.map(app => 
                app.id === applicationId ? { ...app, status: 'Accepted' } : app
            ));
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    // 2. Handle "Reject" (Deletes the application)
    const handleReject = async (applicationId) => {
        if (!window.confirm("Are you sure you want to reject and delete this application? This cannot be undone.")) {
            return;
        }

        try {
            // Call API to delete
            await deleteApplication(applicationId);

            // Update UI: Remove the deleted item from the list
            setApplicants(applicants.filter(app => app.id !== applicationId));
            
            alert("Application rejected and deleted.");
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete application.");
        }
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

                <div className="card shadow-sm border-0">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger m-4">{error}</div>
                        ) : applicants.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light text-secondary">
                                        <tr>
                                            <th className="ps-4 py-3">Candidate Name</th>
                                            <th className="py-3">Email</th>
                                            <th className="py-3">Status</th>
                                            <th className="text-end pe-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicants.map((app) => (
                                            <tr key={app.id}>
                                                {/* Name */}
                                                <td className="ps-4">
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{width: '40px', height: '40px'}}>
                                                            {app.candidate?.name?.charAt(0).toUpperCase() || 'U'}
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0 fw-bold">{app.candidate?.name || "Unknown"}</h6>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td>{app.candidate?.email || "No Email"}</td>

                                                {/* Status */}
                                                <td>
                                                    <span className={`badge ${
                                                        app.status === 'Accepted' ? 'bg-success' : 'bg-warning text-dark'
                                                    }`}>
                                                        {app.status || "Pending"}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="text-end pe-4">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        {/* REJECT BUTTON (DELETE) */}
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleReject(app.id)}
                                                            title="Reject and Delete"
                                                        >
                                                            <i className="fas fa-trash-alt me-1"></i> Reject
                                                        </button>

                                                        {/* SELECT BUTTON */}
                                                        {app.status !== 'Accepted' && (
                                                            <button 
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => handleSelect(app.id)}
                                                            >
                                                                <i className="fas fa-check me-1"></i> Select
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center p-5">
                                <i className="fas fa-users-slash fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No applicants found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ViewApplicants;
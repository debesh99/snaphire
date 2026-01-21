import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllJobs, deleteJob } from "../services/ApiService";
import { jwtDecode } from "jwt-decode";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]); // All jobs from backend
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [role, setRole] = useState(""); // User role
  const [currentUserId, setCurrentUserId] = useState(null); // store current user ID

  useEffect(() => {
    // 1. Get Role & ID from Token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Standardizing extraction of Role and ID
        const userRole =
          decoded.role ||
          decoded.authorities ||
          (decoded.roles && decoded.roles[0]) ||
          "CANDIDATE";
        // Handle complex role objects like {authority: "RECRUITER"}
        const finalRole =
          typeof userRole === "object" && userRole.authority
            ? userRole.authority
            : userRole;

        setRole(finalRole);

        // Get ID
        const uId = decoded.userId || decoded.id;
        setCurrentUserId(uId);
      } catch (e) {
        console.error("Token decode error", e);
        setRole("CANDIDATE");
      }
    } else {
      setRole("CANDIDATE");
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      alert("Failed to delete job.");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar onSearch={setSearchTerm} />
      <div className="container py-5 flex-grow-1">
        {/* ... Header Section (Same as before) ... */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold text-dark">Current Openings</h2>
            <p className="text-muted">
              {loading
                ? "Loading..."
                : `Found ${filteredJobs.length} active roles.`}
            </p>
          </div>
          {role === "RECRUITER" && (
            <button
              className="btn btn-primary btn-lg shadow-sm"
              onClick={() => (window.location.href = "/post-job")}
            >
              <i className="fas fa-plus me-2"></i> Post New Job
            </button>
          )}
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="row g-4">
            {filteredJobs.map((job) => {
              // --- LOGIC TO CHECK IF APPLIED ---
              // We look inside job.applications (which comes from backend)
              // and see if any candidate.id matches our currentUserId
              const hasApplied = job.applications?.some(
                (app) => app.candidate?.id === currentUserId,
              );

              return (
                <JobCard
                  key={job.id}
                  job={job}
                  role={role}
                  onDelete={handleDelete}
                  initialAppliedStatus={hasApplied}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center mt-5 p-5 bg-white rounded shadow-sm">
            <p className="text-muted">No jobs found.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobFeed;

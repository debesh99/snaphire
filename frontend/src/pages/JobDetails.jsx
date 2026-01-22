import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getJobById, applyForJob } from "../services/ApiService"; // <--- Import APIs
import { jwtDecode } from "jwt-decode"; // <--- Import Token Decoder

const JobDetails = () => {
  const { id } = useParams(); // Get Job ID from URL
  const navigate = useNavigate();

  // State
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    // 1. Get Role & ID from Token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Get Role
        const userRole =
          decoded.role ||
          decoded.authorities ||
          (decoded.roles && decoded.roles[0]) ||
          "CANDIDATE";
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
      }
    }

    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);

      // Check if current user has already applied
      // Since we need 'currentUserId' which might be set slightly after this runs,
      // we do a quick re-check logic here or rely on the effect dependency if we split it.
      // For simplicity, we check local storage again or rely on the state set above.

      // NOTE: Since fetchJobDetails is async, we grab the ID directly from decoding again
      // to ensure we have it for the check immediately.
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const uId = decoded.userId || decoded.id;

        // Check applications list inside the job object
        const hasApplied = data.applications?.some(
          (app) => app.candidate?.id === uId,
        );
        if (hasApplied) setIsApplied(true);
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch job", err);
      setError("Job not found or deleted.");
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplyLoading(true);
    try {
      if (!currentUserId) {
        alert("Please login to apply.");
        navigate("/");
        return;
      }

      // Call Backend API
      await applyForJob(currentUserId, job.id);

      setIsApplied(true);
      alert("Application Submitted Successfully!");
    } catch (error) {
      console.error("Apply failed", error);
      // Handle "Already Applied" (404/Bad Request from backend)
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      ) {
        setIsApplied(true);
        alert("You have already applied for this job!");
      } else {
        alert("Failed to apply. Please try again.");
      }
    } finally {
      setApplyLoading(false);
    }
  };

  // --- RENDER STATES ---

  if (loading)
    return (
      <div className="min-vh-100 d-flex flex-column bg-light">
        <Navbar />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <Footer />
      </div>
    );

  if (error || !job)
    return (
      <div className="min-vh-100 d-flex flex-column bg-light">
        <Navbar />
        <div className="container py-5 text-center flex-grow-1">
          <div className="alert alert-danger">{error || "Job not found"}</div>
          <button onClick={() => navigate("/jobs")} className="btn btn-primary">
            Back to Feed
          </button>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div className="container py-5 flex-grow-1">
        <button
          onClick={() => navigate("/jobs")}
          className="btn btn-link text-decoration-none text-muted mb-3 ps-0"
        >
          <i className="fas fa-arrow-left me-2"></i>Back to Jobs
        </button>

        <div className="row">
          {/* LEFT COLUMN: Main Details */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4">
              {/* Hero Image (Optional) */}
              <div
                style={{
                  height: "200px",
                  backgroundColor: "#e9ecef",
                  overflow: "hidden",
                }}
                className="rounded-top"
              >
                <img
                  src={`https://picsum.photos/id/${job.id + 10}/800/400`}
                  alt="Job Cover"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/800x400?text=Snaphire+Job")
                  }
                />
              </div>

              <div className="card-body p-5">
                <h2 className="fw-bold mb-2">{job.title}</h2>
                <h5 className="text-primary mb-4 fw-bold">{job.company}</h5>

                <div className="d-flex flex-wrap gap-3 mb-4 text-muted">
                  <span className="badge bg-light text-dark border p-2">
                    <i className="fas fa-map-marker-alt me-1 text-danger"></i>{" "}
                    {job.location}
                  </span>
                  <span className="badge bg-light text-dark border p-2">
                    <i className="fas fa-briefcase me-1 text-primary"></i>{" "}
                    {job.experienceRequired} Years Exp
                  </span>
                  {/* Backend doesn't have salary yet, so we conditionally render or hide it */}
                  {job.salary && (
                    <span className="badge bg-light text-dark border p-2">
                      <i className="fas fa-money-bill-wave me-1 text-success"></i>{" "}
                      {job.salary}
                    </span>
                  )}
                </div>

                <hr />

                <h5 className="fw-bold mt-4 mb-3">Job Description</h5>
                <p
                  style={{
                    whiteSpace: "pre-line",
                    lineHeight: "1.8",
                    color: "#555",
                  }}
                >
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action Card */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm border-0 sticky-top"
              style={{ top: "20px", zIndex: 1 }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Interested?</h5>
                <p className="text-muted small">
                  Read the requirements carefully before applying.
                </p>

                {role === "RECRUITER" ? (
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    Recruiters cannot apply to jobs.
                  </div>
                ) : (
                  <button
                    className={`btn btn-lg w-100 ${isApplied ? "btn-success" : "btn-primary"}`}
                    onClick={handleApply}
                    disabled={isApplied || applyLoading}
                  >
                    {applyLoading ? (
                      <span>
                        <i className="fas fa-spinner fa-spin me-2"></i>{" "}
                        Processing...
                      </span>
                    ) : isApplied ? (
                      <span>
                        <i className="fas fa-check-circle me-2"></i> Applied
                      </span>
                    ) : (
                      "Apply Now"
                    )}
                  </button>
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

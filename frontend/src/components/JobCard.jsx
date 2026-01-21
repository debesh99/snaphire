import React, { useState } from "react";
import { Link } from "react-router-dom";
import { applyForJob } from "../services/ApiService";
import { jwtDecode } from "jwt-decode";

const JobCard = ({ job, role, onDelete, initialAppliedStatus }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    setIsLoading(true);

    try {
      // 1. Get Token
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply.");
        return;
      }

      // 2. Decode Token to get User ID
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.id;

      if (!userId) {
        alert("Error: User ID not found in session. Please Login again.");
        return;
      }

      // 3. Call API to Apply
      await applyForJob(userId, job.id);

      // 4. Success State
      setIsApplied(true);
      alert("Application Submitted Successfully!");
    } catch (error) {
      console.error("Apply failed", error);
      if (error.response && error.response.status === 404) {
        setIsApplied(true); // Flip button to "Applied"
        alert("You have already applied for this job!");
      } else if (error.response && error.response.status === 500) {
        alert("You might have already applied for this job.");
      } else {
        alert("Failed to apply. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow border-0 hover-card">
        {/* Image Section */}
        <div
          style={{
            height: "180px",
            backgroundColor: "#e9ecef",
            overflow: "hidden",
          }}
        >
          <img
            src={`https://picsum.photos/id/${job.id}/500/300`}
            className="card-img-top"
            alt="job cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Body Section */}
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">{job.title}</h5>
            <span className="badge bg-primary rounded-pill">Active</span>
          </div>

          <p className="text-primary small fw-bold mb-2">
            <i className="fas fa-building me-1"></i>{" "}
            {job.company || "Snaphire Inc."}
          </p>

          <p className="text-muted small mb-3">
            <i className="fas fa-map-marker-alt me-1"></i>{" "}
            {job.location || "Remote"}
          </p>

          <p
            className="card-text text-secondary"
            style={{ fontSize: "0.9rem" }}
          >
            {/* Safe truncate in case description is null */}
            {job.description
              ? job.description.substring(0, 100)
              : "No description"}
            ...
          </p>

          <Link
            to={`/jobs/${job.id}`}
            className="text-decoration-none small fw-bold"
          >
            Read full description <i className="fas fa-arrow-right ms-1"></i>
          </Link>
        </div>

        {/* Footer Section */}
        <div className="card-footer bg-white border-top-0 p-4 pt-0">
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small fw-bold">
              Exp: {job.experienceRequired} Years
            </span>

            {role === "RECRUITER" ? (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(job.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <Link
                  to={`/jobs/${job.id}/applicants`}
                  className="btn btn-dark btn-sm"
                >
                  Applicants
                </Link>
              </div>
            ) : (
              // --- CANDIDATE BUTTON LOGIC ---
              <button
                className={`btn ${isApplied ? "btn-success" : "btn-primary"} w-100`}
                onClick={handleApply}
                disabled={isApplied || isLoading}
              >
                {isLoading ? (
                  <span>
                    <i className="fas fa-spinner fa-spin me-2"></i>Sending...
                  </span>
                ) : isApplied ? (
                  <span>
                    <i className="fas fa-check me-2"></i>Applied
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
  );
};

export default JobCard;

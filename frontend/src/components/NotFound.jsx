import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>
          Error <span className="errorcode">404</span>
        </h1>
        <p className="output">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className="output">
          Please try to <a onClick={() => navigate(-1)}>go back</a> or{" "}
          <Link to="/">return to the homepage</Link>.
        </p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  );
};

export default NotFound;

// This component uses useNavigate to handle the history (go back) functionality and Link for internal navigation.

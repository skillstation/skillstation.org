import React from "react";
import { Link } from "react-router-dom";
import "./Marquee.css";

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span>
          Applications Invited for the Prestigious JEE Mentorship Cohort
          Programme via Young Leaders Fellowship –{" "}
          <Link
            to="/tisat"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            [Click Here to Apply]
          </Link>
          !
        </span>
        <span>
          Applications Invited for the Prestigious JEE Mentorship Cohort
          Programme via Young Leaders Fellowship –{" "}
          <Link
            to="/tisat"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            [Click Here to Apply]
          </Link>
          !
        </span>
      </div>
    </div>
  );
};

export default Marquee;

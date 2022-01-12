import React from "react";
import { Link } from "react-router-dom";

const IssueHead = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#f6f8fa" }}>
        <div className="container">
          <div className="row">
            <div className="col" style={{ marginTop: "20px" }}>
              <a className="projTitle">Project_Name </a>
            </div>
          </div>
        </div>
        <div className="row tabs">
          <div className="col-sm issueTab">
            <i className="far fa-scrubber" />
            <p>
              <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                Issues
              </Link>
            </p>
          </div>
        </div>
        <hr style={{ marginTop: "0px" }} />
      </div>
    </div>
  );
};

export default IssueHead;

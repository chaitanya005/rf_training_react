import React from "react";

const HomeIssues = ({ issues }) => {
  return (
      <div className="boxHead" style={{flexDirection: "column", background: "#fff", borderRadius: "0 0 5px 5px", padding: 0, border: "0.2px solid #d0d7de"}}>
          {issues && issues.map(issue => (
            <div className="flex issuesDiv" key={issue.id}>
              <div>
                  <input type="checkbox" style={{margin: "15px"}} />
                  <i className="far fa-scrubber icons issueIcon" ></i>
              </div>
              <div>
                  <div className="flex issueDetails">
                      <a className="issueName" href={`/issues/${issue.id}`}>{issue.title}</a>
                      <p className="issueLabel" style={{background: `${issue.bgColor}`, color: `${issue.fontColor}`}}>{issue.label}</p>
                      <div>{issue.assignee}</div>
                  </div>
                  <p className="issueId">#{issue.id}</p>
              </div>
          </div>
          ))}
    </div>
  );
};

export default HomeIssues;

import React, { useEffect, useState } from "react";
import moment from "moment";

const HomeIssues = ({ issues }) => {  
  return (
      <div className="boxHead" style={{flexDirection: "column", background: "#fff", borderRadius: "0 0 5px 5px", padding: 0, border: "0.2px solid #d0d7de"}}>
          {issues && issues.length == 0 ? <div className="boxBody"><h3>No results matched your search..</h3></div>: ''}
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
                <DateTime id={issue.id} date={issue.openedAt} posted_by={issue.posted_by} />
              </div>
          </div>
          ))}
    </div>
  );
};


const DateTime = ({ id, date, posted_by }) => {
  const nDate = new Date(date).toLocaleDateString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
  let nTime = new Date(date).toTimeString('en-US', {
    timeZone: 'Asia/Calcutta'
  }); 
  
  nTime = nTime.replace(' GMT+0530 (India Standard Time)','')
  
  let newdate = moment(`${nDate}, ${nTime}'`, 'MM/DD/YYYY, h:mm:ss').fromNow()

  return (
    <p className="issueId">#{id} opened {newdate} by {posted_by}</p>
  )
}

export default HomeIssues;

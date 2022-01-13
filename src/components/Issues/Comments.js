import React from "react";

const Comments = ({ comment }) => {
  return (
    <React.Fragment>
      {comment.comments !== null && (
        <>
          <div className="col-sm-2">{comment.user_posted_by}</div>
          <div className="col-sm-8">
            <table
              className="table"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead style={{ background: "#ddf4ff" }}>
                <tr>
                  <th
                    style={{
                      border: "1px solid #a6d9ff",
                      borderRadius: "5px 5px 0 0",
                    }}
                    scope="col"
                  >
                    {comment.user_posted_by}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #a6d9ff",
                      borderRadius: "0 0 5px 5px",
                    }}
                    scope="row"
                    dangerouslySetInnerHTML={{ __html: comment.comments }}
                  ></td>
                </tr>
              </tbody>
            </table>
            {/* <div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: 'px 0'}}>
                <i class="far fa-tag" style={{color: '#57606a'}}></i>
                <b>chaitanya005</b>
                <div style={{color: '#57606a'}}> added the documentation label 19 minutes ago</div>
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '30px 0'}} >
              <i class="far fa-user" style={{color: '#57606a'}}></i>
                <b>chaitanya005</b>
                <div style={{color: '#57606a'}}> assigned this 1 minute ago</div>
              </div>
            </div> */}
          </div>
          <div className="col-sm-2"></div>
        </>
      )}
    </React.Fragment>
  );
};

export default Comments;

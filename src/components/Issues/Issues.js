import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import IssueHead from "../IssueHead";
import Comments from "./Comments";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import ReactQuill, { Quill } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
import Select from "react-select";

const Issues = () => {
  let { id } = useParams();
  const [comments, setComments] = useState(null);
  const [input, setInput] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [labels, setLabels] = useState(null);
  const [users, setUsers] = useState(null);
  const [optionUsers, setOptionUsers] = useState([]);
  const [optionLabels, setOptionLabels] = useState([]);

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      all: "unset",
      fontWeight: "800",
      fontSize: "14px",
      padding: 0,
    }),
    placeholder: (styles) => ({ ...styles, color: "#57606a" }),
    ValueContainer: (styles) => ({ ...styles, padding: 0 }),
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/issues/${id}`)
      .then((res) => {
        console.log(res);
        setComments(res.data.issue);
        setLabels(res.data.labels);
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log(users, labels)
    users &&
      users.map((user) =>
        setOptionUsers((prev) => [
          ...prev,
          { value: user.id, label: user.username },
        ])
      );
    labels &&
      labels.map((label) =>
        setOptionLabels((prev) => [
          ...prev,
          { value: label.id, label: label.name },
        ])
      );
  }, [users]);

  const handleComment = () => {
    axios
      .post("http://localhost:4000/create-comment", {
        id,
        input,
        username: user.username,
      })
      .then((res) => {
        console.log(res);
        // navigate(`/issues/${id}`)
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (selected, type) => {
    console.log(selected, type);
    if (type == "label") {
      axios
        .post("http://localhost:4000/update-label", {
          labelId: selected.value,
          issueId: id,
        })
        .then((res) => {
          console.log(res)
          window.location.reload()
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:4000/update-assignee", {
          assigneeId: selected.value,
          issueId: id,
        })
        .then((res) => {
          console.log(res)
          window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="../css/home.css" />
      </Helmet>
      <IssueHead />
      <div className="container">
        <div className="row">
          <div>
            <div
              style={{ display: "flex", letterSpacing: "0.5px", gap: "0.4rem" }}
            >
              <h2 style={{ fontWeight: 400 }}>
                {comments && comments[0].title}
              </h2>
              <h2 style={{ color: "#57606a", fontWeight: "300" }}>
                #{comments && comments[0].id}
              </h2>
            </div>
            <div>
              <button
                className="btn btn-success"
                style={{
                  fontWeight: 600,
                  background: "#2da44e",
                  borderRadius: "20px",
                  padding: "6px 18px",
                }}
              >
                <i className="far fa-scrubber"> Open</i>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-2">{comments && comments[0].posted_by}</div>
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
                    {comments && comments[0].posted_by}
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
                    dangerouslySetInnerHTML={{
                      __html: comments && comments[0].comment,
                    }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-2">
            {/* <select
              className="form-select"
              id="label"
              aria-label="Default select example"
              style={{
                all: "unset",
                color: "#57606a",
                fontWeight: 600,
                fontSize: "14px",
              }}
              name="label"
              //   onChange="handleLabel"
            >
              <option value={0}>Labels</option>
            </select>
            <hr />
            <select
              className="form-select"
              id="label"
              aria-label="Default select example"
              style={{
                all: "unset",
                color: "#57606a",
                fontWeight: 600,
                fontSize: "14px",
              }}
              name="assignee"
              //   onChange="handleLabel"
            >
              <option value={0}>Assignees</option>
            </select> */}
            <Select
              value={optionLabels.value}
              onChange={(value) => handleChange(value, "label")}
              options={optionLabels}
              placeholder="Labels"
              styles={colourStyles}
            />
            {comments && (
              <p
                style={{
                  background: `${comments[0].label_bgColor}`,
                  padding: "2px 8px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  margin: 0,
                  marginTop: "10px",
                  color: `${comments[0].label_fontColor}`,
                  width: "fit-content",
                }}
              >
                {" "}
                {comments[0].label_name}
              </p>
            )}
            <hr />
            <Select
              value={optionUsers.value}
              onChange={(value) => handleChange(value, "Assignee")}
              options={optionUsers}
              placeholder="Assignee"
              styles={colourStyles}
            />
            {comments && <p style={{ fontSize: "14px" }}>{comments[0].assignee}</p>}
          </div>
          {comments &&
            comments.map((comment) => (
              <>
                <Comments comment={comment} key={comment} />
              </>
            ))}
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <Editor input={input} setInput={setInput} />
            <button
              className="btn btn-success"
              style={{ backgroundColor: "#2da44e" }}
              onClick={handleComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
				.ql-toolbar {
					border-radius: 5px 5px 0 0;
				}

				.ql-container {
					height: 100px;
					border-radius: 0 0 5px 5px;
					background-color: #f6f8fa;
					font-size: 1rem;
				}

        .css-1hb7zxy-IndicatorsContainer {
					display: none;
				}
			`}
      </style>
    </div>
  );
};

export default Issues;

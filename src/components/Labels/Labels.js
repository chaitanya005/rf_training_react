import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IssueHead from "../IssueHead";
import LabelsTable from "./LabelsTable";


const Labels = () => {
  const [newLabel, setNewLabel] = useState({
    name: "",
    description: "",
    colorCode: "",
  });

  const [labels, setLabels] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/labels")
      .then((res) => {
        // console.log(res);
        setLabels(res.data.labels);
      })
      .catch((err) => console.log(err));
  }, []);

  const createLabel = () => {
    axios
      .post("http://localhost:4000/create-label", {
        label_name: newLabel.name,
        description: newLabel.description,
        color_code: newLabel.colorCode,
      })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <IssueHead />
      <div style={{ marginTop: "30px" }}>
        <div
          className="container"
          style={{
            background: "#f6f8fa",
            padding: "1rem",
            border: "1px solid #d0d7de",
            borderRadius: "5px",
            width: "fit-content",
          }}
        >
          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
              }}
            >
              <div
                className="col-sm-10"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    {" "}
                    <b>Label Name</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Label Name"
                    name="label_name"
                    style={{
                      background: "#f6f8fa",
                      border: "1px solid #d0d7de",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      marginRight: "15px",
                    }}
                    value={newLabel.name}
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, name: e.target.value })
                    }
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    {" "}
                    <b>Description</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    style={{
                      background: "#f6f8fa",
                      border: "1px solid #d0d7de",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      marginRight: "15px",
                    }}
                    value={newLabel.description}
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, description: e.target.value })
                    }
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>
                    {" "}
                    <b>Color</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Color code"
                    name="color_code"
                    style={{
                      background: "#f6f8fa",
                      border: "1px solid #d0d7de",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      marginRight: "15px",
                    }}
                    value={newLabel.colorCode}
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, colorCode: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <button
                  className="btn btn-success issueBtn"
                  onClick={createLabel}
                >
                  Create Label
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: "30px" }}>
          <table className="table labelTable">
            <thead style={{ padding: "1rem" }}>
              <tr style={{ borderBottom: "1px solid #d0d7de" }}>
                <td style={{ border: "none" }}>Labels</td>
              </tr>
            </thead>
            {labels &&
              labels.map((label) => (
                <LabelsTable label={label} key={label.name}/>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Labels;

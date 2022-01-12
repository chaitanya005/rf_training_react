import React from "react";

const LabelsTable = ({label}) => {
  return (
    <>
      <tbody style={{ background: "#fff" }}>
        <tr>
          <td>
            <div
              className="issueLabel"
              style={{
                padding: "2px 12px",
                fontSize: "14px",
                color: `${label.font_color}`,
                background: `${label.bg_color}`,
                width: 'fit-content'
              }}
            >
              {label.name}
            </div>
          </td>
          <td>
            <div
              style={{
                color: "#57606a !important",
                fontSize: "14px",
              }}
            >
              {label.description}
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default LabelsTable;

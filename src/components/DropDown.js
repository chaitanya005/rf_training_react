import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const DropDown = ({
  labels,
  users,
  handleFilter,
  name,
  bgColor,
  fontColor,
  assignee,
  issueDropDown,
}) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          className={!issueDropDown ? "homeDropDown" : "issueDropDown"}
        >
          Labels
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {labels &&
            labels.map((label) => (
              <React.Fragment key={label.id}>
                <Dropdown.Item onClick={() => handleFilter(label.id, "label")} style={{display: 'flex', gap: '0.3rem', alignItems: 'center'}}>
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: `${label.bg_color}`,
                      borderRadius: "50%",
                    }}
                  ></div>
                  {label.name}
                </Dropdown.Item>
              </React.Fragment>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <p
        style={{
          background: `${bgColor}`,
          padding: "2px 8px",
          borderRadius: "10px",
          fontSize: "12px",
          margin: 0,
          marginTop: "10px",
          color: `${fontColor}`,
          width: "fit-content",
        }}
      >
        {" "}
        {name}
      </p>
      <hr />
      <Dropdown>
        <Dropdown.Toggle
          className={!issueDropDown ? "homeDropDown" : "issueDropDown"}
        >
          Assignee
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {users &&
            users.map((user) => (
                <Dropdown.Item  key={user.id} onClick={() => handleFilter(user.id, "assigne")}>
                  {user.username}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <p style={{ fontSize: "14px" }}>{assignee}</p>
    </>
  );
};

export default DropDown;

import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    axios
      .post("http://localhost:4000/logout")
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", null);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark nav"
      style={{ backgroundColor: "#24292f !important" }}
    >
      <div className="container-fluid" style={{ padding: "12px 24px" }}>
        <a className="navbar-brand" href="#">
          {" "}
          <img
            src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"
            style={{ width: "35px" }}
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <input
              className="form-control py-2 navSearch"
              id="example-search-input"
              type="text"
              placeholder="Search or jump to..."
            />
          </div>
        </div>
        {user && (
          <div>
            <button
              onClick={handleLogout}
              className="logout"
              style={{ background: "#000" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

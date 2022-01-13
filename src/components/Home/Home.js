import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIssues from "./HomeIssues";
import Pagination from "./Pagination";
import IssueHead from "../IssueHead";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropDown from "../DropDown";
import moment from "moment";

const Home = () => {
  const [issues, setIssues] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [isFilterResults, setIsFilterResults] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [currIssues, setCurrentIssues] = useState(null);
  const [issuesPerPage, setIssuesPerPage] = useState(2);
  const [labels, setLabels] = useState(null);
  const [users, setUsers] = useState(null);
  const [optionUsers, setOptionUsers] = useState([]);
  const [optionLabels, setOptionLabels] = useState([]);
  //   const [lastPage, setLastPage] = useState(null);
  //   const [totalPages, setTotalPages] = useState(null);

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      background: "none",
      border: "none",
      color: "grey",
    }),
    placeholder: (styles) => ({ ...styles, color: "#57606a" }),
    ValueContainer: (styles) => ({ ...styles, padding: 0 }),
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/home")
      .then((res) => {
        // console.log(res.data.issues)
        setIssues(res.data.issues);
        setLabels(res.data.labels);
        setUsers(res.data.users);
        setIsFilterResults(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (issues) {
      setCurrPage(1);
      const indexOfLastIssue = 1 * issuesPerPage;
      const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
      let paginateIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);
      setCurrentIssues(paginateIssues);
    }
  }, [issues]);

  const handleSearch = (event) => {
    if (event.key == "Enter") {
      axios
        .get(`http://localhost:4000/home?search_keyword=${searchKey}`)
        .then((res) => {
          setIssues(res.data.filterdIssues);
          setIsFilterResults(true);
        })
        .catch((err) => console.log(err));
      event.target.value = "";
    }
  };

  const handleFilter = (id, type) => {
    console.log(id, type);
    if (type == "label") {
      axios
        .get(`http://localhost:4000/home/search?label_id=${id}`)
        .then((res) => {
          setIssues(res.data.filterdIssues);
          setIsFilterResults(true);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:4000/home/search?assignee_id=${id}`)
        .then((res) => {
          setIssues(res.data.filterdIssues);
          setIsFilterResults(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <IssueHead />
      <div className="col-sm-11 subDiv">
        <div>
          <input
            className="filterSearch"
            type="text"
            placeholder="Search"
            name={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={(e) => handleSearch(e)}
          />
        </div>
        <div>
          <div>
            <Link className="p-2 btn btn-light filterBtns" to="/labels">
              <i className="fas fa-tag icons" />
              Labels {labels && labels.length}
            </Link>
            <button className="p-2 btn btn-light btnMilestone">
              Milestones 0
            </button>
          </div>
        </div>
        <div>
          <Link className="btn btn-success issueBtn" to="/new-issues">
            New Issue
          </Link>
        </div>
      </div>
      {isFilterResults && (
        <a
          className="col-sm-11"
          href="/"
          style={{
            marginLeft: "4%",
          }}
        >
          <i className="fas fa-window-close"></i>
          Clear Filters
        </a>
      )}
      <div className="col-sm-11" style={{ margin: "auto", marginTop: "20px" }}>
        <div className="boxHead">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" style={{ marginRight: "15px" }} />
            <i className="far fa-scrubber icons" /> Open
          </div>
          <div style={{ display: "flex" }}>
            <DropDown
              labels={labels}
              users={users}
              issues={issues}
              setIssues={setIssues}
              setIsFilterResults={setIsFilterResults}
              handleFilter={handleFilter}
            />
          </div>
        </div>

        <HomeIssues issues={currIssues} />
        {currIssues && currIssues.length > 0 && (
          <Pagination
            issues={issues}
            currPage={currPage}
            setCurrentIssues={setCurrentIssues}
            setCurrPage={setCurrPage}
            issuesPerPage={issuesPerPage}
          />
        )}
      </div>
      <style>
        {`
        .css-1hb7zxy-IndicatorsContainer {
					display: none;
				}
			`}
      </style>
    </React.Fragment>
  );
};

export default Home;

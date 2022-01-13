import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Pagination = ({
  issues,
  currPage,
  setCurrentIssues,
  setCurrPage,
  issuesPerPage
}) => {

  const pageNumbers = []

  if (issues) {
    for (let i = 1; i <= Math.ceil(issues.length / issuesPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const handlePagination = (page) => {
    setCurrPage(page)
    const indexOfLastIssue = page *  issuesPerPage
    const indexOfFirstIssue = indexOfLastIssue  - issuesPerPage
    let paginateIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue)
    setCurrentIssues(paginateIssues)
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={"page-item" + (currPage == 1 ? ' disabled': '')}>
            <a
              className="page-link"
              onClick={() => handlePagination(currPage - 1)}
            >
              <span aria-hidden="true"> &laquo; </span>Previous
            </a>
          </li>
          {pageNumbers.map((page) => (
              <li className="page-item" key={page}>
                <a
                  onClick={() => handlePagination(page)}
                  className={
                    "page-link" + (currPage == page ? " page-link-active" : "")
                  }
                >
                  {page}
                </a>
              </li>
            ))}
          {issues && <li className={"page-item" + (Math.ceil(issues.length / issuesPerPage) == currPage ? ' disabled': '')}>
            <a
              className="page-link"
              onClick={() => handlePagination(currPage + 1)}
            >
              Next <span aria-hidden="true"> &raquo; </span>
            </a>
          </li>}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

import React from "react";

const Pagination = ({currPage, lastPage, totalPages}) => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
                <span aria-hidden="true"> &laquo; </span>Previous
            </a>
          </li>
          {totalPages && totalPages.map(page => (
             <li className="page-item" key={page}>
              <a 
                href={`http://localhost:3000?page=${page}`}
                className={"page-link" + (currPage == page ?  " page-link-active": '')}
              >
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#">
              Next <span aria-hidden="true"> &raquo; </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

import React from "react";

const Pagination = ({ questionsList, questionsPerPage, setCurrentPage }) => {
  function handleClick(number) {
    setCurrentPage(number);
  }

  const pageNumbers = [];
  const questionsInCurrentPage = Math.ceil(
    questionsList.length / questionsPerPage
  );

  for (let i = 1; i <= questionsInCurrentPage; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={() => handleClick(number)}
        className="m-3 p-3"
      >
        {number}
      </li>
    );
  });

  return (
    <div>
      <ul id="page-numbers">{renderPageNumbers}</ul>
    </div>
  );
};

export default Pagination;


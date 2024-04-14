import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageButtons = () => {
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pageButtons = [];

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-white hover:bg-[#A5BB08] dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 ${
            i === currentPage
              ? "border-black dark:border-white dark:bg-black bg-[#A5BB08] dark:text-white pointer-events-none"
              : ""
          }`}
          title={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="container mx-auto px-4 ">
      <nav
        className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
        aria-label="Pagination"
      >
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
          title="Previous Page"
        >
          <span className="sr-only">Previous Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="block w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {/* Page Buttons */}
        {renderPageButtons()}
        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 ${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
          title="Next Page"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="block w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageButtons = () => {
    // Adapter le nombre de boutons de pages visibles selon la taille de l'écran
    const getVisiblePages = () => {
      // On utilise window.innerWidth si disponible (côté client)
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
      if (screenWidth < 480) return 3; // Mobile
      if (screenWidth < 768) return 4; // Tablet
      return 5; // Desktop
    };

    const visiblePages = getVisiblePages();
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pageButtons = [];

    // First page button with ellipsis if needed
    if (startPage > 1) {
      pageButtons.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className="flex w-8 h-8 sm:w-10 sm:h-10 mx-1 justify-center items-center rounded-full border hover:bg-[#A5BB08] text-black"
          title="First Page"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pageButtons.push(
          <span key="ellipsis1" className="mx-1 flex items-center justify-center">
            …
          </span>
        );
      }
    }

    // Numbered page buttons
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handlePageChange(i);
            document.getElementById("products")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className={`flex w-8 h-8 sm:w-10 sm:h-10 mx-1 justify-center items-center rounded-full border text-sm sm:text-base ${
            i === currentPage
              ? "border-gray-400 bg-[#A5BB08] text-white font-bold pointer-events-none shadow-md"
              : "border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          }`}
          title={`Page ${i}`}
        >
          {i}
        </motion.button>
      );
    }

    // Last page button with ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="ellipsis2" className="mx-1 flex items-center justify-center">
            …
          </span>
        );
      }
      
      pageButtons.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="flex w-8 h-8 sm:w-10 sm:h-10 mx-1 justify-center items-center rounded-full border hover:bg-[#A5BB08] text-black"
          title="Last Page"
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 mb-8">
      <nav
        className="flex flex-wrap justify-center items-center gap-1 py-4"
        aria-label="Pagination"
      >
        {/* Previous Page Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:bg-gray-50 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
          title="Page précédente"
        >
          <span className="sr-only">Page précédente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.button>

        {/* Page Buttons - wrapped in a scrollable container for very small screens */}
        <div className="flex overflow-x-auto py-1 px-1 max-w-[calc(100vw-120px)] no-scrollbar">
          {renderPageButtons()}
        </div>

        {/* Next Page Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:bg-gray-50 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
          title="Page suivante"
        >
          <span className="sr-only">Page suivante</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.button>
      </nav>
    </div>
  );
};



export default Pagination;

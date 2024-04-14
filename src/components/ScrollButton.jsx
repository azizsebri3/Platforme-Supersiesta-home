import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "../output.css";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = window.pageYOffset;
    setVisible(scrolled > 1500); // Changed from 1500 to 0
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <button
      id="to-top-button"
      onClick={scrollToTop}
      title="Go To Top"
      className={`fixed z-50 bottom-10 left-10 s animate-bounce p-3 border-0 w-10 h-10 rounded-full shadow-md bg-[#A5BB08] hover:bg-[#192A7A] text-white text-lg font-semibold transition-colors duration-300 ${
        visible ? "" : "hidden"
      }`} // Added conditional class based on visibility and animate-bounce for the jump effect
    >
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
      </svg>
      <span className="sr-only">Go to top</span>
    </button>
  );
};

export default ScrollButton;

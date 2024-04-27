import React from "react";
import "../output.css"; // Make sure you include Tailwind CSS in output.css
const Loading = ({ active }) => {
  return (
    <div className={`loading-spinner-overlay ${active ? 'active' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;

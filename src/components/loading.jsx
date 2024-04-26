// SplashScreen.js
import React from "react";
import "../output.css";
const Loading = ({active}) => {
  return (
    <div className={`loading-spinner-overlay ${active ? 'active' : ''}`}>
      <div class="spinner"></div>
    </div>
  );
};

export default Loading;

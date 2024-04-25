// SplashScreen.js
import React from "react";
import "../output.css";
const Loading = ({active}) => {
  return (
    <div className={`loading-spinner-overlay ${active ? 'active' : ''}`}>
      <div class="rounded-full h-10 w-10 bg-[#A2BA02] animate-ping"></div>
    </div>
  );
};

export default Loading;

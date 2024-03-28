// SplashScreen.js
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "../output.css"
const Loading = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;

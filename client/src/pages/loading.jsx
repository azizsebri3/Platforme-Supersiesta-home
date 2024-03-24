// SplashScreen.js
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Backdrop
      sx={{ color: "#A5BB08", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true} // Always open while loading
      onClick={() => {}} // Disable click while loading
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

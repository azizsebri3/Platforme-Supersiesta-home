// OtpContext.js
import React, { createContext, useContext, useState } from "react";

const OtpContext = createContext();

export const useOtp = () => useContext(OtpContext);

export const OtpProvider = ({ children }) => {
  const [otp, setOtp] = useState("");
  const [otpCorrect , setOtpCorrect] = useState(false)

  return (
    <OtpContext.Provider value={{ otp, setOtp , setOtpCorrect ,otpCorrect}}>
      {children}
    </OtpContext.Provider>
  );
};

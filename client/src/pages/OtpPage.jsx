import React, { useState } from "react";
import "../output.css";
import axios from "axios";
import DialogCustomAnimation from "../components/dialog";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartProvider";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useOtp } from "../context/OtpContext";

const OtpPage = ({ email }) => {
  const { otp , setOtpCorrect} = useOtp();
  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]); // State to hold values of OTP inputs
  const [error, setError] = useState(""); // State to handle error message
  const navigate = useNavigate();

  const handleCheckOtp = () => {
    const enteredOtp = otpInputs.join("");
    // Check if the entered OTP matches the OTP received as a prop
    if (enteredOtp !== otp) {
      setError("Le code OTP entré est incorrect.");
      return;
    } else {
      setOtpCorrect(true)
      navigate('/checkout', { state: { fromCart: true } });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-transparent py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>vérification de l'E-mail</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Nous avons envoyé un code à votre email {email}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {otpInputs.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => {
                  const updatedOtpInputs = [...otpInputs];
                  updatedOtpInputs[index] = e.target.value;
                  setOtpInputs(updatedOtpInputs);
                }}
                className="w-12 h-12 text-center border rounded-md focus:ring-1 ring-[#a5bb08]"
                placeholder="0"
              />
            ))}
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <button
            onClick={handleCheckOtp}
            className="w-full px-6 py-3 mt-4 bg-[#a5bb08] text-white rounded-md hover:bg-[#87A922]"
          >
            Vérifiez Le Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;

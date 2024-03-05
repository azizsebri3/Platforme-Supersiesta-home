import React from "react";
import { useLocation } from "react-router-dom";
import "../output.css";
import logo from "../assets/logo.png";

const Footer = () => {
  const location = useLocation();

  // Check if the current path is "/cart"
  const isCartPage = location.pathname === "/cart";

  // Render the footer only if not on the "/cart" page
  if (isCartPage) {
    return null;
  }
  return (
    <>
    <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
    <footer className="relative mt-20 bg-white px-4 pt-20">
      <div className=" absolute -top-10 left-1/2 h-16 w-17 -translate-x-1/2 rounded-xl  bg-white p-2">
        <img
          className="h-full object-contain"
          src={logo}
          alt=""
        />
      </div>
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 justify-center items-center   flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <a href="#" className="font-medium text-black hover:text-[#a5bb08] hover:underline">
          Demo
        </a>
        <a href="#" className="font-medium text-black hover:text-[#a5bb08] hover:underline">
          Support
        </a>
        <a href="#" className="font-medium text-black hover:text-[#a5bb08] hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="font-medium text-black hover:text-[#a5bb08] hover:underline">
          Terms &amp; Conditions
        </a>
      </nav>
      <p className="py-10 text-center text-gray-300">
        © 2024 Conforama | All Rights Reserved
      </p>
    </footer>
    </>
  );
};

export default Footer;

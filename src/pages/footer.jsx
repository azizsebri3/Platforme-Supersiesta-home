import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../output.css";
import logo from "../assets/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookSquare,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const location = useLocation();

  // // Check if the current path is "/cart"
  // const isCartPage = location.pathname === "/cart";

  // // Render the footer only if not on the "/cart" page
  // if (isCartPage) {
  //   return null;
  // }
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="relative bg-white pt-8 pb-6">
      <hr class="w-48 h-1 mb-4 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-gray-700">
              Restez Connecté !
            </h4>
            <h5 className="text-lg mt-2 mb-4 text-gray-600">
              Suivez-nous sur nos réseaux sociaux pour des mises à jour et du
              support.
            </h5>
            <div className="mt-6 flex flex-row  lg:mb-0 mb-6">
              <button
                className="bg-white text-rose-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </button>
              <button
                className="bg-white text-blue-700 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </button>
              <button
                className="bg-white text-green-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <ul className="list-unstyled">
                  <li>
                    {" "}
                    <Link
                      to="/contact"
                      onClick={scrollUp}
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/contact-us?ref=njs-profile"
                    >
                      Contactez Nous
                    </Link>
                  </li>
                  <Link
                    to="/propos"
                    onClick={scrollUp}
                    className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                  >
                    A propos de nous
                  </Link>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <ul className="list-unstyled">
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-gray-500 hover:text-gray-800"
                target="_blank"
              >
                {" "}
                Aziz Sebri
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

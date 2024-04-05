import React, { useState, useRef, useEffect } from "react";
import { RiHome4Line } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiBadgeCheck } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import "../output.css";

const Drawer = () => {
  const { setProductSelected } = useAppContext();
  const navigate = useNavigate();
  let location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track if drawer is open

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    // Toggle body class to disable scrolling
    document.body.classList.toggle("overflow-hidden");
  };

  // Close drawer when a link or button inside it is clicked
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const NavItems = [
    { item1: "", item2: "Accueil" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];
  const NavIcons = [
    <RiHome4Line />,
    <BiSolidCategoryAlt />,
    <BiBadgeCheck />,
    <MdContactPhone />,
  ]; // Define icons for navigation items

  const categories = [
    "Tous Les Matelas",
    "Matelas a Ressort",
    "Matelas en Latex",
    "Matelas orthopédique",
    "Matelas en Mousse",
  ];

  return (
    <div className="flex">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <label
        htmlFor="drawer-toggle"
        className="absolute top-3 left-2 z-[9999] inline-block p-4 transition-all duration-500 bg-[#192a7a] rounded-lg peer-checked:rotate-180 peer-checked:left-64"
      >
        <div className="w-6 h-1 mb-3 z-[9999] rotate-45 bg-white rounded-lg" />
        <div className="w-6 h-1 -rotate-45 z-[9999] bg-white rounded-lg" />
      </label>
      <div
        className={`fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white shadow-lg`}
      >
        <div className="px-6 py-4 flex flex-row items-center">
          <img src={logo} className="w-12 h-13 mr-2" alt="Logo" />
          <h2 className="text-2xl ml-2 font-bold">Comforama</h2>
        </div>
        <ul className="mt-4 ml-8 ">
          {/* Render NavItems */}
          {NavItems.map((item, index) => (
            <li key={index} className="mb-2 text-xl  list-disc">
              <Link
                to={`/${item.item1}`}
                className={
                  location.pathname === `/${item.item1}` ? "text-[#192a7a] font-bold underline" : ""
                }
                onClick={closeDrawer}
              >
                {item.item2}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mt-6 ml-3 text-[#a5bb08]">
          Catégories
        </h3>
        <ul className="mt-2 ml-5">
          {/* Render categories */}
          {categories.map((category, index) => (
            <li key={index} className="mb-2 text-[19px] underline">
              <button
                onClick={() => {
                  setProductSelected(category);
                  closeDrawer();
                  {
                    location.pathname != "/" && navigate("/");
                  }
                }}
                className="text-gray-700 hover:text-gray-900 underline"
              >
               ➡️ {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;

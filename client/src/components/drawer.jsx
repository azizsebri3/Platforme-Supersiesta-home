import React, { useState, useRef, useEffect } from "react";
import { RiHome4Line } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiBadgeCheck } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const Drawer = () => {
  const { setProductSelected } = useAppContext();
  const drawerRef = useRef(null);
  const [isProduitsOpen, setIsProduitsOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const NavItems = [
    { item1: "", item2: "Accueil" },
    { item1: "", item2: "Catégories" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];
  const NavIcons = [
    <RiHome4Line />,
    <BiSolidCategoryAlt />,
    <BiBadgeCheck />,
    <MdContactPhone />,
  ]; // Define icons for navigation items

  useEffect(() => {
    const handleScroll = () => {
      if (isProduitsOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };

    handleScroll();

    return () => {
      document.body.style.overflow = "unset"; // Reset overflow style when component unmounts
    };
  }, [isProduitsOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        if (isProduitsOpen) {
          setIsProduitsOpen(!isProduitsOpen);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProduitsOpen]);

  const handleProduitsClick = () => {
    setIsProduitsOpen(!isProduitsOpen);
    setOpenCat(false); // Toggle dropdown visibility
  };

  const categories = [
    "Matelas a Ressort",
    "Matelas en Latex",
    "Matelas orthopedique",
  ];

  return (
    <div className="flex ">
      <div className="relative" ref={drawerRef}>
        <input
          type="checkbox"
          id="burger"
          className="relative sr-only peer"
          onClick={handleProduitsClick}
        />
        <label
          htmlFor="burger"
          className={`relative top-0 left-0 inline-block p-4 transition-all duration-500   ${
            isProduitsOpen ? "peer-checked:left-64" : ""
          }`}
        >
          <label className="burger" for="burger" >
          <input type="checkbox" id="burger" />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </label>
        <div
          className={`fixed top-0 left-0 z-[9999] w-64 h-full transition-all duration-500 transform ${
            isProduitsOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white shadow-lg`}
        >
          <div className="px-8 py-4">
            <Link
              to={"/"}
              className="flex items-center text-xl font-bold text-white"
            >
              <span className="text-colori  font-bold text-2xl text-black">
                Conforama
              </span>
              <img src={logo} className=" w-8 h-auto ml-2" alt="Company Logo" />
            </Link>
            <ul className="flex-col mt-20 p-7 hover:text-white">
              {NavItems.map((item, index) => (
                <li key={index} className="mb-6 text-2xl flex ">
                  {item.item2 === "Catégories" ? ( // Check if the item is "Produits"
                    <>
                      <div className="relative">
                        <button
                          className="text-black  text-xl hover:text-[#A5BB08] transition-colors duration-300 flex items-center"
                          onClick={() => setOpenCat(!openCat)} // Toggle dropdown visibility on click
                        >
                          {NavIcons[index]} {/* Icon */}
                          <span className="ml-2">{item.item2}</span>{" "}
                          {/* Item text */}
                        </button>
                        {openCat && ( // Render dropdown menu if isProduitsOpen is true
                          <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700">
                              {categories.map((category, index) => (
                                <li key={index}>
                                  <button
                                    onClick={() => {
                                      setProductSelected(category);
                                      handleProduitsClick();
                                    }}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    {category}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={`${item.item1}`}
                      className="text-gray-800 font-mono text-xl hover:text-[#A5BB08] transition-colors duration-300 flex "
                      onClick={handleProduitsClick} // Close the drawer when any list item is clicked
                    >
                      {NavIcons[index]} {/* Icon */}
                      <span className="ml-2">{item.item2}</span>{" "}
                      {/* Item text */}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;

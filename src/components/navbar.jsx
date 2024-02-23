import React, { useState, useEffect } from "react";
import { MdShoppingCart } from "react-icons/md"; // Importing the shopping cart icon
import "../output.css";
import Drawer from "./drawer";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  const NavItems = [
    { item1: "", item2: "Accueil" },
    { item1: "Catégories", item2: "Catégories" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];
  const [showDrawer, setShowDrawer] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowDrawer(window.innerWidth <= 756);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleCategoriesHover = () => {
    setIsCategoriesHovered(true);
  };

  const handleCategoriesLeave = () => {
    setIsCategoriesHovered(false);
  };

  return (
    <header className="fixed w-full bg-[#a5bb08] mb-10">
      <nav
        className={`flex container  px-4 items-center justify-between ${
          showDrawer ? "py-2" : "py-4"
        }`}
      >
        <div className="flex items-center">
          {showDrawer && <Drawer />}
          <ul
            className={`md:flex md:space-x-4 ${
              showDrawer ? "hidden" : "block"
            }`}
          >
            {NavItems.map((item, index) => (
              <li key={index} className="text-white font-semibold">
                {item.item2 === "Catégories" ? (
                  <div
                    className="relative"
                    onMouseEnter={handleCategoriesHover}
                    onMouseLeave={handleCategoriesLeave}
                  >
                    <a
                      href=""
                      className="text-xl p-4 font-semibold hover:text-[#20327c] transition-colors duration-300"
                    >
                      {item.item2}
                    </a>
                    {isCategoriesHovered && (
                      <div className="absolute mt-4 top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul className="py-3 text-sm text-gray-700 ">
                          <li>
                            <button className="block px-4 py-2 hover:text-[#A5BB08]  hover:bg-gray-100">
                              MATELAS RESSORTS
                            </button>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:text-[#A5BB08]  hover:bg-gray-100"
                            >
                              MATELAS MOUSSE
                            </a>
                          </li>
                          <li>
                            <button className="block px-4 py-2 hover:text-[#A5BB08]  hover:bg-gray-100">
                              MEUBLE
                            </button>
                          </li>
                          <li>
                            <button className="block px-4 py-2 hover:text-[#A5BB08] hover:bg-gray-100">
                              LINGE DE LIT
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={`${item.item1}`}
                    className="text-xl p-4 font-semibold hover:text-[#20327c] transition-colors duration-300"
                  >
                    {item.item2}
                  </Link>
                )}
              </li>
            ))}
            <li>
              {" "}
              <MdShoppingCart className="text-white text-3xl pt-2 cursor-pointer" />
            </li>
          </ul>
        </div>
        <div className={`flex ${showDrawer ? "items-end" : "items-center"}`}>
          {/* Conditional class based on whether the drawer is shown */}
          {/* Logo with text */}
          <Link
            to={"/"}
            className="flex items-center text-xl font-bold text-white"
          >
            <span className="text-colori font-bold text-2xl text-black">
              Conforama
            </span>
            <img src={logo} className=" w-8 h-auto ml-2" alt="Company Logo" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

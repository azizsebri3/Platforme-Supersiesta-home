import React, { useState } from "react";
import { RiHome4Line } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiBadgeCheck } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Drawer = () => {
  const [isProduitsOpen, setIsProduitsOpen] = useState(false); // State to manage dropdown visibility
  const NavItems = [
    { item1: "", item2: "Accueil" },
    { item1: "Catégories", item2: "Catégories" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];
  const NavIcons = [
    <RiHome4Line />,
    <BiSolidCategoryAlt />,
    <BiBadgeCheck />,
    <MdContactPhone />,
  ]; // Define icons for navigation items

  const handleProduitsClick = () => {
    setIsProduitsOpen(!isProduitsOpen); // Toggle dropdown visibility
  };

  return (
    <div className="flex z-20 ">
      <div className="relative">
        <input
          type="checkbox"
          id="drawer-toggle"
          className="relative sr-only peer"
          defaultChecked=""
        />
        <label
          htmlFor="drawer-toggle"
          className="relative top-0 left-0 inline-block p-4 transition-all duration-500 bg-[#192A7A] rounded-lg peer-checked:rotate-180 peer-checked:left-64"
        >
          <div className="w-6 h-1 mb-3  -rotate-45 bg-white rounded-lg" />
          <div className="w-6 h-1 rotate-45 bg-white rounded-lg" />
        </label>
        <div className="fixed top-0 left-0 z-[9999] w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
          <div className="px-8 py-4">
            <Link
              to={"/"}
              className="flex items-center text-xl font-bold text-white"
            >
              <span className="text-colori font-bold text-2xl text-black">
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
                          onClick={handleProduitsClick} // Toggle dropdown visibility on click
                        >
                          {NavIcons[index]} {/* Icon */}
                          <span className="ml-2">{item.item2}</span> {/* Item text */}
                        </button>
                        {isProduitsOpen && ( // Render dropdown menu if isProduitsOpen is true
                          <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700">
                              <li className="text-center ">CATÉGORIES</li>
                              <li>
                                <Link
                                  to={`${item.item1}`}
                                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A5BB08]"
                                >
                                  MATELAS RESSORTS
                                </Link>
                              </li>
                              <li>
                                <Link
                                  // to={}
                                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A5BB08]"
                                >
                                  MATELAS MOUSSE
                                </Link>
                              </li>
                              <li>
                                <Link
                                  // to={}
                                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A5BB08]"
                                >
                                  MEUBLE
                                </Link>
                              </li>
                              <li>
                                <Link
                                  // to={}
                                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#A5BB08]"
                                >
                                  LINGE DE LIT
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={`${item.item1}`}
                      className="text-gray-800 font-mono text-xl hover:text-[#A5BB08] transition-colors duration-300 flex "
                    >
                      {NavIcons[index]} {/* Icon */}
                      <span className="ml-2">{item.item2}</span> {/* Item text */}
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
import React, { useState, useEffect } from "react";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import "../output.css";
import Drawer from "../components/drawer";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ShopCard from "./cartitem";
import SearchBar from "../components/searchBar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useCart } from "../cartProvider "; // Import useCart hook

const Navbar = () => {
  const NavItems = [
    { item1: "", item2: "Accueil" },
    { item1: "Catégories", item2: "Catégories" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [Open, setOpen] = useState(false);
  const [OpenSearch, setOpenSearch] = useState(false);
  const { cartItems } = useCart(); // Use useCart hook to access cartItems state
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll

  const ctgs = ["MATELAS RESSORTS", "MATELAS MOUSSE", "MEUBLE", "LINGE DE LIT"];

  useEffect(() => {
    const checkScreenSize = () => {
      setShowDrawer(window.innerWidth <= 756);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Event listener for scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, []);

  const handleScroll = () => {
    // Detect if scrolled down enough to apply blur effect
    const isTop = window.scrollY < 10;
    if (isTop !== isScrolled) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  };

  const handleCategoriesHover = () => {
    setIsCategoriesHovered(true);
  };

  const handleCategoriesLeave = () => {
    setIsCategoriesHovered(false);
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header
        className={`fixed w-full bg-[#a5bb08] z-10 mb-10 ${
          isScrolled ? "backdrop-blur-lg" : ""
        }`}
      >
        <nav
          className={`flex container px-4 items-center justify-between py-4`}
        >
          <div className="flex items-center">
            {showDrawer && <Drawer />}
            <ul
              className={`md:flex md:space-x-4 ${showDrawer ? "hidden" : ""}`}
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
                            {ctgs.map((selected, index) => (
                              <li key={index}>
                                <Link
                                  to={"/propos"}
                                  className="block px-4 py-2 hover:text-[#A5BB08]  hover:bg-gray-100"
                                >
                                  {selected}
                                </Link>
                              </li>
                            ))}
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
            </ul>
          </div>
          <div className={`flex ${showDrawer ? "items-end" : "items-center"}`}>
            <Link
              to={"/cart"}
              className="flex mr-4 justify-center items-center relative"
            >
              <Badge badgeContent={totalItemsInCart} color="primary">
                <MdShoppingCart />
              </Badge>
            </Link>
            <button
              onClick={() => setOpenSearch(!OpenSearch)}
              className="flex mr-4 justify-center items-center"
            >
              <FaSearch className="text-white  hover:text-[#20327c] text-4xl pt-2   cursor-pointer  " />
            </button>
            <Link
              to={"/"}
              className="flex items-center text-xl font-bold text-white"
            >
              <span className="text-colori font-bold text-2xl text-black">
                Conforama
              </span>
              <img src={logo} className="w-8 h-auto ml-2" alt="Company Logo" />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

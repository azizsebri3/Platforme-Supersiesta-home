import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../output.css";
import Drawer from "../components/drawer";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "../context/cartProvider ";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ToggleButton from "../components/darkModeToggle";

const Navbar = () => {
  const NavItems = [
    { item1: "/", item2: "Accueil" },
    { item1: "Catégories", item2: "Catégories" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const { cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const ctgs = ["MATELAS RESSORTS", "MATELAS MOUSSE", "MEUBLE", "LINGE DE LIT"];

  // hathi n checki beha el size mta3 SCREEN
  useEffect(() => {
    const checkScreenSize = () => {
      setShowDrawer(window.innerWidth <= 756);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // function mta3 scrolling
  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    setIsScrolled(currentScrollTop > lastScrollTop && currentScrollTop > 10);
    const direction = currentScrollTop > lastScrollTop ? "down" : "up";
    setScrollDirection(direction);
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  // useEffect mta3 lscrolling direction
  useEffect(() => {
    let timeoutId;
    const handleScrollEnd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(false);
      }, 200); // Adjust the delay as needed
    };

    window.addEventListener("scroll", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScrollEnd);
      clearTimeout(timeoutId);
    };
  }, [isScrolled]);

  // ki n hoveri 3la categorie bech taaml show wala hide ll dropdown mta3 el categories
  const handleCategoriesHover = () => {
    setIsCategoriesHovered(true);
  };
  const handleCategoriesLeave = () => {
    setIsCategoriesHovered(false);
  };

  // n7seb el totalitems eli fi Cart
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // hatha el styling mta3 l icon mta3 totale eli fo9 icon cart
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -2,
      top: 13,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <>
      <header
        className={`fixed w-full bg-[#a5bb08] z-20 mb-10 transition-transform duration-300 ${
          isScrolled && scrollDirection === "down" ? "-translate-y-full" : ""
        } ${!isScrolled || scrollDirection === "up" ? "" : ""}`}
      >
        <nav className="container h-20 px-4 py-4 flex justify-between items-center">
          <div className="flex z-50 items-center">
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
                            {ctgs.map((category) => (
                              <li key={category}>
                                <Link
                                  to="/"
                                  onClick={() => handleCategorySelect(category)}
                                  className="block px-4 py-2 hover:text-[#A5BB08] hover:bg-gray-100"
                                >
                                  {category}
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
                      className="text-xl p-4 font-semibold tranform duration-1000 
                      overflow-hidden hover:scale-125  hover:text-[#20327c] transition-colors "
                    >
                      {item.item2}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-end">
            <div className="fixed mr-10">
              
            {/* <ToggleButton /> */}
            </div>
            <Link
              to={"/cart"}
              className="flex mr-4 mt-2  justify-center items-center relative"
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalItemsInCart} color="primary">
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 902.86 902.86"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                        />
                        <path
                          d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                        />
                      </g>
                    </g>
                  </svg>
                </StyledBadge>
              </IconButton>
            </Link>
            <Link
              to={"/"}
              className="flex items-center text-xl font-bold text-white"
            >
              <span className="text-colori hidden font-bold text-2xl md:inline-block text-black">
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

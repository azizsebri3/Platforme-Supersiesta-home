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
    { item1: "", item2: "Catégories" },
    { item1: "propos", item2: "À propos" },
    { item1: "Contact", item2: "Contactez nous" },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const { cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
          isScrolled ? "" : "-translate-y-full"
        }`}
      >
        <nav className="container h-20 px-4 py-4 flex justify-between items-center">
          <div className="flex z-50 items-center">
            {window.innerWidth <= 765 && <Drawer />}
            <ul
              className={`md:flex md:space-x-4 ${
                window.innerWidth <= 765 ? "hidden" : ""
              }`}
            >
              {NavItems.map((item, index) => (
                <li key={index} className="text-white font-semibold">
                  <Link
                    to={`${item.item1}`}
                    onClick={() => window.scroll(0, 0)}
                    className="text-xl p-4 font-semibold transform duration-100 overflow-hidden hover:scale-125  hover:text-[#20327c] transition-colors "
                  >
                    {item.item2}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-end">
            <div className="fixed mr-10">{/* <ToggleButton /> */}</div>
            <Link
              to={"/cart"}
              onClick={() => window.scroll(0, 0)}
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
                        <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829zM685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                        <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742C469.675,776.858,518.457,825.641,578.418,825.641zM209.46,716.897c0,22.467-18.277,40.744-40.743,40.744c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897zM619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742S619.162,694.432,619.162,716.897z" />
                      </g>
                    </g>
                  </svg>
                </StyledBadge>
              </IconButton>
            </Link>
            <Link
              to={"/"}
              onClick={() => window.scroll(0, 0)}
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

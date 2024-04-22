import React, { useState, useEffect } from "react";
import "../output.css";
import Drawer from "./drawer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { useCart } from "../context/cartProvider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const Navbar = ({ HomeRef }) => {
  const navigate = useNavigate();
  const {
    totalPrice: initialTotalPrice,
    totalItems: initialTotalItems,
    cartItems,
  } = useCart();
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const storedTotalPrice = localStorage.getItem("totalPrice");
    const storedTotalItems = localStorage.getItem("totalItems");
    if (storedTotalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }
    if (storedTotalItems) {
      setTotalItems(JSON.parse(storedTotalItems));
    }
  }, []); // Add initialTotalPrice and initialTotalItems to the dependency array

  const NavItems = [
    { item1: "/", item2: "Accueil" },
    { item1: "/Catégories", item2: "Catégories" },
    { item1: "/propos", item2: "À propos" },
    { item1: "/Contact", item2: "Contactez nous" },
  ];
  const categories = [
    "Tous Les Matelas",
    "Pillow Top",
    "Matelas a Ressort",
    "Matelas orthopédique",
    "Matelas Médicale",
    "Matelas en Mousse",
    "Oreillers",
    "Linge de lit",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -2,
      top: 13,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  if (location.pathname == "/checkout") {
    return null;
  }

  return (
    <>
      <header
        className={`fixed w-full bg-[#a5bb08] z-20 mb-10 transition-transform duration-500 shadow-xl ${
          isScrolled ? "" : "-translate-y-full"
        }`}
      >
        <nav className="flex container h-20  px-4 py-4  justify-between items-center">
          <div className="flex z[999999999]  items-center">
            {windowWidth < 765 && <Drawer />}
            <ul
              className={`md:flex md:space-x-4 ${
                windowWidth < 765 ? "hidden" : ""
              }`}
            >
              {NavItems.map((item, index) => (
                <li key={index} className="text-white font-semibold">
                  {item.item2 === "Catégories" ? (
                    <div
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                      className="relative"
                    >
                      <span
                        className={`text-xl p-4 font-semibold hover:text-[#20327c] cursor-pointer link link-underline link-underline-black  ${
                          location.pathname === item.item1
                            ? "text-[#20327c] focus:text-[#20327c]  "
                            : ""
                        }`}
                      >
                        {item.item2}
                      </span>
                      <AnimatePresence>
                        {showDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            style={{ translateX: "-50%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute left-1/2 top-12 bg-white text-black"
                          >
                            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />

                            <PricingContent
                              categories={categories}
                              setShowDropdown={setShowDropdown}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.item1}
                      onClick={() => window.scroll(0, 0)}
                      className={`text-xl p-4 font-semibold hover:text-[#20327c] link link-underline link-underline-black   ${
                        location.pathname === item.item1
                          ? "text-[#20327c] focus:text-[#20327c] decoration-[2px]  underline underline-offset-[18px] "
                          : ""
                      }`}
                    >
                      {item.item2}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <Link
              to={"/cart"}
              onClick={() => window.scroll(0, 0)}
              className="flex mr-4 mb-1 mt-2  justify-center items-center relative"
            >
              <IconButton aria-label="cart">
                <span className="mr-2 text-xl font-bold text-black">
                  {" "}
                  {initialTotalPrice} د.ت{" "}
                </span>
                <StyledBadge badgeContent={cartItems.length} color="primary">
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    className="w-8 h-8"
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
                Super siesta
              </span>
              <img src={logo} className="w-8 h-auto ml-2" alt="Company Logo" />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

const PricingContent = ({ categories, setShowDropdown }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setProductSelected } = useAppContext();
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        {categories.map((cat) => (
          <a
            key={cat}
            onClick={() => {
              setProductSelected(cat);
              setShowDropdown(false);
              location.pathname != "/" && navigate("/");
              window.scroll(0, 0);
              window.scroll(400, 1000);
            }}
            className="block text-[20px] cursor-pointer hover:text-[#192A7A]  hover:underline"
          >
            {cat}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

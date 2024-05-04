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
  const { setSearchQuery, searchQuery } = useAppContext();
  const {
    totalPrice: initialTotalPrice,
    totalItems: initialTotalItems,
    cartItems,
    open,
    setOpen,
  } = useCart();
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenSearchInput, setIsOpenSearchInput] = useState(false);
  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const location = useLocation();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
  }, []);

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
      <div className=" sticky top-0 z-[99999] bg-[#20327c] w-full transition-transform duration-300 transform translate-y-0">
        <div className="relative p-3  px-4 text-xs md:text-sm">
          <div className="absolute left-0 right-0 bg-[#20327c] flex justify-center items-center md:px-0">
            <div className="w-48  md:w-[70%] lg:w-[80%] text-center truncate">
              <span className="text-white text-sm">
                Livraison Gratuite sur Toute la Tunisie
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 z-10">
              <a
                href="https://www.facebook.com/www.supersiesta.tn/"
                target="_blank"
                aria-label="Visit our facebook page"
              >
                <svg
                  aria-hidden="false"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  className="svg-inline--fa fa-facebook"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fff" // Adjusted color
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/super__siesta/?hl=fr"
                target="_blank"
                aria-label="Visit our instagram page"
              >
                <svg
                  aria-hidden="false"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="instagram"
                  className="svg-inline--fa fa-instagram"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#fff" // Adjusted color
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=29934780"
                target="_blank"
                aria-label="Visit our whatsapp page"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="whatsapp"
                  className="svg-inline--fa fa-whatsapp"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#fff" // Adjusted color
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  />
                </svg>
              </a>
            </div>
            <a
              href="tel:29934780"
              className="flex gap-2 items-center z-10 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="hidden md:block text-white">26956060</span>
            </a>
          </div>
        </div>
      </div>
      <header
        className={`fixed w-full left-0 bg-[#A2BA02]  z-20 mb-10  transition-transform duration-500 shadow-xl ${
          isScrolled ? "" : "-translate-y-full"
        }`}
      >
        <nav className="flex h-20  px-2 py-2  justify-between items-center">
          <div className="flex z[999999999]  items-center">
            {windowWidth < 765 && <Drawer />}

            <ul
              className={`md:flex md:space-x-4 ${
                windowWidth < 765 ? "hidden" : ""
              }`}
            >
              {NavItems.map((item, index) => (
                <li key={index} className="text-white text-xl">
                  {item.item2 === "Catégories" ? (
                    <div
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                      className="relative"
                    >
                      <span
                        className={`text-xl p-4  hover:text-[#20327c] cursor-pointer link link-underline link-underline-black  ${
                          location.pathname === item.item1
                            ? "text-[#20327c] focus:text-[#20327c]"
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
                      className={`text-xl p-4  hover:text-[#20327c] link link-underline link-underline-black   ${
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

          <div className="flex justify-end items-center ml-[100px] ">
           
            
              <div className={`flex items-center ${windowWidth < 765 ? "hidden" : ""} `}>
                <div className="relative mr-2">
                  <input
                    type="text"
                    placeholder="Recherche"
                    value={searchQuery}
                    className={`${
                      toggleSearchInput ? "w-60" : "w-0"
                    } h-10 px-3 pr-10 text-sm rounded-full transition-all duration-300 ease-in-out`}
                    onChange={handleSearchInputChange}
                  />
                  <button
                    onClick={() => setToggleSearchInput(!toggleSearchInput)}
                    className="absolute right-0 top-0 h-10 w-10 text-white bg-[#20327c] rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 ml-2 text-white"
                      color={"#000000"}
                      fill={"none"}
                    >
                      <path
                        d="M17.5 17.5L22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={() => setOpen(!open)}
              className="flex mr-4 mb-1 mt-2  justify-center items-center relative"
            >
              <IconButton aria-label="cart">
                <span className="mr-2 text-sm font-bold text-white">
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
            </button>

            <Link
              to={"/"}
              onClick={() => window.scroll(0, 0)}
              className="flex items-center text-xl font-bold text-white"
            >
              <span className="text-colori   hidden font-bold text-2xl md:inline-block text-white">
                Super siesta
              </span>
              {/* <img src={logo} className="w-12 h-auto ml-2 " alt="Company Logo" /> */}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
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

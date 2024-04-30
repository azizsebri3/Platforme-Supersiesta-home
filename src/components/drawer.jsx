import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Drawer = () => {
  const { setProductSelected ,searchQuery,setSearchQuery} = useAppContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenSearchInput, setIsOpenSearchInput] = useState(false);
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const toggleSearchInput = () => {
    setIsOpenSearchInput(!isOpenSearchInput);
  };
  const toggleDropdown = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };
  const toggleDrawer = () => {
    setIsOpen(true);
    document.body.classList.toggle("overflow-hidden");
  };
  const closeDrawer = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };
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
  return (
    <>
      <button
        onClick={toggleDrawer}
        className="focus:outline-none ml-4 p-1 border rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          color={"#000000"}
          fill={"none"}
          className="w-9 h-8  text-white"
        >
          <path
            d="M4 5L20 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 19L20 19"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={toggleSearchInput} // Add this line
        className="focus:outline-none ml-4 p-1 border rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8  text-white"
          color={"#000000"}
          fill={"none"}
        >
          <path
            d="M17.5 17.5L22 22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpenSearchInput && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            className="border rounded-md ml-2 p-2 focus:ring-2 focus:ring-[#A2BA02] focus:ring-opacity-50"
            onChange={handleSearchInputChange}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 z-[999999999999] left-0 w-full h-full bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          >
            <motion.div
              className="fixed top-0 left-0 w-72 bg-white h-full shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDrawer}
                className="absolute top-0 right-0 m-2 p-2 mt-[42px] bg-[#A2BA02]  rounded-md"
              >
                <svg
                  className="w-7 h-7  text-colori"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
              </button>
              <div className="py-4 mt-10 px-4 flex items-center font-bold">
                <img
                  src={logo}
                  alt="Logo"
                  onClick={() => {
                    navigate("/");
                    setProductSelected("Tous Les Matelas");
                    closeDrawer();
                  }}
                  className="w-12 h-12 hover:cursor-pointer"
                />
                <span className="ml-1">Super siesta Home</span>
              </div>

              <hr />
              <ul className="mt-[80px]">
                <li className="text-xl py-4 px-4 hover:bg-gray-100 cursor-pointer">
                  <Link
                    to={"/"}
                    onClick={() => {
                      setProductSelected("Tous Les Matelas");
                      closeDrawer();
                    }}
                  >
                    Accueil
                  </Link>
                </li>
                <li
                  className="text-xl py-4 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="inline-flex items-center">
                    Catégories
                    <svg
                      class="ml-2 w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </span>

                  {isOpenDropDown && (
                    <motion.ul
                      className="mt-2 max-h-60 overflow-y-scroll overflow-x-hidden relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      {categories.map((category, index) => (
                        <motion.li
                          className="text-xl py-4 px-4 cursor-pointer"
                          key={index}
                          whileHover={{ scale: 1.08 }}
                        >
                          <Link
                            to={"/"}
                            onClick={() => {
                              setProductSelected(category);
                              closeDrawer();
                            }}
                            className="text-[19px] py-4 px-4 hover:text-[#20327C] cursor-pointer"
                          >
                            {category}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </li>
                <li className="text-xl py-4 px-4 hover:bg-gray-100 cursor-pointer">
                  <Link to={"/propos"} onClick={closeDrawer}>
                    A propos
                  </Link>
                </li>
                <li className="text-xl py-4 px-4 hover:bg-gray-100 cursor-pointer">
                  <Link to={"/contact"} onClick={closeDrawer}>
                    Contactez Nous
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;

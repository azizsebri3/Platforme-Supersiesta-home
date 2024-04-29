import React, { useState, useRef, useEffect } from "react";
import "../output.css";
import { motion } from "framer-motion";
import { Carousel } from "../components/gallery/carousel.jsx";
import data from "../components/gallery/data.js";
import ProductCard from "../components/productCard.jsx";
import guarantee from "../assets/guarantee.png";
import delivery from "../assets/delivery-truck.png";
import support from "../assets/support.png";
// import ShiftingCountdown from "../components/countdown.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import Pagination from "../components/pagination.jsx";
import Features from "../components/features.jsx";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const { fetchedProducts, productSelected, homeRef } = useAppContext();
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [path, setPath] = useState(["Acceuil"]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (
      productSelected === "Acceuil" ||
      productSelected === "Tous Les Matelas"
    ) {
      setCurrentProducts(fetchedProducts);
    } else {
      const filteredProducts = fetchedProducts.filter(
        (product) => product.category === productSelected
      );
      setCurrentProducts(filteredProducts);
      const index = path.indexOf(productSelected);
      if (index === -1) {
        // If the selected path is not in the current path, update the path
        setPath([...path, productSelected]);
      } else {
        // If the selected path is already in the current path, remove all subsequent paths
        setPath(path.slice(0, index + 1));
      }
    }
    setCurrentPage(1);
  }, [fetchedProducts, productSelected]);

  // Calculate total number of pages
  const totalPages = Math.ceil(currentProducts.length / productsPerPage);

  // Calculate products to display on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const productsToDisplay = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const infoItems = [
    {
      image: delivery,
      alt: "Delivery",
      title: "Livraison à domicile",
      description: "Pour tous les produits",
    },
    {
      image: guarantee,
      alt: "Guarantee",
      title: "Qualité garantie",
      description: "Produits de haute qualité",
    },
    {
      image: support,
      alt: "Support",
      title: "Service client",
      description: "Disponible 24/7 par téléphone",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Achetez des matelas de haute qualité pour un sommeil optimal."
        />
        <meta
          name="keywords"
          content="matelas, confort, sommeil, qualité, santé"
        />
        <meta property="og:title" content="Super siesta" />
      </Helmet>
      <div className="flex flex-col z-1 lg:flex-row bg-white items-center">
        <div className="flex justify-center m-auto">
          <div className="relative rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Carousel data={data} />
            </motion.div>
          </div>
        </div>
      </div>

      <Features infoItems={infoItems} />
      <>
        {/* <span class="flex-grow bg-gray-200 rounded h-1"></span>
        <nav className="flex ml-40 justify-start items-center mx-auto ">
          <ol role="list" className="flex items-center">
            {path.map((pg, index) => (
              <li key={index} className="text-center lg:text-2xl">
                <div className="-m-1">
                  <Link
                    onClick={() => {
                      if (pg === "Acceuil") {
                        setProductSelected("Acceuil");
                        setPath(["Acceuil"]);
                      } else {
                        setProductSelected(pg);
                        if (index !== path.length - 1) {
                          setPath(path.slice(0, index + 1));
                        }
                      }
                    }}
                    className={`rounded-md p-1 text-[17px] cursor-pointer font-medium hover:text-[#20327c] ${
                      index === path.length - 1
                        ? "text-[#20327c] underline "
                        : ""
                    }`}
                  >
                    {pg}
                  </Link>
                  <span> {` > `} </span>
                </div>
              </li>
            ))}
          </ol>
        </nav> */}
        <span class="flex-grow bg-gray-200 rounded h-1"></span>
        <h1
          ref={homeRef}
          className="flex items-center mt-6 justify-center font-bold mb-6 text-3xl text-wrap text-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={5}
            stroke="currentColor"
            className="w-6 h-6 animate-bounce mr-4 text-[#a5bb08]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
          {productSelected}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={5}
            stroke="currentColor"
            className="w-6 h-6 animate-bounce ml-4 text-[#a5bb08]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </h1>
      </>

      {fetchedProducts.length === 0 || productsToDisplay.length === 0 ? (
        <div className="flex justify-center">
          <p>Actuellement indisponible</p>
        </div>
      ) : (
        <div className="flex justify-center flex-wrap mx-20">
          {productsToDisplay.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard item={product} />
            </motion.div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default Home;

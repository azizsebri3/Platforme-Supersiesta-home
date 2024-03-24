import React, { useState, useEffect } from "react";
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

const Home = () => {
  const { fetchedProducts } = useAppContext();

  return (
    <>
      <div className="flex flex-col z-1 lg:flex-row bg-white items-center">
        <div className="flex justify-center m-auto">
          <div className="relative rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Carousel data={data} />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[50vh] flex-col items-center mx-auto my-10 bg-transparent space-x-4 ">
        <div className="w-full mb-3">{/* <ShiftingCountdown /> */}</div>
        <div className="flex justify-center sm:flex-row flex-col m-2  items-center space-x-4">
          <div className="col-sm-6 col-lg-4">
            <div className="flex flex-col items-center lg:mx-24 justify-center">
              <img className="w-10 h-10" src={delivery} alt="Delivery" />
              <div className="text-center">
                <h3 className="text-lg font-bold"> livraison à domicile</h3>
                <p>Pour toutes les produits </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="flex flex-col items-center lg:mx-24 justify-center">
              <img className="w-10 h-10" src={guarantee} alt="guarantee" />
              <div className="text-center">
                <h3 className="text-lg font-bold">Qualité garantie</h3>
                <p>Produits de haute qualité</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="flex flex-col items-center lg:mx-24 justify-center">
              <img className="w-10 h-10" src={support} alt="support" />
              <div className="text-center">
                <h3 className="text-lg font-bold">Service client</h3>
                <p>Disponible 24/7 par téléphone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1
        id="acceuil-section"
        className="flex items-center justify-center font-sans mb-6 text-3xl text-wrap text-bold"
      >
        collections
      </h1>
      <div className="flex justify-center flex-wrap mx-20">
        {fetchedProducts.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard item={product} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Home;

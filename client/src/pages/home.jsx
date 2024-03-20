import React, { useState, useEffect } from "react";
import "../output.css";
import products from "../constants/products.js";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { Carousel } from "../components/gallery/carousel.jsx";
import data from "../components/gallery/data.js";
import ProductCard from "../components/productCard.jsx";
import guarantee from "../assets/guarantee.png";
import delivery from "../assets/delivery-truck.png";
import support from "../assets/support.png";
import { useCart } from "../context/cartProvider .jsx";
import ShiftingCountdown from "../components/countdown.jsx";
import axios from "axios";

const Home = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [collectionName, setCollectionName] = useState("Nouvelle Collection");

  
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(
        `YOUR_API_ENDPOINT/products?category=${category}`
      );
      setFetchedProducts(response.data); // Fix this line
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT");
        setFetchedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className="flex flex-col z-1 lg:flex-row bg-white items-center">
        <div className="flex justify-center m-auto">
          <div className="relative  rounded-2xl">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Carousel data={data} />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[50vh] flex-col items-center mx-auto my-10 bg-transparent space-x-4 ">
        <div className="w-full mb-3">
          {/* <ShiftingCountdown /> */}
        </div>
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
        Nouvelle Collection
      </h1>
      <div className="flex justify-center flex-wrap mx-20">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard
              id={product.id}
              img={product.image}
              desc={product.desc}
              price={product.price}
              addToCart={addToCart} // Pass addToCart function to ProductCard
            />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Home;

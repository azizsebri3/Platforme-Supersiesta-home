import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartProvider ";
import Alert from "@mui/material/Alert";
import { ProductProvider, useProduct } from "../context/productContext";

const ProductCard = ({ id, img, desc, price }) => {
  const { setProduct } = useProduct();

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(img, desc, price);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleGetInfo = () => {
    setProduct(img, desc, price);
    navigate("/Product");
  };

  return (
    <ProductProvider>
      <div
        className="flex flex-col mb-3 bg-white mx-4 shadow-xl 
        rounded p-4 border hover:shadow-[#A5BB08] 
        hover:shadow-xl hover:border-green-600 
        tranform transition duration-1000 
        overflow-hidden hover:scale-125"
      >
        <Link to={`/Product/${desc}`} className="block mb-4">
          <button onClick={handleGetInfo}>
            <img src={img} alt="" className="w-full max-h-48  object-cover" />
          </button>
        </Link>
        <hr />
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">
            <a>{desc}</a>
          </h3>
          <div className="text-2xl font-bold text-gray-800 mb-2">
            {price} د.ت
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`text-green-700 hover:text-black border border-green-500 hover:bg-green-500 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 ${
              added ? "added" : ""
            }`}
          >
            {added ? "Ajouté" : "Ajouter au panier"}
          </button>
        </div>
      </div>
      {/* {
          
        added && <Alert variant="filled" severity="success">
        This is a filled success Alert.
      </Alert>
      } */}
    </ProductProvider>
  );
};

export default ProductCard;

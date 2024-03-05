import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartProvider ";
import { ProductProvider, useProduct } from "../context/productContext";
import SlideInNotifications from "./slideInNotifications";

const ProductCard = ({ id, img, desc, price }) => {
  const { setProduct } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [productPosition, setProductPosition] = useState(null);

  const handleAddToCart = () => {
    addToCart(img, desc, price);
    setSuccess(true);
    // const buttonRect = document.getElementById("cart-button").getBoundingClientRect();
    // setProductPosition({ top: buttonRect.top, left: buttonRect.left });
    setTimeout(() => {
      setSuccess(false);
      // setProductPosition(null);
    }, 2000);
  };

  const handleGetInfo = () => {
    setProduct(img, desc, price);
    navigate("/Product");
  };

  return (
    <>
      <ProductProvider>
        <div
          className="flex flex-col mb-5 z-10  bg-white mx-4 shadow-xl 
        rounded p-2 border hover:shadow-[#A5BB08] 
        hover:shadow-xl hover:border-green-600 
        tranform transition duration-500 
        overflow-hidden hover:scale-100 ease-in "
        >
          <Link to={`/Product/${desc}`} className="block mb-4">
            <button onClick={handleGetInfo}>
              <picture className="rounded-lg  overflow-hidden w-[361px] h-[361px] block">
                <img
                  className="hover:scale-125 ease-in duration-300"
                  src={img}
                />
              </picture>
            </button>
          </Link>
          <hr />
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              <a>{desc}</a>
            </h3>
            <div className="text-xl  text-gray-800 mb-2">{price} د.ت</div>
            <div className="bg-white  flex items-center justify-center">
              <a
                onClick={addToCart}
                class="bg-[#a5bb08] flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-[#c0d835] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Ajouter au Panier
              </a>
            </div>
          </div>
        </div>
      </ProductProvider>
      {success && productPosition && (
        <SlideInNotifications
          nameProduct={desc}
          productPosition={productPosition}
        />
      )}
    </>
  );
};

export default ProductCard;

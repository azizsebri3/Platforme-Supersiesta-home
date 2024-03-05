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
    navigate(`/Product/${desc}`);
    window.scroll(0,0);
  };

  return (
    <>
      <ProductProvider>
        <div
          className="flex flex-col mb-5 z-10  bg-white mx-4 shadow-xl 
        rounded p-1 border hover:shadow-[#A5BB08] 
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
              <button
              onClick={handleAddToCart}
              className="group flex w-60 cursor-pointer select-none items-center justify-center rounded-md bg-[#a5bb08] px-6 py-2 text-white transition">
                <a
                  class="group flex w-full items-center justify-center rounded py-2 text-center font-bold"
                >
                  Ajouter au panier
                </a>
                <svg
                  className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
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

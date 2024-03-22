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
      setProductPosition(null);
    }, 2000);
  };

  const handleGetInfo = () => {
    setProduct(img, desc, price);
    navigate(`/Product/${desc}`);
    window.scroll(0, 0);
  };

  return (
    <>
      <ProductProvider>
        <>
          <div className="group my-7 p-3 flex w-full max-w-xs flex-col overflow-hidden">
            <a className="relative flex h-80 w-72 overflow-hidden bg-white border hover:border-[#a5bb08]">
              <img
                className="absolute top-0 right-0 h-full w-full object-cover hover:slashed-zero"
                src={img}
                alt="product image"
              />
              <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                <div className="h-3 w-3 rounded-full border-2 border-white bg-white" />
                <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent" />
                <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent" />
              </div>
              <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                <button
                  onClick={handleGetInfo}
                  className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700"
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 6H13.4V8.4H11V6ZM11 10.8H13.4V18H11V10.8Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            </a>
            <div className="mt-4 pb-5">
              <p>
                <h5 className="text-center tracking-tight  text-gray-500">
                  {desc}
                </h5>
              </p>
              <div className="mb-5 flex justify-center">
                <p>
                  <span className="text-xl font-bold text-gray-900">
                    {price} د.ت
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      </ProductProvider>
      {success && <SlideInNotifications nameProduct={desc} />}
    </>
  );
};

export default ProductCard;

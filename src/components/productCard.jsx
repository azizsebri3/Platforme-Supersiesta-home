import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartProvider";
// import { ProductProvider, useProduct } from "../context/productContext";
import SlideInNotifications from "./slideInNotifications";

const ProductCard = ({ item }) => {
  const { addToCart, cartItems, totalItems } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    handleGetInfo();
    // Trigger success alert
    setSuccess(true);

    // Reset success after 2 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const handleGetInfo = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    const formattedProductName = item.productName.replace(/\s+/g, "-"); // Replace spaces with "-" for productName
    const formattedCategory = item.category.replace(/\s+/g, "-"); // Replace spaces with "-" for category
    navigate(`/Product/${formattedCategory}/${formattedProductName}`);
    window.scroll(0, 0);
  };

  return (
    <>
      <div className="group my-7 p-3 flex w-full max-w-xs flex-col overflow-hidden ">
        <a className="relative flex h-80 w-72 overflow-hidden shadow hover:shadow-lg  bg-white border hover:border-[#a5bb08]">
          {item.availability && (
            <div
              className={`absolute  top-2 left-2 z-1 px-2 py-1 rounded 
    ${
      item.availability === "En stock"
        ? "bg-green-400 text-white"
        : item.availability === "En arrivage"
        ? "bg-orange-500 text-white"
        : item.availability === "épuisé"
        ? "bg-red-600 text-white"
        : "bg-red-600 text-white"
    }`}
            >
              {item.availability}
            </div>
          )}

          <img
            className="absolute top-0 right-0 cursor-pointer h-full w-full object-cover hover:slashed-zero transition-transform duration-1000 ease-in-out transform hover:scale-125"
            src={item.imageUrls[0]}
            onClick={handleGetInfo}
            alt="product image"
          />
          <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
            <div className="h-3 w-3 rounded-full border-2 border-white bg-white" />
            <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent" />
            <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent" />
          </div>
          <div className="absolute -right-16 bottom-0 mr-4 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
            <button
              onClick={handleGetInfo}
              className="flex h-10 w-10 items-center justify-center bg-[#A5BB08] text-white transition hover:bg-gray-700"
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
            {item.availability !== "Epuisé" &&
              item.availability !== "En arrivage" && (
                <button
                  onClick={handleAddToCart}
                  className="flex h-10 w-10 items-center justify-center bg-[#A5BB08] text-white transition hover:bg-gray-700"
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
              )}
          </div>
        </a>
        <div className="mt-4 pb-5">
          <p>
            <h5 className="text-center tracking-tight text-xl  text-gray-500">
              {item.productName}
            </h5>
          </p>
          <div className="mb-5 flex justify-center">
            {item.productOldPrice > 0 ? (
              <>
                <span className="text-xl text-gray-900 line-through">
                  {item.productOldPrice}
                </span>{" "}
                <span className="text-xl font-bold text-red-700">
                  {item.productPrice} د.ت
                </span>
              </>
            ) : (
              <>
                <span className="text-xl  font-medium gap-1 text-gray-900">
                  {item.productPrice} د.ت
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

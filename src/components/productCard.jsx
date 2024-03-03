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
          className="flex flex-col mb-4 z-10  bg-white mx-4 shadow-xl 
        rounded p-3 border hover:shadow-[#A5BB08] 
        hover:shadow-xl hover:border-green-600 
        tranform transition duration-500 
        overflow-hidden hover:scale-100 ease-in "
        >
          <Link to={`/Product/${desc}`} className="block mb-4">
            <button onClick={handleGetInfo}>
              <picture className="rounded-lg  overflow-hidden w-[361px] h-[361px] block">
                <img className="hover:scale-125 ease-in duration-300" src={img} />
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
                className="px-6 py-2 font-medium bg-[#A5BB08] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                {success ? "Ajouté ✓" : "Ajouter au panier"}
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

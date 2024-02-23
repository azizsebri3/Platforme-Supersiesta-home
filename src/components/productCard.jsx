import React from "react";
import "../output.css";

const ProductCard = ({ img, desc, price }) => {
  return (
    <div className="flex flex-col bg-white mx-4 shadow-xl rounded p-4 border hover:border-green-600">
      <a href="" className="block mb-4">
        <img src={img} alt="" className="w-full " />
      </a>
      <hr/>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          <a>{desc}</a>
        </h3>
        <div className="text-xl font-bold text-gray-800 mb-2">{price} د.ت</div>
        <button
          type="button"
          className="text-green-700 hover:text-black  border border-green-500 hover:bg-green-500  focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

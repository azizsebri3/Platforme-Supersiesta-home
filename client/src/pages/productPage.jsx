import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartProvider";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { addToCart, cartItems, updateCartItemQuantity } = useCart();
  const [productInfo, setProductInfo] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [ProductPrice, setProductPrice] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track quantity

  const navigate = useNavigate();

  useEffect(() => {
    const storedProductInfo = localStorage.getItem("selectedProduct");
    if (storedProductInfo) {
      setProductInfo(JSON.parse(storedProductInfo));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (productInfo) {
      setIsInCart(cartItems.some((item) => item.id === productInfo.id));
      productInfo.sizes.length > 0
        ? setProductPrice(productInfo.sizes[0].price)
        : setProductPrice(productInfo.productPrice);
    }
  }, [cartItems, productInfo]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const selectedSizeObject = productInfo.sizes.find(
      (sizeObj) => sizeObj.size === size
    );
    const price = selectedSizeObject
      ? selectedSizeObject.price
      : productInfo.productPrice; // Use selected size price if available, else use default product price
    setProductPrice(price); // Update the price state
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const updatedProductInfo = {
      ...productInfo,
      price: Number(ProductPrice),
      selectedSize,
      quantity: quantity, // Add quantity to the product info
    };
    addToCart(updatedProductInfo);
    navigate("/cart");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-40">
      {productInfo && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="w-full ml-12 rounded-lg  dark:bg-gray-700 mb-4">
                <img
                  className="w-[75%] h-1/2 object-cover"
                  src={productInfo.imageUrl}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                {productInfo.availability !== "Epuisé" &&
                  productInfo.availability !== "En arrivage" && (
                    <>
                      <div className=" w-[75%] ml-12  px-2">
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-[#a5bb08] hover:bg-[#87A922] text-white dark:bg-gray-700 dark:text-white py-2 px-4 rounded-full font-bold  dark:hover:bg-gray-600"
                        >
                          Ajouter au Panier
                        </button>
                      </div>
                    </>
                  )}
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {productInfo.productName}
              </h2>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Prix: {""}
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {ProductPrice}
                  </span>
                </div>
                <div className="mt-1">
                  <div>
                    {productInfo.availability &&
                      !productInfo.availability.includes("%") && (
                        <div>
                          <span className="font-bold text-gray-700 dark:text-gray-300">
                            Disponibilité:{" "}
                          </span>
                          <span
                            className={`bg-gray-300 dark:bg-gray-700 text-white dark:text-white py-1 px-4 rounded-full font-bold mr-2 ${
                              productInfo.availability === "En stock"
                                ? "bg-green-400"
                                : productInfo.availability === "En arrivage"
                                ? "bg-orange-500"
                                : productInfo.availability === "Epuisé"
                                ? "bg-red-600"
                                : "bg-red-600"
                            }`}
                          >
                            {productInfo.availability}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Sizes section */}
              {productInfo.sizes.length !== 0 && (
                <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Sélectionner une taille :
                  </span>
                  <div className="flex items-center mt-2">
                    {productInfo.sizes.map((sizeObj, index) => (
                      <label
                        key={index}
                        className="flex items-center border p-2 rounded-full"
                      >
                        <input
                          type="radio"
                          name="size"
                          value={sizeObj.size}
                          onChange={() => handleSizeChange(sizeObj.size)}
                          className="mr-2 appearance-none bg-gray-300 checked:bg-[#A5BB08] rounded-full h-6 w-6"
                        />
                        <span className="text-gray-800 font-semibold">
                          {sizeObj.size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selection */}
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Quantité :
                </span>
                <div className="flex h-8 w-7 items-stretch text-gray-600">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                    disabled={quantity <= 1} // Disable if quantity is 1 or less
                  >
                    -
                  </button>
                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-gray-300">
                <h2 className="font-bold text-lg text-gray-700 dark:text-gray-300">
                  Description du produit:
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4  rounded-lg">
                  <h3 className="font-bold text-xl uppercase text-gray-700 dark:text-gray-300 ml-2 mb-2">
                    {productInfo.productName} DE HAUTE QUALITE
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 text-xl mt-2">
                    {productInfo.productDescription.map((line) => (
                      <li key={line} className="list-disc lg:ml-8">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

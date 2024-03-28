import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartProvider";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { addToCart, cartItems } = useCart();
  const [productInfo, setProductInfo] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProductInfo = localStorage.getItem("selectedProduct");
    if (storedProductInfo) {
      setProductInfo(JSON.parse(storedProductInfo));
    } else {
      navigate("/");
    }
    // Cleanup function to clear local storage on unmount
    // return () => {
    //   localStorage.removeItem("selectedProduct");
    // };
  }, [navigate]);

  useEffect(() => {
    if (productInfo) {
      setIsInCart(cartItems.some((item) => item.id === productInfo.id));
    }
  }, [cartItems, productInfo]);

  const handleAddToCart = () => {
    addToCart(productInfo);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-40">
      {productInfo && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="w-full rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={productInfo.imageUrl}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                {productInfo.availability !== "Epuisé" &&
                  productInfo.availability !== "En arrivage" && (
                    <>
                      <div className="w-1/2 px-2">
                        <button
                          onClick={() => {
                            handleAddToCart();
                            navigate("/checkout?fromCart=true");
                          }}
                          className="w-full bg-[#A5BB08] hover:bg-[#87A922] text-white py-2 px-4 rounded-full font-bold"
                        >
                          Acheter Maintenant
                        </button>
                      </div>

                      <div className="w-1/2 px-2">
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-[#E5E7EB] hover:bg-[#192A7A] hover:text-white dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold  dark:hover:bg-gray-600"
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
                    Prix:
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {productInfo.productPrice} د.ت
                  </span>
                  <span className="text-xl text-red-500 line-through">
                    {productInfo.productoldPrice}
                  </span>
                </div>
                <div>
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
                    {productInfo.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddToCart(size)}
                        className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-[#A5BB08] dark:hover:bg-green-600 focus:outline-none focus:bg-[#A5BB08] dark:focus:bg-green-600"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product description */}
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Description du produit:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Découvrez notre <span className="text-green-500 font-bold">{productInfo.productName}</span>  de qualité
                  supérieure, alliant soutien et confort optimal pour des nuits
                  de sommeil parfaites. Doté d'un système de ressorts ensachés,
                  ce matelas épouse les contours de votre corps tout en offrant
                  un excellent maintien. Les matériaux de haute qualité
                  garantissent une durabilité exceptionnelle, tandis que les
                  couches de rembourrage assurent un confort moelleux. Profitez
                  d'un sommeil réparateur et revitalisant grâce à ce matelas qui
                  allie luxe et fonctionnalité.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

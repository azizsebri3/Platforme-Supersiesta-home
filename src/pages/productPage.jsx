import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartProvider";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { addToCart, cartItems, updateCartItemQuantity,open,setOpen } = useCart();
  const [productInfo, setProductInfo] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [ProductPrice, setProductPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [ShowPop, setShowPop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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

      setImageGallery(productInfo.imageUrls);
    }
  }, [productInfo]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const selectedSizeObject = productInfo.sizes.find(
      (sizeObj) => sizeObj.size === size
    );
    const price = selectedSizeObject
      ? selectedSizeObject.price
      : productInfo.productPrice;
    setProductPrice(price);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (productInfo.sizes.length > 0)
      if (!selectedSize) {
        setShowPop(true);
        return;
      }

    const updatedProductInfo = {
      ...productInfo,
      price: Number(ProductPrice),
      selectedSize,
      quantity: quantity,
    };
    addToCart(updatedProductInfo);

  };

  const selectImage = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
  };
  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-40">
      {productInfo && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="w-full rounded-lg  dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover hover:cursor-zoom-in"
                  src={productInfo.imageUrls[selectedImageIndex]}
                  alt="Product Image"
                  onClick={() => {
                    openModal(selectedImageIndex);
                  }}
                />
              </div>
              {/* Image gallery */}
              <div className="flex flex-wrap mt-4">
                {imageGallery.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Product Image ${index}`}
                    className="w-20 h-20 object-cover rounded-md cursor-pointer border hover:border-[#192A7A] shadow-md mx-2 mb-2"
                    onClick={() => selectImage(index)}
                  />
                ))}
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {productInfo.productName}
              </h2>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Prix: {""}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    
                    {ProductPrice} 
                  </span>
                  <span className="text-xl">د.ت</span>
                 
                </div>
                <div className="mt-2">
                  <div>
                    {productInfo.availability &&
                      !productInfo.availability.includes("%") && (
                        <div>
                          <span className="font-bold text-gray-700 dark:text-gray-300">
                            Disponibilité:{" "}
                          </span>
                          <span
                            className={`bg-gray-300 dark:bg-gray-700 text-white dark:text-white py-1 px-2 rounded-full font-bold mr-2 ${
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

              {productInfo.sizes.length !== 0 && (
                <div className="mb-4 flex flex-wrap items-center">
                  <span className="font-bold text-gray-700 dark:text-gray-300 mr-2 ">
                    Dimensions :
                  </span>
                  {ShowPop && (
                    <div className="flex justify-center mt-2">
                      <span className="text-red-500 font-bold animate-bounce">
                        Veuillez sélectionner une Dimension avant d'ajouter au
                        panier.
                      </span>
                    </div>
                  )}
                
                  {productInfo.sizes.map((sizeObj, index) => (
                    <label
                      key={index}
                      className="flex items-center border p-2 rounded-full mr-2 mb-2"
                      style={{ minWidth: "80px" }}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={sizeObj.size}
                        onChange={() => {
                          handleSizeChange(sizeObj.size);
                          setShowPop(false);
                        }}
                        className="mr-2 appearance-none bg-gray-300 checked:bg-[#192A7A] rounded-full h-6 w-6"
                      />
                      <span className="text-[#192A7A] font-semibold">
                        {sizeObj.size}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Quantité :
                </span>
                <div className="flex h-8 w-7 items-stretch text-gray-600">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-[#192A7A] hover:text-white"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-[#192A7A] hover:text-white"
                  >
                    +
                  </button>
                </div>
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
              <div className="border-gray-300">
                <h2 className="font-bold text-lg text-gray-700 dark:text-gray-300">
                  Description du produit:
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4  rounded-lg">
                  <h3 className="font-bold text-xl uppercase text-gray-700 dark:text-gray-300 ml-2 mb-2">
                    {productInfo.productName} DE HAUTE QUALITE : 
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
      {isModalOpen && (
        <div className="fixed top-0 z-[999999999999] left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="absolute top-0 right-0 m-4">
            <button
              onClick={closeModal}
              className="text-white text-lg px-3 py-1 rounded-full"
            >
              <span className="text-2lg"> x</span>
            </button>
          </div>
          <img
            className="max-h-full max-w-full"
            src={imageGallery[selectedImageIndex]}
            alt={`Product Image ${selectedImageIndex}`}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;

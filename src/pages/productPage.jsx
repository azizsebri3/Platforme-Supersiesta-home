import React, { useEffect } from "react";
import { useProduct } from "../context/productContext";
import { useCart } from "../context/cartProvider ";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { productInfo } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { img, desc, price } = productInfo;
  

  useEffect(() => {
    // Check if productInfo is available
    if (!productInfo) {
      // If productInfo is not available, redirect to another page (e.g., home page)
      navigate("/");
    }
  }, [productInfo, navigate]);

  const handleAddToCart = () => {
    addToCart(img, desc, price);
  };

  return (
    <div className="bg-white-100 dark:bg-gray-800 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] mt-20 rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={img}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-800 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-700 dark:hover:bg-gray-700"
                >
                  Ajouter Au panier
                </button>
              </div>
              <div className="w-1/2 px-2">
                <Link to={"/"}>
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Retourner a l'acceuil
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4 mt-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {desc}
            </h2>
            <div className="ml-3">
              <div className="ml-5">
                <p className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                  <span className="text-xl font-serif font-bold">
                    MATELAS ORTHOPEDIQUE A RESSORT DE HAUTE QUALITE:
                  </span>
                </p>
                <ul className="mb-0 list-disc">
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-lg">Hauteur 22 cm</span>
                  </li>
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-lg">Jusqu’à 160kg par couple</span>
                  </li>
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-lg">Ressort bonnells</span>
                  </li>
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-lg">Matelas réversible</span>
                  </li>
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-lg">
                      Tissus 100 % coton anti acarien
                    </span>
                  </li>
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-lg">Résistant au feu</span>
                  </li>
                  <li className="mt-0 mb-10.0pt leading-normal text-base font-sans text-gray-800">
                    <span className="text-2xl font-serif font-bold">
                      Garantie 3 ans
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex mb-4 mt-10">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Prix:
                </span>
                <span className="text-red-600  dark:text-gray-300">
                  <span className="text-bold">{price}</span> د.ت
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Disponiblité :
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  En Stock
                </span>
                {/* Subscription form */}
                <form className="container flex flex-col  ">
                  <div className="flex  w-40 mt-4 ">
                    <input
                      className="rounded-2xl w-full p-4 border-t mr-0 border text-gray-800 border-gray-200 bg-white"
                      placeholder="Votre Nom"
                    />
                  </div>
                  <div className="flex  w-40 mt-4 ">
                    <input
                      className="rounded-2xl w-40 p-4 border-t mr-0 border text-gray-800 border-gray-200 bg-white"
                      placeholder="Votre Prénom"
                    />
                  </div>
                  <div className="flex w-40 mt-4 ">
                    <input
                      className="rounded-2xl w-40 p-4 border-t mr-0 border text-gray-800 border-gray-200 bg-white"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex mb-4 w-40 mt-4 ">
                    <input
                      className="rounded-2xl w-40 p-4 border-t mr-0 border text-gray-800 border-gray-200 bg-white"
                      placeholder="Adresse de Livraison"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

import React, { useEffect } from "react";
import { useProduct } from "../context/productContext";
import { useCart } from "../context/cartProvider ";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { productInfo } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { img, desc, price } = productInfo;

  const renderSVGs = () => {
    const svgs = [];
    for (let i = 0; i < 5; i++) {
      svgs.push(
        <svg
          key={i}
          className="block h-4 w-4 align-middle text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            className
          />
        </svg>
      );
    }
    return svgs;
  };

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
    <section className="py-12 sm:py-16">
      <div className="container mt-10 mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <div className="relative">
                    <img
                      className="h-full w-full max-w-full object-cover transition-transform duration-300 transform-gpu hover:scale-105"
                      src={img}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={img}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {desc}
            </h1>
            <div className="mt-5 flex items-center">
              <div className="flex items-center">{renderSVGs()}</div>
              <p className="ml-2 text-sm font-medium text-gray-500">
                1,209 Commentaires
              </p>
            </div>
            <h2 className="mt-8 text-base text-gray-900">Dimension : </h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              <label className>
                <input
                  type="radio"
                  name="type"
                  defaultValue="Powder"
                  className="peer sr-only"
                  defaultChecked
                />
                <p className="peer-checked:bg-[#a5bb08] peer-checked:text-white rounded-lg border  px-6 py-2 font-bold cursor-pointer">
                  190×140
                </p>
              </label>
              <label className>
                <input
                  type="radio"
                  name="type"
                  defaultValue="Whole Bean"
                  className="peer sr-only"
                />
                <p className="peer-checked:bg-[#a5bb08] peer-checked:text-white rounded-lg border  px-6 py-2 font-bold cursor-pointer">
                  190×160
                </p>
              </label>
              <label className>
                <input
                  type="radio"
                  name="type"
                  defaultValue="Groud"
                  className="peer sr-only"
                />
                <p className="peer-checked:bg-[#a5bb08] peer-checked:text-white rounded-lg border  px-6 py-2 font-bold cursor-pointer">
                  200×160
                </p>
              </label>
              <label className>
                <input
                  type="radio"
                  name="type"
                  defaultValue="Groud"
                  className="peer sr-only"
                />
                <p className="peer-checked:bg-[#a5bb08] peer-checked:text-white rounded-lg border px-6 py-2 font-bold cursor-pointer">
                  200×180
                </p>
              </label>
            </div>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl ml-3 font-bold">{price}</h1>
                <span className="text-base ml-1">د.ت</span>
              </div>
              <button
                onClick={handleAddToCart}
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#a5bb08]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Ajouter au Panier
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="0 0 612 612"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M226.764,375.35c-28.249,0-51.078,22.91-51.078,51.16c0,28.166,22.829,51.078,51.078,51.078s51.078-22.912,51.078-51.078
			C277.841,398.26,255.013,375.35,226.764,375.35z M226.764,452.049c-14.125,0-25.54-11.498-25.54-25.541
			c0-14.123,11.415-25.539,25.54-25.539c14.124,0,25.539,11.416,25.539,25.539C252.302,440.551,240.888,452.049,226.764,452.049z
			 M612,337.561v54.541c0,13.605-11.029,24.635-24.636,24.635h-26.36c-4.763-32.684-32.929-57.812-66.927-57.812
			c-33.914,0-62.082,25.129-66.845,57.812H293.625c-4.763-32.684-32.93-57.812-66.845-57.812c-33.915,0-62.082,25.129-66.844,57.812
			h-33.012c-13.606,0-24.635-11.029-24.635-24.635v-54.541H612L612,337.561z M494.143,375.35c-28.249,0-51.16,22.91-51.16,51.16
			c0,28.166,22.912,51.078,51.16,51.078c28.166,0,51.077-22.912,51.077-51.078C545.22,398.26,522.309,375.35,494.143,375.35z
			 M494.143,452.049c-14.125,0-25.539-11.498-25.539-25.541c0-14.123,11.414-25.539,25.539-25.539
			c14.042,0,25.539,11.416,25.539,25.539C519.682,440.551,508.185,452.049,494.143,452.049z M602.293,282.637l-96.817-95.751
			c-6.159-6.077-14.453-9.526-23.076-9.526h-48.86v-18.313c0-13.631-11.004-24.635-24.635-24.635H126.907
			c-13.55,0-24.635,11.005-24.635,24.635v3.86L2.3,174.429l177.146,23.068L0,215.323l178.814,25.423L0,256.25l102.278,19.29
			l-0.007,48.403h509.712v-17.985C611.983,297.171,608.452,288.796,602.293,282.637z M560.084,285.839h-93.697
			c-2.135,0-3.86-1.724-3.86-3.859v-72.347c0-2.135,1.725-3.86,3.86-3.86h17.82c0.985,0,1.971,0.411,2.71,1.068l75.796,72.347
			C565.257,281.569,563.532,285.839,560.084,285.839z"
                      />
                    </g>
                  </g>
                </svg>
                Livraison gratuite à domicile.
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className
                  />
                </svg>
                Annuler à tout moment
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <a
                  href="#"
                  title
                  className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                >
                  {" "}
                  Description{" "}
                </a>
              </nav>
            </div>
            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-3xl font-bold">Livré à votre porte</h1>
              <p className="mt-4">
                Nos matelas de luxe sont livrés à votre porte avec soin et
                rapidité, pour que vous puissiez vous détendre et profiter d'un
                confort optimal dès la première nuit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

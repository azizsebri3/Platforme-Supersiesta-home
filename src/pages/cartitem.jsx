import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useCart } from "../context/cartProvider";
import { HiOutlineTrash } from "react-icons/hi";
import "../output.css";
import DialogCustomAnimation from "../components/dialog";

const ShoppingCart = () => {
  const {
    cartItems,
    setCartItems,
    updateCartItemQuantity,
    removeFromCart,
    totalPrice,
    setTotalPrice,
    setTotalItems,
  } = useCart();
  const [showDialog, setShowDialog] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState({});
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "do MMMM yyyy 'à' hh:mm aa", {
    locale: fr,
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      const storedCartItems = localStorage.getItem("cartItems");
      const storedTotalPrice = localStorage.getItem("totalPrice");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedTotalPrice) {
        setTotalPrice(JSON.parse(storedTotalPrice));
      }
    }
  }, [navigate, cartItems]);

  const handleConfirm = () => {
    confirmRemoveFromCart();
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleRemoveConfirmation = (productId, productSize) => {
    setShowDialog(true);
    // Set the productIdToRemove state as an object containing both productId and productSize
    setProductIdToRemove({ id: productId, size: productSize });
  };

  const confirmRemoveFromCart = () => {
    console.log(productIdToRemove);
    removeFromCart(productIdToRemove);
    setShowDialog(false);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Votre Panier</h1>
        </div>
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <button
            onClick={() => {
              navigate("/");
              window.scroll(30, 60);
            }}
            type="button"
            className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-[#A5BB08] w-12 h-12  text-sm "
            data-modal-hide="popup-modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-5">
              <div className="flow-root">
                <ul className="-my-8">
                  {cartItems.length === 0 ? (
                    <li className="flex flex-col text-[1rem] font-bold justify-center items-center space-y-3 py-6 text-center ">
                      Votre Panier est vide !
                      <div className="mt-5 w-1/2">
                        <button
                          onClick={() => {
                            navigate("/");
                          }}
                          type="button"
                          className="group inline-flex w-full items-center justify-center rounded-md bg-[#a5bb08]  py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#87A922]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="group-hover:mr-8 mr-2 h-6 w-6 transition-all"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            ></path>
                          </svg>
                          Continuez Vos Achats
                        </button>
                      </div>
                    </li>
                  ) : (
                    cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {item.name}{" "}
                                {item.size && (
                                  <span className="text-[#9ca3af]">
                                    -- taille {item.size}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                {item.price} د.ت
                              </p>

                              <div className="sm:order-1">
                                <div className="flex h-8 items-stretch text-gray-600">
                                  <button
                                    onClick={() =>
                                      updateCartItemQuantity(
                                        item.id,
                                        item.size,
                                        item.quantity - 1
                                      )
                                    }
                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                    {item.quantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateCartItemQuantity(
                                        item.id,
                                        item.size,
                                        item.quantity + 1
                                      )
                                    }
                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              onClick={() =>
                                handleRemoveConfirmation(item.id, item.size)
                              }
                              type="button"
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-red-600"
                            >
                              <HiOutlineTrash className="h-7 w-7 " />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              {cartItems.length > 0 && (
                <>
                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Sous Total </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {totalPrice} د.ت
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Livraison</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {" "}
                        د.ت 8.00
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">
                        د.ت
                      </span>{" "}
                      {totalPrice}
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <Link
                      to="/checkout?fromCart=true"
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-[#a5bb08] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#87A922]"
                    >
                      Commander
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDialog && (
        <DialogCustomAnimation
          title="Êtes-vous sûr de vouloir supprimer ce produit ?"
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default ShoppingCart;

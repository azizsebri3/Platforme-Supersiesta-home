import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useCart } from "../context/cartProvider ";
import { HiOutlineTrash } from "react-icons/hi";
import "../output.css";
import DialogCustomAnimation from "./dialog";
import photo from "../assets/matlas.png";

const ShoppingCart = () => {
  const { cartItems, setCartItems, totalItemsInCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "do MMMM yyyy 'à' hh:mm aa", {
    locale: fr,
  });

  const handleConfirm = () => {
    // Remove the product from the cart
    confirmRemoveFromCart();
  };

  const handleCancel = () => {
    // Cancel the action
    setShowDialog(false);
  };

  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += Number(item.price * item.quantity);
      });
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  const handleRemoveConfirmation = (productId) => {
    setShowDialog(true); // Show the confirmation dialog
    setProductIdToRemove(productId); // Set the productId to remove
  };

  const confirmRemoveFromCart = () => {
    const updatedProducts = cartItems.filter(
      (item) => item.id !== productIdToRemove
    );
    setCartItems(updatedProducts);
    setShowDialog(false); // Hide the confirmation dialog after removing the product
  };

  const updateQuantity = (productId, newQuantity) => {
    // Check if the new quantity is not negative
    if (newQuantity < 0) {
      return; // Do not update the quantity if it becomes negative
    }

    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Votre Panier</h1>
        </div>
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <p className="text-[#a5bb08] ml-2">{formattedDate}</p>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {/* {totalItemsInCart === 0 && (
                  <span className="text-red-600 text-2xl justify-center text-center">
                    Le panier est vide
                  </span>
                )} */}
                <ul className="-my-8">
                  {cartItems.map((item) => (
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
                              {item.desc}
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
                                    updateQuantity(item.id, item.quantity - 1)
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
                                    updateQuantity(item.id, item.quantity + 1)
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
                          onClick={() => handleRemoveConfirmation(item.id)}
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                className
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Sous Total </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {subtotal}
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
                  <span className="text-xs font-normal text-gray-400">د.ت</span>{" "}
                  {subtotal + 8}
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDialog && (
        <DialogCustomAnimation
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default ShoppingCart;

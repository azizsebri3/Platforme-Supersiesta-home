import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartProvider";
import { motion } from "framer-motion";

export default function ShoppingCart() {
  const {
    cartItems,
    setCartItems,
    updateCartItemQuantity,
    removeFromCart,
    totalPrice,
    setTotalPrice,
    open,
    setOpen,
    recentlyAddedItem,
    isItemAdded,
    setisItemAdded,
  } = useCart();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
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
  }, [navigate]);

  const handleClick = () => {
    setisItemAdded(true);
    setTimeout(() => {
      setisItemAdded(false);
    }, 2000);
  };


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-[999999999999]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                  {isItemAdded && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 300,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: -40,
                        rotate: 5,
                        scale: 1.2,
                        transition: { duration: 0.3 },
                      }}
                      transition={{ duration: 0.5 }}
                      className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 shadow-lg"
                    >
                      <p className="text-xl font-semibold">
                        {" "}
                        {recentlyAddedItem} a été ajouté avec success
                      </p>
                      <p>
                        Your order has been successfully confirmed and is now
                        being processed.
                      </p>
                    </motion.div>
                  )}
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panier
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200 "
                          >
                            {cartItems.length === 0 && (
                              <li className="py-6 flex">
                                <p className="text-sm text-red-500">
                                  Votre panier est vide
                                </p>
                              </li>
                            )}
                            {cartItems.map((product) => (
                              <>
                                <motion.li
                                  key={product.size ? product.size : product.id}
                                  initial={{
                                    opacity: 0,
                                    y: 20,
                                    rotate: -5,
                                    scale: 0.8,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    y: -20,
                                    rotate: 5,
                                    scale: 1.2,
                                    transition: { duration: 0.3 },
                                  }}
                                  transition={{ duration: 0.5 }}
                                  className="flex py-6"
                                >
                                  {/* Your cart item content */}
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image[0]}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <p>{product.name}</p>
                                          </h3>
                                          <p className="ml-4">
                                            {product.price}د.ت
                                          </p>
                                        </div>
                                        {product.size && (
                                          <p className="mt-1 text-sm text-gray-500">
                                            Taille: {product.size}
                                          </p>
                                        )}
                                      </>
                                    </div>
                                    <div className="flex items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty</p>
                                      <button
                                        onClick={() => {
                                          updateCartItemQuantity(
                                            product.id,
                                            product.size,
                                            product.quantity - 1
                                          );
                                          if (product.quantity === 0) {
                                            removeFromCart(product);
                                            setShowPopup(true); // Show popup when removing item
                                          }
                                        }}
                                        className="flex items-center  justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                      >
                                        -
                                      </button>

                                      <div className="flex items-center justify-center bg-gray-100 px-1 text-sm uppercase transition">
                                        {product.quantity}
                                      </div>
                                      <button
                                        onClick={() =>
                                          updateCartItemQuantity(
                                            product.id,
                                            product.size,
                                            product.quantity + 1
                                          )
                                        }
                                        className="flex items-center  justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                      >
                                        +
                                      </button>
                                      <div className="flex">
                                        <button
                                          onClick={() => {
                                            removeFromCart(product);
                                            setShowPopup(true); // Show popup when removing item
                                          }}
                                          className="font-medium text-[#A5BB08] hover:text-[#87A922]"
                                        >
                                          supprimer
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.li>
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Totale</p>
                          <p>{totalPrice}د.ت</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Livraison gratuite
                        </p>
                        <div className="mt-6">
                          <Link
                            to="/checkout?fromCart=true"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-[#A5BB08] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#87A922] sm:text-sm"
                          >
                            commander
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <Link
                              to={"/"}
                              type="button"
                              className="font-medium text-[#A5BB08] hover:text-[#87A922]"
                              onClick={() => setOpen(false)}
                            >
                              retourner au page d'accueil
                              <span aria-hidden="true"> &rarr;</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

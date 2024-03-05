import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useCart } from "../context/cartProvider ";
import { HiOutlineTrash } from "react-icons/hi";
import "../output.css";
import DialogCustomAnimation from "./dialog";

const ShoppingCart = () => {
  const { cartItems, setCartItems } = useCart();
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
    // Vérifier que la nouvelle quantité n'est pas négative
    if (newQuantity < 0) {
      return; // Ne pas mettre à jour la quantité si elle devient négative
    }
  
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  // const handleAccueilClick = () => {
  //   navigate("/");
  //   window.scrollTo({
  //     top: document.getElementById("acceuil-section").offsetTop,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mt-20 mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Le Panier</h1>
        <p className="text-base dark:text-gray-300 font-bold leading-6 text-green-600">
          {formattedDate}
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-2xl text-red-600">Le panier est vide !</p>
              ) : (
                <table className="container w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((product) => (
                      <tr key={product.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-20 w-25 hidden md:inline-block  mr-4"
                              src={product.image}
                              alt="Product image"
                            />
                            <span className="font-semibold sm:text-xl">
                              {product.desc}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">د.ت {product.price}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-2 ml-1"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className="text-center w-4">
                              {product.quantity}
                            </span>
                            <button
                              className="border rounded-md py-2 px-2 ml-1"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">د.ت {product.price * product.quantity }</td>
                        <td>
                          <div className="flex">
                            <button
                              type="button"
                              className="text-2xl text-[#A5BB08]  hover:text-red-600"
                              onClick={() =>
                                handleRemoveConfirmation(product.id)
                              }
                            >
                              <HiOutlineTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg mb-15 shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">l'addition</h2>
              <div className="flex justify-between mb-2">
                <span>Livraison</span>
                <span> د.ت 8.00 </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Totale:</span>
                <span className="font-semibold">
                  {subtotal === 0 ? 0 : subtotal + 8} د.ت{" "}
                </span>
              </div>
              <button className="bg-[#A5BB08] hover:bg-[#7d872e] text-white py-2 px-4 rounded-lg mt-4 w-full">
                Commander
              </button>
              <Link
               to={'/'}
               >
              <button
                className="bg-[#A5BB08] hover:bg-[#7d872e] text-white py-2 px-4 rounded-lg mt-4 w-full"
              >
                Retourner à l'accueil
              </button>
              </Link>
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
    </div>
  );
};

export default ShoppingCart;

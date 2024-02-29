import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useCart } from "../context/cartProvider ";
import "../output.css";

const ShoppingCart = ({ products }) => {
  const { cartItems, setCartItems } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "do MMMM yyyy 'at' hh:mm aa");

  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += Number(item.price);
      });
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  const removeFromCart = (productId) => {
    alert("u want to remove the product from the shopping Cart ?");
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };
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
              <table className="w-full">
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
                            className="h-16 w-16 mr-4"
                            src={product.image}
                            alt="Product image"
                          />
                          <span className="font-semibold sm:text-xl">{product.desc}</span>
                        </div>
                      </td>
                      <td className="py-3">د.ت {product.price}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                        <button className="border rounded-md py-2 px-2 ml-1">
                            -
                          </button>
                          <span className="text-center w-4">1</span>
                          <button className="border rounded-md py-2 px-2 ml-1">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3">د.ت {product.price}</td>
                      <td>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-[#A5BB08]  hover:text-red-600"
                            onClick={() => removeFromCart(product.id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  {subtotal == 0 ? 0 : subtotal + 8} د.ت{" "}
                </span>
              </div>
              <button className="bg-[#A5BB08] hover:bg-[#7d872e] text-white py-2 px-4 rounded-lg mt-4 w-full">
                Commander
              </button>
              <Link to={"/"}>
                <button className="bg-[#A5BB08] hover:bg-[#7d872e] text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Retourner à l'accueil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

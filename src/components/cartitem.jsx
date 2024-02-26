import React from "react";
import { useCart } from "../cartProvider ";

const CartItem = () => {
  const { cartItems, setCartItems } = useCart();

  return (
    <div className="h-screen bg-gray-100 px-auto py-auto">
      <h1 className="mb-10 text-center text-2xl font-bold">Panier</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-white p-6 shadow-md flex mb-6"
          >
            <img src={item.image} alt={item.desc} className="w-40 rounded-lg" />
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">{item.desc}</h2>
                <p className="text-lg font-semibold text-gray-900">
                  {item.price} د.ت
                </p>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-sm text-gray-500">Qty</p>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    const updatedCartItems = cartItems.map((cartItem) =>
                      cartItem.id === item.id
                        ? { ...cartItem, quantity: newQuantity }
                        : cartItem
                    );
                    setCartItems(updatedCartItems);
                  }}
                  className="h-8 w-12 border border-gray-300 rounded-md ml-2 text-sm px-2"
                />
                <button
                  onClick={() => {
                    const updatedCartItems = cartItems.filter(
                      (cartItem) => cartItem.id !== item.id
                    );
                    setCartItems(updatedCartItems);
                  }}
                  className="text-red-500 ml-2 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Create a context provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };

  // Update total price whenever cart items change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (image, desc, price) => {
    const newItem = {
      image,
      desc,
      price,
      id: cartItems.length + 1,
      quantity: 1,
    };
    setCartItems([...cartItems, newItem]);
  };

  // Function to update item quantity in cart
  const updateCartItemQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCart = () => useContext(CartContext);

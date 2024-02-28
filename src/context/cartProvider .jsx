import React, { createContext, useContext, useState } from "react";


// Créez le contexte
const CartContext = createContext();

// Créez un fournisseur de contexte
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (image, desc, price) => {
    const newItem = { image, desc, price, id: cartItems.length + 1, quantity: 1 };
    setCartItems([...cartItems, newItem]);
  };
  return (
    <CartContext.Provider value={{ cartItems, setCartItems ,addToCart}}>
      {children}
    </CartContext.Provider>
  );
};

// Créez un hook personnalisé pour utiliser le contexte
export const useCart = () => useContext(CartContext);

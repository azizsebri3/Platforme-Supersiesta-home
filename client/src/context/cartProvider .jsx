import React, { createContext, useContext, useState, useEffect } from "react";
import SlideInNotifications from "../components/slideInNotifications" ;

// Create the context
const CartContext = createContext();

// Create a context provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };
  useEffect(() => {
    // Count the number of unique items in the cart
    const uniqueItems = new Set(cartItems.map((item) => item.id));
    setTotalItems(uniqueItems.size);
  }, [cartItems]);

  // Update total price whenever cart items change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id || cartItem.id === item._id
    );

    if (existingItemIndex !== -1) {
      // If item already exists in cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      console.log(updatedCartItems);
      setCartItems(updatedCartItems);
    } else {
      // If item doesn't exist in cart, add it with quantity 1
      const newItem =
        "_id" in item
          ? {
              id: item._id,
              image: item.imageUrl,
              name: item.productName,
              desc: item.productDescription,
              oldPice :item.productoldPrice,
              price: item.productPrice,
              quantity: 1,
            }
          : {
              id: item.id,
              image: item.image,
              name: item.name,
              desc: item.desc,
              oldPrice : item.oldPrice ,
              price: item.price,
              quantity: 1,
            };
      setCartItems([...cartItems, newItem]);
      console.log(cartItems);
    }
  };

  // Function to update item quantity in cart
  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 0) {
      removeFromCart(itemId);
      return;
    }
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
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCart = () => useContext(CartContext);

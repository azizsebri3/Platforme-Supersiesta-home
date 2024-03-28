import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Create a context provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [recentlyAddedItem, setrecentlyAddedItem] = useState(null);
  const [isItemAdded, setisItemAdded] = useState(false);

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setTotalItems(0);
    } else {
      const uniqueItems = new Set(cartItems.map((item) => item.id));
      setTotalItems(uniqueItems.size);
    }
  
    const totalPrice = calculateTotalPrice(cartItems);
    setTotalPrice(totalPrice);
  
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems]);
  

  // Function to add item to cart
  const addToCart = (item, size = null) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id || cartItem.id === item._id
    );

    if (existingItemIndex !== -1) {
      // If item already exists in cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      localStorage.setItem("totalItems", JSON.stringify(totalItems));
    } else {
      // If item doesn't exist in cart, add it with quantity 1
      const newItem =
        "_id" in item
          ? {
              id: item._id,
              image: item.imageUrl,
              name: item.productName,
              desc: item.productDescription,
              oldPrice: item.productoldPrice,
              price: item.productPrice,
              selectedSize: size,
              quantity: 1,
            }
          : {
              id: item.id,
              image: item.image,
              name: item.name,
              desc: item.desc,
              oldPrice: item.oldPrice,
              price: item.price,
              selectedSize: size,
              quantity: 1,
            };
      setCartItems([...cartItems, newItem]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newItem])
      );
      const newTotalItems = cartItems.length + 1; // Calculate the new totalItems value
      setTotalItems(newTotalItems); // Update totalItems state
      localStorage.setItem("totalItems", JSON.stringify(newTotalItems));

      setrecentlyAddedItem(newItem.name);
      setisItemAdded(true);

      // Reset isItemAdded to false after 2 seconds
      setTimeout(() => {
        setisItemAdded(false);
      }, 2000);
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
    // Update local storage after updating cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    // Update local storage after removing item from cart
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
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
        setTotalItems,
        isItemAdded,
        setTotalPrice,
        recentlyAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCart = () => useContext(CartContext);

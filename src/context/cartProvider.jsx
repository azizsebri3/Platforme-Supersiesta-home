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
  // Function to add item to cart
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
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
      let price = item.productPrice; // Default price

      if (item.selectedSize) {
        // If a size is selected, find the corresponding price
        const selectedSizeObject = item.sizes.find(
          (sizeObj) => sizeObj.size === item.selectedSize
        );
        if (selectedSizeObject) {
          price = selectedSizeObject.price;
        }
      }

      const newItem = {
        id: item._id || item.id,
        image: item.imageUrls || item.image,
        name: item.productName || item.name,
        desc: item.productDescription || item.desc,
        oldPrice: item.productoldPrice || item.oldPrice,
        price: item.price,
        size: item.selectedSize,
        quantity: item.quantity > 0 ? item.quantity : 1, // Always start with quantity 1 for a new item
      };

      // Check if the item with the same id and size already exists in cart
      const existingCartItem = cartItems.find(
        (cartItem) =>
          cartItem.id === newItem.id && cartItem.size === newItem.size
      );

      if (existingCartItem) {
        // If exists, update its quantity
        existingCartItem.quantity += newItem.quantity;
        setCartItems([...cartItems]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        // If not exists, add it to cart
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
    }
  };

  // Function to update item quantity in cart
  const updateCartItemQuantity = (itemId, itemSize, newQuantity) => {
    if (newQuantity < 0) {
      removeFromCart(itemId, itemSize); // Remove the item if quantity is less than 0
      return;
    }
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && itemSize === item.size
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCartItems);
    // Update local storage after updating cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Function to remove item from cart
  const removeFromCart = (productInfo) => {
    const updatedCartItems = cartItems.filter(
      (item) => !(item.id === productInfo.id && item.size === productInfo.size)
    );
    setCartItems(updatedCartItems);
    // Update local storage after removing item from cart
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    const newTotalItems = updatedCartItems.length; // Calculate the new totalItems value
    setTotalItems(newTotalItems); // Update totalItems state
    localStorage.setItem("totalItems", JSON.stringify(newTotalItems));
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

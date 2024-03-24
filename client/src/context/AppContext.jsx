// context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [productInfo, setProductInfo] = useState({});
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  // hathi globale fetching l Products lkol
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log("Response data:", response.data);
        if (!response.data || response.data.length === 0) {
          setNoProductsFound(true);
        } else {
          setFetchedProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };
    fetchAllProducts();
  }, []);
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log("Response data:", response.data);
        setFetchedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };
    fetchAllProducts();
  }, []);

  // ki n selectionner product mel Product Card bech yt3ada l Product Page lazm yt3ada bel function hathi
  const setProduct = (item) => {
    const newItem = {
      id: item._id,
      image: item.imageUrl,
      name: item.productName,
      desc: item.productDescription,
      oldPice: item.productoldPrice,
      price: item.productPrice,
      quantity: 1,
    };
    setProductInfo(newItem);
  };

  return (
    <AppContext.Provider
      value={{
        productInfo,
        setProduct,
        fetchedProducts,
        loading,
        noProductsFound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

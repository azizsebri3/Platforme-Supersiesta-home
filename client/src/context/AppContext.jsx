import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const homeRef = React.useRef();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSelected, setProductSelected] = useState("Acceuil");

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
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);


  const handleFilterCategory = (selectedCategory) => {
    // Filter products based on selectedCategory
    const filteredProducts = fetchedProducts.filter(
      (product) => product.category === selectedCategory
    );
    // Set filtered products
    setFilteredProducts(filteredProducts);
  };

  return (
    <AppContext.Provider
      value={{
        fetchedProducts,
        loading,
        handleFilterCategory,
        filteredProducts,
        setProductSelected,
        productSelected,
        homeRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

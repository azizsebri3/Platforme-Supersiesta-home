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
        const response = await axios.get("https://backend-supersiesta-home.onrender.com/api/products");
        console.log("Response data:", response.data.data);
        setFetchedProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        fetchedProducts,
        loading,
        filteredProducts,
        setProductSelected,
        productSelected,
        homeRef,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

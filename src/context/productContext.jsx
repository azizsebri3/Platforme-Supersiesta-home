import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productInfo, setProductInfo] = useState({});

  const setProduct = (img, desc, price) => {
    setProductInfo({ img, desc, price });
  };

  return (
    <ProductContext.Provider value={{ productInfo, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

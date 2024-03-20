// CategoryContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a new context
const CategoryContext = createContext();

// Define a provider component
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to consume the context
export const useCategory = () => useContext(CategoryContext);

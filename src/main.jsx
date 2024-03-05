import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {CategoryProvider} from "./context/CategoryContext.jsx" ; 
import { CartProvider } from "./context/cartProvider .jsx";
import { ProductProvider } from "./context/productContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CategoryProvider>
    <CartProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CartProvider>
    </CategoryProvider>
  </React.StrictMode>
);

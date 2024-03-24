import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx"; 
import { CartProvider } from "./context/cartProvider .jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
    <CartProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </CartProvider>
  </React.StrictMode>
);

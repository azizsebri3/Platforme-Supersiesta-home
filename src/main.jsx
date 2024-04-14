import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { CartProvider } from "./context/cartProvider.jsx";
import { OtpProvider } from "./context/OtpContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AppProvider>
        <OtpProvider>
        <App />
        </OtpProvider>
      </AppProvider>
    </CartProvider>
  </React.StrictMode>
);

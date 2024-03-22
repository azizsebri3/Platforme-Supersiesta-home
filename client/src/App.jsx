import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import SignIn from "./SignIn";
import Contact from "./pages/contact";
import Propos from "./pages/propos";
import ProductPage from "./pages/productPage";
import ScrollButton from "./components/ScrollButton";
import ShoppingCart from "./components/cartitem";
import CartButton from "./components/cartButton";
import "./output.css";
import Checkout from "./pages/checkout";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Product/:id" element={<ProductPage />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          
        </Routes>
        <ScrollButton />
        <CartButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

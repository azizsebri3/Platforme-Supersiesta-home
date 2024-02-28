import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import Categories from "./pages/Categories";
import "./output.css";
import SignIn from "./SignIn";
import Contact from "./pages/contact";
import Propos from "./pages/propos";
import CartItem from "./components/cartitem";
import ProductPage from "./pages/productPage";
import ScrollButton from "./components/ScrollButton ";
import ShoppingCart from "./components/cartitem2";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/Catégories" element={<Categories />} />
          <Route path="/Product/:id" element={<ProductPage />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
        <ScrollButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

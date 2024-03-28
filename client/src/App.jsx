import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar.jsx";
import Footer from "./pages/footer";
import SignIn from "./SignIn";
import Contact from "./pages/contact";
import Propos from "./pages/propos";
import ProductPage from "./pages/productPage";
import ScrollButton from "./components/ScrollButton";
import ShoppingCart from "./pages/cartitem";
import CartButton from "./components/cartButton";
import "./output.css";
import Checkout from "./pages/checkout";
import AddProduct from "./pages/addProduct";
import { useAppContext } from "./context/AppContext.jsx";
import Loading from "./components/loading.jsx";
import { useCart } from "./context/cartProvider.jsx";
import SlideInNotifications from "./components/slideInNotifications.jsx";

function App() {
  const { loading, homeRef } = useAppContext();
  const { isItemAdded, recentlyAddedItem } = useCart();
  return (
    <Router>
      <div>
        <Navbar HomeRef={homeRef} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Product/:category/:name" element={<ProductPage />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
        <ScrollButton />
        <CartButton />
        <Footer />
      </div>
      {isItemAdded && <SlideInNotifications text={recentlyAddedItem} />}

      {loading && <Loading />}
    </Router>
  );
}

export default App;

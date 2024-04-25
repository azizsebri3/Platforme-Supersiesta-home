import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Footer,
  Contact,
  Propos,
  Navbar,
  ProductPage,
  ShoppingCart,
  Checkout,
  ScrollButton,
  CartButton,
  Loading,
  SlideInNotifications,
  useAppContext,
  useCart,
} from "./index";

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
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <ScrollButton />
        <CartButton />
        <Footer />
      </div>
      {isItemAdded && <SlideInNotifications text={recentlyAddedItem} />}

      {loading && <Loading active={loading} />}
    </Router>
  );
}

export default App;

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
import Layout from "./Layout";

function App() {
  const { loading, homeRef } = useAppContext();
  const { isItemAdded, recentlyAddedItem } = useCart();
  return (
    <Router>
      <div>
        <Navbar HomeRef={homeRef} />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/Product/:category/:name"
            element={
              <Layout>
                <ProductPage />
              </Layout>
            }
          />
          <Route
            path="/propos"
            element={
              <Layout>
                <Propos />
              </Layout>
            }
          />
          <Route
            path="/Contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />
        </Routes>
        <ScrollButton />
        <CartButton />
        <Footer />
      </div>
      {isItemAdded && <SlideInNotifications text={recentlyAddedItem} />}
      {loading && <Loading active={loading} />}
      {open && <ShoppingCart />}
    </Router>
  );
}

export default App;

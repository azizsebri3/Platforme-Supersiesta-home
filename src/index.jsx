// imports.js
import Home from "./pages/home.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./pages/footer";
import Contact from "./pages/contact";
import Propos from "./pages/propos";
import ProductPage from "./pages/productPage";
import ScrollButton from "./components/ScrollButton";
import ShoppingCart from "./pages/cartitem";
import CartButton from "./components/cartButton";
import "./output.css";
import Checkout from "./pages/checkout";
import { useAppContext } from "./context/AppContext.jsx";
import Loading from "./components/loading.jsx";
import { useCart } from "./context/cartProvider.jsx";
import SlideInNotifications from "./components/slideInNotifications.jsx";

export {
  Home,
  Navbar,
  Footer,
  Contact,
  Propos,
  ProductPage,
  ScrollButton,
  ShoppingCart,
  CartButton,
  Checkout,
  useAppContext,
  Loading,
  useCart,
  SlideInNotifications,
};

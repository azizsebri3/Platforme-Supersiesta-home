import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartProvider";
import { useNavigate, useLocation } from "react-router-dom";
import "../output.css";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import sac from "../assets/bag.png";

const CartButton = () => {
  //const [visible, setVisible] = useState(false);
  const { cartItems, setCartItems, setOpen, open } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  useEffect(() => {
    const storedcartItems = localStorage.getItem("cartItems");
    if (storedcartItems) {
      setCartItems(JSON.parse(storedcartItems));
    }
  }, [setCartItems]);

  // Check if the current path is "/cart"
  const isCartPage = location.pathname === "/cart";

  if (isCartPage) {
    return null;
  }

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`fixed z-50 bottom-10 right-7 p-2 border-0 rounded-full shadow-xl bg-[#A5BB08] hover:bg-[#192A7A] text-white text-lg font-semibold transition-colors duration-300 ${
        cartItems.length > 0 ? "animate-bounce" : ""
      }`}
    >
      <span className="relative">
        <span className="inline-block relative">
          <img src={sac} className="w-9 h-auto " alt="cart" />
          <span className="absolute top-0 right-0 bg-white text-black rounded-full h-4 w-4 flex items-center justify-center text-xs font-bold">
            {cartItems.length}
          </span>
        </span>
      </span>
    </button>
  );
};

export default CartButton;

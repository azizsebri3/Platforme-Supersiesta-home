import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartProvider ";
import "../output.css";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const CartButton = () => {
  const [visible, setVisible] = useState(false);
  const { cartItems } = useCart();

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setVisible(scrollTop > 150); // Update visibility based on scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (totalItemsInCart === 0 || !visible) {
    return null;
  }

  return (
    <Link
      to={"/cart"}
      id="to-top-button"
      //onClick={scrollToTop}
      title="Go To Top"
      className="fixed z-50 bottom-40 right-10 p-2 border-0 rounded-full shadow-md bg-[#A5BB08] hover:bg-[#192A7A] text-white text-lg font-semibold transition-colors duration-300 animate-bounce "
    >
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={totalItemsInCart} color="primary">
          {" "}
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 902.86 902.86"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                />
                <path
                  d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                />
              </g>
            </g>
          </svg>
        </StyledBadge>
      </IconButton>
      <span className="sr-only">Go to top</span>
    </Link>
  );
};

export default CartButton;

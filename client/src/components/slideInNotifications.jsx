import React, { useEffect } from "react";

const SlideInNotifications = ({ nameProduct, productPosition }) => {
  useEffect(() => {
    const product = document.getElementById(`product-${nameProduct}`);
    if (product) {
      product.style.transition = "top 0.5s, left 0.5s";
      product.style.top = `${productPosition.top}px`;
      product.style.left = `${productPosition.left}px`;
    }
  }, [nameProduct, productPosition]);

  return (
    <div
      id={`product-${nameProduct}`}
      className="fixed z-50 bg-white p-2 rounded shadow"
    >
      {nameProduct}
    </div>
  );
};

export default SlideInNotifications;

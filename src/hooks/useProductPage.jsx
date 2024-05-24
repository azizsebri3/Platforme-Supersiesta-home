import { useEffect, useState } from "react";
import { useCart } from "../context/cartProvider";
import { useNavigate } from "react-router-dom";

const useProductPage = () => {
  const { addToCart, cartItems, setOpen } = useCart();
  const [productInfo, setProductInfo] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPop, setShowPop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProductInfo = localStorage.getItem("selectedProduct");
    if (storedProductInfo) {
      setProductInfo(JSON.parse(storedProductInfo));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (productInfo) {
      setIsInCart(cartItems.some((item) => item.id === productInfo.id));
      const price = productInfo.sizes.length > 0
        ? productInfo.sizes[0].price
        : productInfo.productPrice;
      setProductPrice(price);
      setImageGallery(productInfo.imageUrls);
    }
  }, [productInfo, cartItems]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const selectedSizeObject = productInfo.sizes.find(
      (sizeObj) => sizeObj.size === size
    );
    const price = selectedSizeObject
      ? selectedSizeObject.price
      : productInfo.productPrice;
    setProductPrice(price);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (productInfo.sizes.length > 0 && !selectedSize) {
      setShowPop(true);
      return;
    }

    const updatedProductInfo = {
      ...productInfo,
      price: Number(productPrice),
      selectedSize,
      quantity,
    };
    addToCart(updatedProductInfo);
    setOpen(true);
  };

  const selectImage = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
  };

  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    productInfo,
    isInCart,
    selectedSize,
    productPrice,
    quantity,
    showPop,
    isModalOpen,
    imageGallery,
    selectedImageIndex,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
    selectImage,
    openModal,
    closeModal
  };
};

export default useProductPage;

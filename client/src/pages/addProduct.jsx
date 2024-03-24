import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productOldPrice : 0 ,
    productPrice: 0,
    imageUrl: "",
    category: "", // Added category field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/addProduct", productData);
      // Clear form fields after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl font-semibold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block font-semibold">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="productDescription" className="block font-semibold">
              Product Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={productData.productDescription}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="productOldPrice" className="block font-semibold">
              Product Price
            </label>
            <input
              type="number"
              id="productOldPrice"
              name="productOldPrice"
              value={productData.productOldPrice}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block font-semibold">
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block font-semibold">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-semibold">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-[#A5BB08] text-white px-4 py-2 rounded hover:bg-[#818b2d]"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

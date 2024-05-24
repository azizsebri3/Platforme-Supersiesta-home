import React, { useState, useEffect } from "react";
import axios from "axios";
import SlideInNotifications from "../components/slideInNotifications";

const AddProduct = () => {
  const [success, setSuccess] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productOldPrice: null,
    productPrice: null,
    imageUrl: "",
    category: "",
    availability: "",
    sizes: [], // Array to store multiple sizes
    newSize: "", // New size input field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddSize = () => {
    setProductData({
      ...productData,
      sizes: [...productData.sizes, productData.newSize], // Add new size to the sizes array
      newSize: "", // Clear the new size input field
    });
  };
  const handleRemoveSize = (index) => {
    const newSizes = [...productData.sizes];
    newSizes.splice(index, 1);
    setProductData({
      ...productData,
      sizes: newSizes,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/addProduct",
        productData
      );
      if (res.status === 201) {
        console.log("Product added successfully");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again later.");
    }
  };

  return (
    <div className="flex items-center pt-30 justify-center h-screen">
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
              Product Old Price
            </label>
            <input
              type="number"
              id="productOldPrice"
              name="productOldPrice"
              value={productData.productOldPrice}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
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
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
            >
              <option value="Matelas a Ressort">Matelas a Ressort</option>
              <option value="Matelas en Latex">Matelas en Latex</option>
              <option value="Matelas orthopedique">Matelas orthopedique</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Availability</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="availability"
                  value="En stock"
                  checked={productData.availability === "En stock"}
                  onChange={handleChange}
                />
                En stock
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="availability"
                  value="Epuisé"
                  checked={productData.availability === "Epuisé"}
                  onChange={handleChange}
                />
                Epuisé
              </label>
              <label>
                <input
                  type="radio"
                  name="availability"
                  value="En arrivage"
                  checked={productData.availability === "En arrivage"}
                  onChange={handleChange}
                />
                En arrivage
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="sizes" className="block font-semibold">
              Sizes
            </label>
            <div className="flex flex-wrap space-x-2">
              {productData.sizes.map((sizeObject, index) => (
                <div
                  key={index}
                  className="flex items-center border border-gray-300 px-3 py-2"
                >
                  <div>{sizeObject.size}</div>
                  <div>{sizeObject.price}</div>{" "}
                  {/* Display corresponding price */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                id="newSize"
                name="newSize"
                value={productData.newSize}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 w-full"
              />
              <input
                type="text"
                id="newPrice"
                name="newPrice"
                value={productData.newPrice}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 w-full"
                placeholder="Price"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-[#A5BB08] text-white px-4 py-2 rounded hover:bg-[#818b2d]"
              >
                Add Size
              </button>
            </div>
          </div>
          <button
            className="bg-[#A5BB08] text-white px-4 py-2 rounded hover:bg-[#818b2d]"
            type="submit"
          >
            Ajouter
          </button>
        </form>
      </div>
      {success && <SlideInNotifications text={"Product added successfully!"} />}
    </div>
  );
};

export default AddProduct;

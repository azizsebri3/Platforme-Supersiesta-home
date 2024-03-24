const mongoose = require("mongoose");

// Define the schema for the product
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productOldPrice: {
    type: Number,
    required: false,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;

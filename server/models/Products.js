const mongoose = require("mongoose");

// Define the schema for the product
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: Array,
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
  availability: {
    type: String,
    required: false,
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create a model based on the schema
const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;

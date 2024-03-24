const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/Products");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/comforama", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Route to fetch all products
app.get("/products", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.json(products); // Send the fetched products as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to add a new product
app.post("/addProduct", async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productOldPrice,
      productPrice,
      imageUrl,
      category,
    } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      productName,
      productDescription,
      productOldPrice,
      productPrice,
      imageUrl,
      category,
    });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to add product. Please try again later." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

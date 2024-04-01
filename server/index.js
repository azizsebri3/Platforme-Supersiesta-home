const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/Product/Products");
const Client = require("./models/Client/Client");
const Order = require("./models/Order/order");

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

app.post("/addProduct", async (req, res) => {
  try {
    const ProductData = JSON.stringify(req.body);
    const NewProduct = new Product(JSON.parse(ProductData));
    await NewProduct.save();
    res.status(201).json({ message: "Added Succesfuly", NewProduct });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to place order. Please try again later." });
  }
});

app.post("/addOrder", async (req, res) => {
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  try {
    const { client: clientData, products, totalPrice, date } = req.body;

    // Check if clientData is provided and contains required fields
    if (
      !clientData ||
      !clientData.email ||
      !clientData.phone ||
      !clientData.address
    ) {
      return res.status(400).json({ message: "Client information incomplete" });
    }
    if (
      !clientData ||
      !clientData.email ||
      !isValidEmail(clientData.email) ||
      !clientData.phone ||
      !clientData.address
    ) {
      return res
        .status(400)
        .json({ field: "email", message: "Invalid email format" });
    }

    if (
      !clientData.phone ||
      clientData.phone.length !== 8 ||
      isNaN(clientData.phone)
    ) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products information missing" });
    }

    // Create a new client instance
    const newClient = new Client(clientData);
    const savedClient = await newClient.save();

    const newOrder = new Order({
      client: savedClient._id,
      products: products,
      totalPrice: totalPrice,
      orderDate: date,
    });
    const savedOrder = await newOrder.save();
    const productIds = products.map((product) => product._id);

    await Client.findByIdAndUpdate(savedClient._id, {
      $push: { orders: savedOrder._id },
      $addToSet: { commandedProducts: { $each: productIds } },
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to place order. Please try again later." });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

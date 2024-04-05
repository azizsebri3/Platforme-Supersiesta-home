const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/Products");
const Client = require("./models/Client");
const Order = require("./models/order");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const ObjectID = require("mongodb");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/comforama", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Generate and send OTP
// app.post("/generateOTP", (req, res) => {
//   const email = req.body.email;
//   console.log(email);
//   // Generate a 4-digit OTP
//   const otp = otpGenerator.generate(4, {
//     digits: true,
//     alphabets: false,
//     upperCase: false,
//     specialChars: false,
//   });
//   console.log(otp);
//   // Create a nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: "outlook",
//     port: 587,
//     auth: {
//       user: "sebriaziz2016@outlook.com", // Your Gmail email address
//       pass: "aziz93621982sebri", // Your Gmail password
//     },
//   });

// // Email options
// const mailOptions = {
//   from: "sebriaziz2016@outlook.com",
//   to: email,
//   subject: " Confirmation de commande Comforama ",
//   text: `Cher(e) client(e),

//   Nous vous remercions de votre récente commande sur Conforama.

//   Afin de garantir la sécurité de votre compte et de confirmer votre commande, nous avons mis en place un système de vérification par code OTP (One-Time Password).

//   Pour compléter votre commande, veuillez entrer le code OTP suivant dans la page de vérification :

//   ${otp}

//   Si vous n'avez pas effectué cette commande ou si vous avez des questions, veuillez nous contacter immédiatement.

//   Nous vous remercions pour votre confiance en Conforama.

//   Cordialement,
//   L'équipe Conforama`,
// };

// Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Failed to send OTP" });
//     } else {
//       console.log("Email sent:", info.response);

//       // Send OTP as response
//       res.status(200).json({ otp: otp });
//     }
//   });
// });

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
    const {
      client: clientData,
      products,
      totalPrice,
      date,
      invoiceHTML,
    } = req.body;
    console.log(products);
    console.log(invoiceHTML);
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

    console.log(newOrder);
    const savedOrder = await newOrder.save();
    const productIds = products.map((product) => product._id);

    await Client.findByIdAndUpdate(savedClient._id, {
      $push: { orders: savedOrder._id },
      $addToSet: { commandedProducts: { $each: productIds } },
    });

    // Send invoice to the client's email
    const transporter = nodemailer.createTransport({
      // Your email sending configuration
      service: "outlook",
      auth: {
        user: "sebriaziz2016@outlook.com", // your email
        pass: "aziz93621982sebri", // your password
      },
    });

    const mailOptions = {
      from: "sebriaziz2016@outlook.com",
      to: clientData.email,
      subject: "Facture d'achat Comforama",
      html: invoiceHTML, // Use the provided invoice HTML directly
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
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

// app.get("/clients/:email", async (req, res) => {
//   try {
//     const email = await Client.findOne({ email: req.params.email });
//     if (email) {
//       res.status(200).json({ message: "email is available" });
//     } else {
//       res.status(404).json({ message: "email not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "emanjmtch njib l email" });
//   }
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

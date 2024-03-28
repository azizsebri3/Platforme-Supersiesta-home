const mongoose = require("mongoose");

// Define the schema for the client
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prenom:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Assuming you have an Order schema defined
    },
  ],
});

// Create a model for the client schema
const Client = mongoose.model("Client", clientSchema, "clients");

module.exports = Client;

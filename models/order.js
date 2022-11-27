const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    total: { 
        type: Number,
        default: 0
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String, 
        description: String, 
        price: String, 
        image: String
      }
    ],
    address:{
        address1: String,
        city: String,
        email: String,
        firstName: String,
        lastName: String,
        zip: String
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
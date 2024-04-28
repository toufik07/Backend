const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userid: { type: String},
    name: { type: String},
    email: { type: String},
    mobileno: { type: String},
    address: { type: String},
    pincode: { type: String},
    total: { type: String},
    address: { type: String},
    city: { type: String},
    pincode: { type: String},
    status: { type: String, },
    products: [
      {
        productid: {
          type: String,
        },
        title: {
          type: String,
        },
        imgpath: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 1,
        },
        total: {
          type: Number,
          default: 1,
        },
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);

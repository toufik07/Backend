const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true, },
    imgpath: { type: String },    
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },    
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);

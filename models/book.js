const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: { type: String, require: true },
  name: { type: String, require: true },
  author: { type: Number, require: true },
  discount: { type: Number, require: true },
  mrp: { type: Number, require: true },
  edition: { type: String },
  image: { type: String },
  description: { type: String },
  category: { type: Number },
  qty: { type: Number, default: 1, require: true },
  type: { type: String, require: true },
  publication: { type: Number, require: true },
  genre: { type: Number, require: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String, default: "admin" },
});

module.exports = mongoose.model("book", BookSchema, "books");

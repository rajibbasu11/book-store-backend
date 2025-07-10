const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: { type: String, require: true },
  name: { type: String, require: true },
  author: { type: Number, require: true },
  publisher: { type: Number, require: true },
  discount: { type: Number, require: true },
  mrp: { type: Number, require: true },
  edition: { type: String },
  image: { type: String },
  description: { type: String },
  category: { type: Number },
  qty: { type: Number, default: 1, require: true },
});

module.exports = mongoose.model("book", BookSchema, "books");

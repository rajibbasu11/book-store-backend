const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discount: { type: Number, required: true },
  icon: { type: String},
  shortCode: { type: String, required: true }
});

module.exports = mongoose.model('Publication', publicationSchema, 'publications');

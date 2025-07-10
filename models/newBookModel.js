const mongoose = require('mongoose');

const newBookSchema = new mongoose.Schema({
    bookId: {type: String, require: true},
    bookName: {type: String, require: true},
    author: {type: String, require: true},
    pubisher: {type: String},
    discount: {type: Number, require: true},
    mrp: {type: Number, require: true},
    stock: {type: Number, default: 1, require: true}
})

module.exports = mongoose.model('newBook', newBookSchema, 'newBooks');
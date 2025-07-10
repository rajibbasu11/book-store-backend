const mongoose = require('mongoose');

const oldBookSchema = mongoose.Schema({
    bookId: {type: String, require},
    bookName: {type: String, require},
    author: {type: String, require},
    publisher: {type: String, require},
    isAvailable: {type: Boolean, default: true, require},
    mrp: {type: Number, require},
    mdm: {type: Number},
    language: {type: String, default: 'BN'},
})

module.exports = mongoose.model('oldBook', oldBookSchema);
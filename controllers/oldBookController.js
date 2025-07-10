const oldBookModel = require('../models/oldBookModel');

const getAllOldBooks = async (req, res) => {
    try {
        const allOldBooks = await oldBookModel.find();
        res.status(200).send({
            success: true,
            allOldBooks
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

const addOldBook = async (req, res) => {
    try {
        const {bookId, bookName, author, publisher, isAvailable, mrp, mdm, language} = req.body

        const newOldBook = new oldBookModel({
            bookId,
            bookName,
            author,
            publisher,
            isAvailable,
            mrp,
            mdm,
            language
        })

        await newOldBook.save();

        res.status(200).send({
            success: true,
            newOldBook
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    getAllOldBooks,
    addOldBook
}
const NewBookModel = require('../models/newBookModel');



const getAllNewBooks = async (req, res) => {
    try {
        const allNewBooks = await NewBookModel.find()
    
        res.status(200).send(
            allNewBooks)
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })        
    }
}

const addNewBook = async (req, res) => {
    try {
        const {bookId, bookName, author, publisher, discount, mrp, stock} = req.body
        console.log(bookId, bookName, author, publisher, discount, mrp, stock)
        const newBook = new NewBookModel({
            bookId,
            bookName,
            author,
            publisher,
            discount,
            mrp,
            stock
        })

        await newBook.save()
        res.status(200).send({
            success: true,
            newBook
        })
    } catch (error) {
        res.send({success: false, error: error.message})
    }
}

module.exports = {
    getAllNewBooks,
    addNewBook
}
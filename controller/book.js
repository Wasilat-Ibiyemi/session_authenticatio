const bookModel = require('../model/book')

function getAllBooks(req, res) {
    bookModel.find()
        .then(books => {
            res.render('books', { user: req.user, books })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

function getBookById(req, res) {
    const id = req.params.id
    bookModel.findById(id)
        .then(book => {
            res.status(200).send(book)
        })
        .catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

function addBook(req, res) {
    const book = req.body
    book.lastUpdateAt = new Date() //set the lastUpdateAt to the current date
    bookModel.create(book)
        .then(book => {
            res.status(201).send(book)
        })
        .catch(err => {
            console.log(err)
            res.status(500).status(err)
        })
}

function updateBookById(req, res) {
    const id = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date

    bookModel.findByIdAndUpdate(id, book, { new: true })
        .then(newbook => {
            res.status(201).send(newbook)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

function deleteById(req, res) {
    const id = req.params.id
    bookModel.findByIdAndRemove(id)
        .then(book => {
            res.status(200).send(book)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}


module.exports = {
    getAllBooks, getBookById, addBook, updateBookById, deleteById
}
const express = require('express')
const bookController = require('../controller/book')

const bookRoute = express.Router()

bookRoute.get('/', bookController.getAllBooks)
bookRoute.get('/:id', bookController.getBookById)
bookRoute.post('/', bookController.addBook)
bookRoute.put('/:id', bookController.updateBookById)
bookRoute.delete('/:id', bookController.deleteById)


module.exports = bookRoute
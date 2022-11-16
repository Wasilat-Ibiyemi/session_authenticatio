const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookModel = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        max: [2022, "year must be less than or equal current year"]
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "isbn must be unique"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('books', bookModel) //'books' is the collection name in db
// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    pdfLink: {
        type: String,
        required: true
    },
    comments: [],
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

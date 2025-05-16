const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// CREATE a new book
router.post('/books', async (req, res) => {
    try {
        const { name, author, image, pdfLink } = req.body;
        const newBook = new Book({ name, author, image, pdfLink });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ a single book by ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE a book by ID
router.put('/books/:id', async (req, res) => {
    try {
        const book = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            book
        );
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

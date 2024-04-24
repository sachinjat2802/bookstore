import express from 'express';
import Book from '../models/book.js';

const router = express.Router();

// Route to get all books
router.get('/', async (req, res) => {
    try {
        const { author, publicationYear } = req.query;
        let filter = {};
        
        // Apply filtering if author or publicationYear query parameters are provided
        if (author) {
            filter.author = author;
        }
        if (publicationYear) {
            filter.publicationYear = publicationYear;
        }

        const books = await Book.find(filter);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const newBook = new Book({ title, author, publicationYear });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a book by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, publicationYear },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;

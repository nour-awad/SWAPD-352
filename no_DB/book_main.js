const express = require('express');
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require('./book_utils');

const router = express.Router();

router.get('/', (req, res) => {
  const books = getAllBooks();
  res.json(books);
});

router.get('/:id', (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = addBook(title, author);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const { title, author } = req.body;
  const updatedBook = updateBook(parseInt(req.params.id), title, author);
  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

router.delete('/:id', (req, res) => {
  const isDeleted = deleteBook(parseInt(req.params.id));
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;
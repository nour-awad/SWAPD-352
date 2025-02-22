const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('./utils');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/books', (req, res) => {
  const books = getAllBooks();
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = addBook(title, author);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const { title, author } = req.body;
  const updatedBook = updateBook(parseInt(req.params.id), title, author);
  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const isDeleted = deleteBook(parseInt(req.params.id));
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
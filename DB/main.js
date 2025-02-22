const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('./books');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/books', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = await addBook(title, author);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { title, author } = req.body;
    const updatedBook = await updateBook(req.params.id, title, author);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const isDeleted = await deleteBook(req.params.id);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
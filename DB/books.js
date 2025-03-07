const { Client } = require('pg');

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5433,
});


const bookSchema = new client.Schema({
  title: String,
  author: String,
});

const Book = client.model('Book', bookSchema);

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const addBook = async (title, author) => {
  const newBook = new Book({ title, author });
  await newBook.save();
  return newBook;
};

const updateBook = async (id, title, author) => {
  return await Book.findByIdAndUpdate(id, { title, author }, { new: true });
};

const deleteBook = async (id) => {
  await Book.findByIdAndDelete(id);
  return true;
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
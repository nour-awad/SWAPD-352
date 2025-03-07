const books = require('./book');

const getAllBooks = () => books;
const getBookById = (id) => books.find((book) => book.id === id);
const addBook = (title, author) => {
  const newBook = { id: books.length + 1, title, author, Borrowed: false };
  books.push(newBook);
  return newBook;
};
const updateBook = (id, title, author) => {
  const book = books.find((book) => book.id === id);
  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    return book;
  }
  return null;
};
const IsBorrowed = (id) => {
  const book = getBookById(id);
  if (book && !book.Borrowed) {
    book.Borrowed = true;
    return book;
  }
  return null;
};
const returnBook = (id) => {
  const book = getBookById(id);
  if (book && book.Borrowed) {
    book.Borrowed = false;
    return book;
  }
  return null;
};
const deleteBook = (id) => {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllBooks, getBookById, addBook, updateBook,
  deleteBook, IsBorrowed, returnBook,
};
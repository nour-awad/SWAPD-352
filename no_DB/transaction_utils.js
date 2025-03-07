const transactions = require('./transaction');
const { getBookById, IsBorrowed, returnBook: markBookAvailable } = require('./book_utils');
const { getUserById } = require('./user_utils');

const getAllTransactions = () => transactions;
const getTransactionById = (id) => transactions.find((transaction) => transaction.id === id);

const borrowBook = (userId, bookId) => {
  const book = getBookById(bookId);
  const user = getUserById(userId);
  if (!book || !user) {
    return null;
  }

  if (book.Borrowed) {
    return { message: 'Book is already borrowed' };
  }

  const borrowedBook = IsBorrowed(bookId);
  if (!borrowedBook) {
    return { message: 'Failed to borrow the book' };
  }

  const newTransaction = {
    id: transactions.length + 1,
    userId,
    bookId,
    dateBorrowed: new Date().toISOString().split('T')[0],
    dateReturned: null,
  };
  transactions.push(newTransaction);
  return newTransaction;
};

const returnBook = (transactionId) => {
  const transaction = getTransactionById(transactionId);
  if (!transaction) {
    return { message: 'Transaction not found' };
  }

  const returnedBook = markBookAvailable(transaction.bookId);
  if (!returnedBook) {
    return { message: 'Failed to return the book' };
  }

  transaction.dateReturned = new Date().toISOString().split('T')[0];
  return transaction;
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  borrowBook,
  returnBook,
};
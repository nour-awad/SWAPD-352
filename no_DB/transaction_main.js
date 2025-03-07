const express = require('express');
const {
  getAllTransactions,
  getTransactionById,
  borrowBook,
  returnBook,
} = require('./transaction_utils');

const router = express.Router();

router.get('/', (req, res) => {
  const transactions = getAllTransactions();
  res.json(transactions);
});

router.get('/:id', (req, res) => {
  const transaction = getTransactionById(parseInt(req.params.id));
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

router.post('/borrow', (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) {
    return res.status(400).json({ message: 'User ID and Book ID are required' });
  }
  const transaction = borrowBook(userId, bookId);
  if (transaction) {
    res.status(201).json(transaction);
  } else {
    res.status(404).json({ message: 'User or Book not found' });
  }
});

router.put('/return/:id', (req, res) => {
  const transactionId = parseInt(req.params.id);
  const transaction = returnBook(transactionId);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

module.exports = router;
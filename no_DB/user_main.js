const express = require('express');
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('./user_utils');

const router = express.Router();

router.get('/', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = addUser(name, email);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const updatedUser = updateUser(parseInt(req.params.id), name, email);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/:id', (req, res) => {
  const isDeleted = deleteUser(parseInt(req.params.id));
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
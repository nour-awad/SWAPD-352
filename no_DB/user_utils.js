const users = require('./user');

const getAllUsers = () => users;
const getUserById = (id) => users.find((user) => user.id === id);
const addUser = (name, email) => {
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  return newUser;
};
const updateUser = (id, name, email) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    return user;
  }
  return null;
};
const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
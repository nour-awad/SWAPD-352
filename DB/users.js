const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

client.connect();

const getAllUsers = async () => {
  const res = await client.query('SELECT * FROM users');
  return res.rows;
};

const getUserById = async (id) => {
  const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
};

const addUser = async (name, email) => {
  const res = await client.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return res.rows[0];
};

const updateUser = async (id, name, email) => {
  const res = await client.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return res.rows[0];
};

const deleteUser = async (id) => {
  const res = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};

module.exports = {
  getAllUsers, getUserById, addUser,
  updateUser, deleteUser,
};
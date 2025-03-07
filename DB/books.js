const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

client.connect();

const getAllBooks = async () => {
  try {
    const res = await client.query('SELECT * FROM books');
    return res.rows;
  } catch (err) {
    console.error('Error fetching books:', err);
    throw err;
  }
};

const getBookById = async (id) => {
  const res = await client.query('SELECT * FROM books WHERE id = $1', [id]);
  return res.rows[0];
};

const addBook = async (title, author) => {
  const res = await client.query(
    'INSERT INTO books (title, author, borrowed) VALUES ($1, $2, $3) RETURNING *',
    [title, author, false]
  );
  return res.rows[0];
};

const updateBook = async (id, title, author) => {
  const res = await client.query(
    'UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *',
    [title, author, id]
  );
  return res.rows[0];
};

const IsBorrowed = async (id) => {
  const res = await client.query(
    'UPDATE books SET borrowed = true WHERE id = $1 RETURNING *',
    [id]
  );
  return res.rows[0];
};

const returnBook = async (id) => {
  const res = await client.query(
    'UPDATE books SET borrowed = false WHERE id = $1 RETURNING *',
    [id]
  );
  return res.rows[0];
};

const deleteBook = async (id) => {
  const res = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};

module.exports = {
  getAllBooks, getBookById, addBook, updateBook,
  deleteBook, IsBorrowed, returnBook,
};
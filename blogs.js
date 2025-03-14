const express = require('express');
const { MongoClient } = require('mongodb');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());

const mongoUri = 'mongodb://127.0.0.1:27017';
const mongoClient = new MongoClient(mongoUri);
let postCollection;

const pgClient = new Client({
  user: 'postgres', 
  host: 'localhost',
  database: 'postgres',
  password: '1234', 
  port: 5432,
});

async function connectDatabases() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    const database = mongoClient.db('blog_system');
    postCollection = database.collection('posts');

    await pgClient.connect();
    console.log('Connected to PostgreSQL');

    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
      );
    `);
  } catch (err) {
    console.error('Error connecting to databases:', err);
    process.exit(1);
  }
}

connectDatabases().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

app.get('/authors', async (req, res) => {
  const result = await pgClient.query('SELECT * FROM authors');
  res.json(result.rows);
});

app.post('/authors', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
  const result = await pgClient.query(
    'INSERT INTO authors (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  res.status(201).json(result.rows[0]);
});

app.get('/posts', async (req, res) => {
  const posts = await postCollection.find().toArray();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  if (!title || !content || !authorId) {
    return res.status(400).json({ message: 'Title, content, and authorId are required' });
  }
  const newPost = { title, content, authorId: parseInt(authorId), createdAt: new Date() };
  const result = await postCollection.insertOne(newPost);
  res.status(201).json({ _id: result.insertedId, ...newPost });
});

app.put('/posts/:id', async (req, res) => {
  const { title, content, authorId } = req.body;
  const updatedPost = { title, content, authorId: parseInt(authorId), updatedAt: new Date() };
  const result = await postCollection.updateOne(
    { _id: new require('mongodb').ObjectId(req.params.id) },
    { $set: updatedPost }
  );
  if (result.matchedCount > 0) {
    res.json({ _id: req.params.id, ...updatedPost });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const result = await postCollection.deleteOne({ _id: new require('mongodb').ObjectId(req.params.id) });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});
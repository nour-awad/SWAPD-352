const express = require('express');
const { initializeDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

initializeDB();

app.use(express.json());
//routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
const express = require('express');
const bookRoutes = require('./book_main');
const userRoutes = require('./user_main');
const transactionRoutes = require('./transaction_main');

const app = express();
const port = 3000;

app.use(express.json());

const authorizer = (req, res, next)=>{
  const authorize = req.headers.authorization;
  if (authorize != "Bearer Zewail"){
    return res.status(401).send("Unauthorized ya 3azizi");
  }
  next();
}
app.use(authorizer);
app.use('/book', bookRoutes);
app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
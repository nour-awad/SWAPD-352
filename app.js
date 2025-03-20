const express = require('express');
const { Sequelize } = require('sequelize');
const { router: taskRoutes } = require('./task'); 

const sequelize = new Sequelize('taskManager', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}); 
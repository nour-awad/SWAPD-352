const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

class Task extends Model {}
Task.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  userId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Task',
});

class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: 'user' });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: 'user' });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update({ title, description, userId });
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = { Task, router }; 
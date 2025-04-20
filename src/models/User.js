const { db } = require('../config/db');

class User {
  static async findByUsername(username) {
    await db.read();
    return db.data.users.find(u => u.username === username);
  }

  static async findByEmail(email) {
    await db.read();
    return db.data.users.find(u => u.email === email);
  }

  static async create(userData) {
    await db.read();
    db.data.users.push(userData);
    await db.write();
    return userData;
  }

  static async update(username, updateData) {
    await db.read();
    const user = db.data.users.find(u => u.username === username);
    if (!user) return null;
    
    Object.assign(user, updateData);
    await db.write();
    return user;
  }
}

module.exports = User;
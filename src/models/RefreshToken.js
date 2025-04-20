const { db } = require('../config/db');

class RefreshToken {
  static async create(tokenData) {
    await db.read();
    db.data.refreshTokens.push(tokenData);
    await db.write();
    return tokenData;
  }

  static async findByToken(token) {
    await db.read();
    return db.data.refreshTokens.find(t => t.token === token);
  }

  static async delete(token) {
    await db.read();
    db.data.refreshTokens = db.data.refreshTokens.filter(t => t.token !== token);
    await db.write();
  }
}

module.exports = RefreshToken;
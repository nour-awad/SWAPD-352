const { db } = require('../config/db');

class PasswordResetToken {
  static async create(tokenData) {
    await db.read();
    db.data.passwordResetTokens.push(tokenData);
    await db.write();
    return tokenData;
  }

  static async findValidToken(token) {
    await db.read();
    return db.data.passwordResetTokens.find(t => 
      t.token === token && 
      new Date(t.expiresAt) > new Date() && 
      !t.used
    );
  }

  static async markAsUsed(token) {
    await db.read();
    const resetToken = db.data.passwordResetTokens.find(t => t.token === token);
    if (resetToken) {
      resetToken.used = true;
      await db.write();
    }
  }
}

module.exports = PasswordResetToken;
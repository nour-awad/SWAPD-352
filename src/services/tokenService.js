const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { 
  JWT_SECRET, 
  REFRESH_SECRET, 
  ACCESS_TOKEN_EXPIRY, 
  REFRESH_TOKEN_EXPIRY 
} = require('../config/auth');

function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken
};
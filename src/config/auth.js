require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'my_secret',
  REFRESH_SECRET: process.env.REFRESH_SECRET || 'my_refresh_secret',
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  PASSWORD_RESET_EXPIRY: 3600000 //60 mins
};
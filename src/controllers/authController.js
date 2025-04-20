const bcrypt = require('bcryptjs');
const { 
  generateAccessToken, 
  generateRefreshToken,
  generateResetToken
} = require('../services/tokenService');
const { sendPasswordResetEmail } = require('../services/emailService');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const PasswordResetToken = require('../models/PasswordResetToken');
const { validateEmail, validatePassword } = require('../utils/validators');
const { 
  ACCESS_TOKEN_EXPIRY,
  PASSWORD_RESET_EXPIRY
} = require('../config/auth');

class AuthController {
  static async register(req, res) {
    const { username, email, password, role = 'user' } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters with 1 number and 1 special character'
      });
    }

    try {
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword, role });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

      const accessToken = generateAccessToken({
        username: user.username,
        role: user.role,
        email: user.email
      });

      const refreshToken = generateRefreshToken({ username: user.username });

      await RefreshToken.create({ 
        token: refreshToken, 
        username: user.username,
        createdAt: new Date().toISOString() 
      });

      res.json({ accessToken, refreshToken });
    } catch (err) {
      res.status(500).json({ message: 'Error during login' });
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    try {
      const storedToken = await RefreshToken.findByToken(refreshToken);
      if (!storedToken) return res.sendStatus(403);

      const user = await User.findByUsername(storedToken.username);
      if (!user) return res.sendStatus(403);

      const accessToken = generateAccessToken({
        username: user.username,
        role: user.role,
        email: user.email
      });

      res.json({ accessToken });
    } catch (err) {
      res.sendStatus(403);
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(400);

    try {
      await RefreshToken.delete(refreshToken);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: 'Error during logout' });
    }
  }

  static async requestPasswordReset(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
      }

      const resetToken = generateResetToken();
      const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY);

      await PasswordResetToken.create({
        token: resetToken,
        email,
        expiresAt,
        used: false
      });

      const resetLink = `http://localhost:${process.env.PORT || 3000}/api/password-reset/confirm?token=${resetToken}`;
      const emailSent = await sendPasswordResetEmail(email, resetLink);

      if (emailSent) {
        res.json({ message: 'If the email exists, a reset link has been sent' });
      } else {
        res.status(500).json({ message: 'Error sending reset email' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error processing reset request' });
    }
  }

  static async confirmPasswordReset(req, res) {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters with 1 number and 1 special character'
      });
    }

    try {
      const resetToken = await PasswordResetToken.findValidToken(token);
      if (!resetToken) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const user = await User.findByEmail(resetToken.email);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(user.username, { password: hashedPassword });
      await PasswordResetToken.markAsUsed(token);

      res.json({ message: 'Password reset successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error resetting password' });
    }
  }
}

module.exports = AuthController;
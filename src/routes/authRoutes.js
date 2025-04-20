const express = require('express');
const { authLimiter } = require('../middlewares/rateLimit');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authLimiter, AuthController.register);
router.post('/login', authLimiter, AuthController.login);
router.post('/token', AuthController.refreshToken);
router.delete('/logout', AuthController.logout);
router.post('/password-reset/request', authLimiter, AuthController.requestPasswordReset);
router.post('/password-reset/confirm', authLimiter, AuthController.confirmPasswordReset);

module.exports = router;
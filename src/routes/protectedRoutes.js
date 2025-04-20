const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const ProtectedController = require('../controllers/protectedController');

const router = express.Router();

router.get('/public', ProtectedController.public);
router.get('/protected', authenticateToken, ProtectedController.protected);
router.get('/moderator', authenticateToken, authorizeRoles(['moderator', 'admin']), ProtectedController.moderator);
router.get('/admin', authenticateToken, authorizeRoles(['admin']), ProtectedController.admin);

module.exports = router;
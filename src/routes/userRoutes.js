const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/profile', authenticateToken, UserController.updateProfile);
router.put('/:username/role', authenticateToken, authorizeRoles(['admin']), UserController.updateUserRole);

module.exports = router;
const User = require('../models/User');
const { validateEmail, validatePassword } = require('../utils/validators');

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await User.findByUsername(req.user.username);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      const { password, ...userData } = user;
      res.json(userData);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching profile' });
    }
  }

  static async updateProfile(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await User.findByUsername(req.user.username);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const updates = {};
      
      if (email) {
        if (!validateEmail(email)) {
          return res.status(400).json({ message: 'Invalid email format' });
        }
        const emailExists = await User.findByEmail(email);
        if (emailExists && emailExists.username !== req.user.username) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        updates.email = email;
      }

      if (password) {
        if (!validatePassword(password)) {
          return res.status(400).json({ 
            message: 'Password must be at least 8 characters with 1 number and 1 special character'
          });
        }
        updates.password = await bcrypt.hash(password, 10);
      }

      await User.update(req.user.username, updates);
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating profile' });
    }
  }

  static async updateUserRole(req, res) {
    const { username } = req.params;
    const { role } = req.body;

    if (!['user', 'moderator', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await User.update(username, { role });
      res.json({ message: 'User role updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating role' });
    }
  }
}

module.exports = UserController;
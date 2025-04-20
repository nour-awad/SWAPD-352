class ProtectedController {
  static public(req, res) {
    res.json({ message: 'This is a public endpoint' });
  }

  static protected(req, res) {
    res.json({ message: `Hello ${req.user.username}, this is a protected endpoint` });
  }

  static moderator(req, res) {
    res.json({ message: `Hello ${req.user.username}, this is the moderator endpoint` });
  }

  static admin(req, res) {
    res.json({ message: `Hello ${req.user.username}, this is the admin endpoint` });
  }
}

module.exports = ProtectedController;
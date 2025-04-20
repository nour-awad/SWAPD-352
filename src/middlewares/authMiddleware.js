const { verifyAccessToken } = require('../services/tokenService');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
  const tokenString = req.headers.authorization || '';
  const token = tokenString.startsWith('Bearer ') ? tokenString.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gs-events-dev-secret');
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authRequired };

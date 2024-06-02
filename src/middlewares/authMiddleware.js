const User = require('../models/user');

const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (!apiKey) {
    return res.status(401).json({ message: 'API key is missing.' });
  }

  const user = await User.findOne({ apiKey });
  if (!user) {
    return res.status(403).json({ message: 'Invalid API key.' });
  }

  req.user = user;
  next();
};

module.exports = {
  authenticateApiKey
};

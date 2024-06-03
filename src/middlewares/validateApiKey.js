const userModel = require('../models/user');

module.exports = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ message: 'API key missing' });
    }

    try {
        const user_key = await userModel.findOne({ apiKey: apiKey });
        if (!user_key) {
            return res.status(401).json({ message: 'Invalid API key' });
        }
        req.kryptonianId = user_key._id;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
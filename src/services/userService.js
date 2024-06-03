const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserByApiKey = async (apiKey) => {
    return await User.findOne({ apiKey });
};

module.exports = {
    findUserByEmail,
    findUserByApiKey
};
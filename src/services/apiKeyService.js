const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user');

const generateApiKey = async() => {
    const apiKey = uuidv4();
    let user = await userModel.findOne(email);
    user.apiKey = apiKey
    return apiKey;
};

const invalidateApiKey = (apiKey) => {
    const user = userModel.findUserByApiKey(apiKey);
    if (user) {
        user.apiKey = null;
    }
};

module.exports = { generateApiKey, invalidateApiKey };
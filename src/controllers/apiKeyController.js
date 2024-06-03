const apiKeyService = require('../services/apiKeyService');

exports.invalidateApiKey = (req, res) => {
    const { apiKey } = req.body;
    apiKeyService.invalidateApiKey(apiKey);
    res.status(200).send('API key invalidated');
};
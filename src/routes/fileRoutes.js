const express = require('express');
const fileController = require('../controllers/fileController');
const validateImage = require('../middlewares/validateImage');
const apiKeyAuth = require('../middlewares/validateApiKey');

const router = express.Router();

router.post('/upload', apiKeyAuth, validateImage, fileController.uploadFile);
// Route to get all images
router.get('/images', fileController.getAllImages);

// Route to get a single image by ID
router.get('/images/:id', fileController.getImageById);

module.exports = router;
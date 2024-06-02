const express = require('express');
const { uploadImage, getImage, getAllImages } = require('../controllers/fileController');
const { authenticateApiKey } = require('../middlewares/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticateApiKey, upload.single('image'), uploadImage);
router.get('/:id', getImage);
router.get('/', getAllImages);

module.exports = router;

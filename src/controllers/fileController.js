const User = require('../models/user');
const Image = require('../models/image');
const base64Img = require('base64-img');

const uploadImage = async (req, res) => {
  const apiKey = req.headers['api-key'];
  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(403).json({ message: 'Invalid API key.' });
    }

    const { path } = req.file;
    const base64String = base64Img.base64Sync(path);

    const image = new Image({ owner: user._id, data: base64String });
    await image.save();

    base64Img.rm(path);

    res.status(201).json({ message: 'Image uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }
    res.status(200).json({ data: image.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json({ data: images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadImage,
  getImage,
  getAllImages
};

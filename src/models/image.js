const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: String, required: true }
});

module.exports = mongoose.model('Image', ImageSchema);

const Image = require('../models/image');
const base64Img = require('base64-img');
const userModel = require("../models/user")
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const base64Image = base64Img.base64Sync(req.file.path);
        const image = new Image({
            userid: req.kryptonianId,
            data: base64Image,
            mimetype: req.file.mimetype
        });

        await image.save();

        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all images
exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single image by ID
exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
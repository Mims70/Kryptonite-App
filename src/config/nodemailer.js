const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'ElasticEmail',
  auth: {
    user: process.env.ELASTIC_EMAIL_USER,
    pass: process.env.ELASTIC_EMAIL_API_KEY
  }
});

module.exports = transporter;

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendPasswordResetEmail(email, resetLink) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `To reset your password, click on this link: ${resetLink}\n\nThis link will expire in 1 hour.`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Error sending email:', err);
    return false;
  }
}

module.exports = { sendPasswordResetEmail };
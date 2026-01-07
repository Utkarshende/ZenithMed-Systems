const nodemailer = require('nodemailer');

const sendInquiry = async (req, res) => {
  const { name, email, phone, product, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // The client receives this
    subject: `New Inquiry for ${product}`,
    html: `
      <h3>Inquiry Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Inquiry sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Email failed to send.' });
  }
};

module.exports = { sendInquiry };
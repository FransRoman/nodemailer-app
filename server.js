const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // This serves your HTML file automatically

// Email Route
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Create Transporter (Authentication)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your provider (Outlook, Yahoo, etc.)
        auth: {
            user: process.env.EMAIL_USER, // We will set these in Render later
            pass: process.env.EMAIL_PASS
        }
    });

    // 2. Configure Email
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Sending to yourself
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // 3. Send
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success', message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to send email.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
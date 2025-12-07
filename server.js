const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Email Route
app.post('/send-email', async (req, res) => {
    const { targetEmail } = req.body; // We only need the target email now

    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Explicitly set the host
    port: 587,               // Use port 587 (Standard for TLS)
    secure: false,           // false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Helps avoid some certificate errors on cloud servers
    }
});

    const mailOptions = {
        from: process.env.EMAIL_USER,     // Sent FROM your app
        to: targetEmail,                  // Sent TO the person typed in the box
        subject: 'It Worked!',
        text: 'Hey it worked hahaahaha bold ni wally and bold ni wally' // Your hardcoded message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ status: 'success', message: 'Message sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
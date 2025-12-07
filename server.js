require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve the HTML file

// THE CRITICAL EMAIL CONFIGURATION
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,              // Use this port for better reliability on cloud servers
    secure: false,          // "false" waits for STARTTLS (standard for port 587)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Helps avoid some strict SSL errors during development
    },
    family: 4 // Force IPv4 (Crucial for fixing timeout errors on some networks)
});

// The Route
app.post('/send-email', async (req, res) => {
    const { recipientEmail } = req.body;
    console.log(`Attempting to send to: ${recipientEmail}`);

    const mailOptions = {
        from: `"Node App" <${process.env.EMAIL_USER}>`, // Shows as "Node App" in inbox
        to: recipientEmail,
        subject: "It Works! 🚀",
        text: "Congratulations! If you are reading this, your Node.js app is successfully sending emails from the cloud."
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed', error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
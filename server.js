require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public'));

// The Email Sending Logic
app.post('/send-email', async (req, res) => {
    const { recipientEmail } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Explicitly tell it to use Gmail
        port: 465,              // Explicitly use the Secure SSL port
        secure: true,           // This forces SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: "Hello from my Full Stack App typeshii",
        text: "This is a pre-written message sent from a Node.js server!"
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", recipientEmail);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
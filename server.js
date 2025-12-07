const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

app.post('/send-email', async (req, res) => {
    const { targetEmail } = req.body; 

    // --- DEBUGGING LOGS (Check your Render Logs for this!) ---
    console.log("Attempting to send email...");
    console.log("User:", process.env.EMAIL_USER);
    console.log("Pass length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "MISSING");
    // ---------------------------------------------------------

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: targetEmail,
            subject: 'It Worked!',
            text: 'Hey it worked hahaahaha bold ni wally and bold ni wally'
        });
        console.log("SUCCESS: Email sent.");
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("FAILURE ERROR:", error);
        res.status(500).json({ message: 'Failed: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
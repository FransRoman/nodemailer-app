// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// app.post('/send-email', async (req, res) => {
//     const { targetEmail } = req.body;

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',  // Shortcut that handles host/port automatically
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         },
//         // --- THE MAGIC FIX ---
//         // Force IPv4 to prevent "ETIMEDOUT" on Render
//         family: 4, 
//         // ---------------------
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: targetEmail, 
//         subject: 'It Worked!',
//         text: 'Hey it worked hahaahaha bold ni wally and bold ni wally'
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully");
//         res.status(200).json({ status: 'success', message: 'Email sent!' });
//     } catch (error) {
//         console.error("Error sending email:", error);
//         res.status(500).json({ status: 'error', message: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// app.post('/send-email', async (req, res) => {
//     const { targetEmail } = req.body;

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         },
//         family: 4, 
//     });

//     // --- UPDATED SECTION ---
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: targetEmail, 
//         subject: 'Request to change password', // Changed Subject
//         // We use 'html' instead of 'text' to create the button
//         html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                 <h2>Request to change password</h2>
//                 <p>We received a request to reset your password. Click the button below to proceed:</p>
                
//                 <div style="margin: 20px 0;">
//                     <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
//                        style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
//                        Change password
//                     </a>
//                 </div>

//                 <p style="color: #666; font-size: 14px;">If you didn't ask to change your password, you can ignore this email.</p>
//             </div>
//         `
//     };
//     // -----------------------

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully");
//         res.status(200).json({ status: 'success', message: 'Email sent!' });
//     } catch (error) {
//         console.error("Error sending email:", error);
//         res.status(500).json({ status: 'error', message: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Render automatically assigns a port to process.env.PORT
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Ensure your index.html is inside a folder named 'public'
app.use(express.static('public'));

app.post('/send-email', async (req, res) => {
    const { targetEmail } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // These variables will be set in the Render Dashboard, not .env file
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // Force IPv4 to prevent Render timeout errors
        family: 4, 
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: targetEmail, 
        subject: 'Request to change password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #333;">Request to change password</h2>
                <p>We received a request to reset your password. Click the button below to proceed:</p>
                
                <div style="margin: 30px 0;">
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                       style="background-color: #d93025; color: white; padding: 14px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                       Change password
                    </a>
                </div>

                <p style="color: #666; font-size: 14px;">If you didn't ask to change your password, you can ignore this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", targetEmail);
        res.status(200).json({ status: 'success', message: 'Email sent!' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
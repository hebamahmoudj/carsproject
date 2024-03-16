document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    const formData = new FormData(this);
    const mail=document.getElementById('email').value
        // Define email options
        const mailOptions = {
            from:mail,
            to: 'mahmoudheba965@gmail.com',
            subject: 'New Message from Contact Form',
            text: `Email: ${email}\nMessage: ${message}`
        };
    

    // Send the form data to your server-side endpoint
    fetch('/send-email', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            console.log(mailOptions.from)

            throw new Error('Failed to send email');
            
        }
        return response.json();
    })
    .then(data => {
        alert('Message sent successfully');
        // Optionally, clear the form fields after successful submission
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again later.');
    });
});

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 'https://hebamahmoudj.github.io/carsproject/';

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle sending emails
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mahmoudheba965@gmail.com',
            pass: 'hebamahmoud@123'
        }
    });



    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(mailOptions.from.value)
            console.error('Error occurred:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hejkatuhejka3@gmail.com', // Twój adres Gmail
    pass: 'uxdm oera klvs zhbs', // Hasło aplikacji
  },
});

app.post('/send', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  const mailOptions = {
    from: 'hejkatuhejka3@gmail.com',
    to: 'hejkatuhejka3@gmail.com',
    subject: subject || 'Nowa wiadomość z portfolio',
    text: `Imię: ${firstName}\nNazwisko: ${lastName}\nEmail: ${email}\nWiadomość: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer backend działa na porcie ${PORT}`);
});

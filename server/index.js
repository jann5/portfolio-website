const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const { MAIL_USER, MAIL_APP_PASSWORD, MAIL_TO = MAIL_USER } = process.env;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:8080").split(",");

if (!MAIL_USER || !MAIL_APP_PASSWORD || !MAIL_TO) {
  throw new Error("Brakuje konfiguracji poczty. Uzupełnij plik server/.env.");
}

app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_APP_PASSWORD,
  },
});

app.post('/send', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  const mailOptions = {
    from: MAIL_USER,
    to: MAIL_TO,
    subject: subject || 'Nowa wiadomość z portfolio',
    text: `Imię: ${firstName}\nNazwisko: ${lastName}\nEmail: ${email}\nWiadomość: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Nie udało się wysłać formularza:", error.message);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer backend działa na porcie ${PORT}`);
});

import nodemailer from "nodemailer";

const required = ["MAIL_USER", "MAIL_APP_PASSWORD", "MAIL_TO"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false });
  }

  if (required.some((name) => !process.env[name])) {
    console.error("Brakuje zmiennych środowiskowych formularza kontaktowego.");
    return res.status(500).json({ success: false });
  }

  const { firstName, lastName, email, subject, message } = req.body || {};
  if (![firstName, lastName, email, message].every((value) => typeof value === "string" && value.trim())) {
    return res.status(400).json({ success: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      replyTo: email.trim(),
      to: process.env.MAIL_TO,
      subject: subject?.trim() || "Nowa wiadomość z portfolio",
      text: `Imię: ${firstName}\nNazwisko: ${lastName}\nEmail: ${email}\n\nWiadomość:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Nie udało się wysłać formularza:", error.message);
    return res.status(500).json({ success: false });
  }
}

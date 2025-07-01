import Message from "../models/messageModel.js";
import nodemailer from "nodemailer";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Mesajları almaqda xəta baş verdi." });
  }
};

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMsg = new Message({ name, email, message });
    await newMsg.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.USER_EMAIL,
      subject: "Yeni Əlaqə Mesajı (NeoTravel)",
      html: `
        <h2>Yeni mesaj alındı</h2>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Əlaqə mesajı göndərilərkən xəta:", error);
    res.status(500).json({ error: "Mesaj göndərilə bilmədi." });
  }
};

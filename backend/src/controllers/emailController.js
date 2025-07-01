import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.USER_EMAIL, // Admin emailinə gələcək
      subject: "Yeni Əlaqə Mesajı (NeoTravel)",
      html: `
        <h2>Yeni Əlaqə Mesajı</h2>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br>${message}</p>
        <p style="margin-top: 10px; color:gray;">NeoTravel platformasından göndərilib</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email göndərilərkən xəta:", error);
    res.status(500).json({ error: "Email göndərilə bilmədi." });
  }
};

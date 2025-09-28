import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export const recieveMail = async (user, link) => {
  const { email, username } = user;
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Verification Email",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Salam ${username},</h2>
      <p style="font-size: 16px; color: #555;">
        Hesabınızı aktivləşdirmək üçün aşağıdakı düyməyə klikləyin:
      </p>
      <a href="${link}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Hesabı Təsdiqlə
      </a>
      <p style="margin-top: 30px; font-size: 14px; color: #888;">
        Əgər siz bu sorğunu etməmisinizsə, bu emaili nəzərə almayın.
      </p>
    </div>
  </div>
`,
  });
};

export default transporter;

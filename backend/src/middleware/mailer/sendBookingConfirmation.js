import transporter from "./mailer.js";

export const sendBookingConfirmation = async (booking, user, tour) => {
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px;">
      <h2 style="color: #4CAF50;">✅ Rezervasiyanız Təsdiqləndi!</h2>
      <p><strong>Tur:</strong> ${tour.name}</p>
      <p><strong>Tarix:</strong> ${new Date(booking.date).toLocaleDateString(
        "az-AZ"
      )}</p>
      <p><strong>Vaxt:</strong> ${booking.time}</p>
      <p><strong>Qonaq sayı:</strong> ${booking.guestCount}</p>
      <p><strong>Ümumi məbləğ:</strong> ${
        tour.price * booking.guestCount
      } AZN</p>
      <hr style="margin: 20px 0;" />
      <p style="color: #333;">Rezervasiyanız uğurla qeydə alındı. Əlavə sualınız olarsa, <a href="mailto:support@example.com" style="color: #4CAF50;">bizimlə əlaqə saxlayın</a>.</p>
    </div>
  </div>
`;

  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Rezervasiya Təsdiqi",
    html: emailHtml,
  });
};

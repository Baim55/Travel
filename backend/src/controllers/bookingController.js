import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import user from "../models/userModel.js";
import { sendBookingConfirmation } from "../middleware/mailer/sendBookingConfirmation.js";
import transporter from "../middleware/mailer/mailer.js";
import { generateBookingPdf } from "../utils/generateBookingPdf.js";

export const createBooking = async (req, res) => {
  const { tourId, date, time, guestCount, userId } = req.body;

  try {
    // 1) Tour yoxla
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // 2) Eyni gün və saat üçün mövcud rezervasiyaları topla
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59);

    const agg = await Booking.aggregate([
      {
        $match: {
          tour: tour._id,
          date: { $gte: dayStart, $lte: dayEnd },
          time,
        },
      },
      { $group: { _id: null, totalGuests: { $sum: "$guestCount" } } },
    ]);
    const used = agg[0]?.totalGuests || 0;

    // 3) Slot capacity yoxla
    const slot = tour.timeSlots.find((s) => s.time === time);
    if (!slot) return res.status(400).json({ message: "Invalid time slot" });

    if (used + guestCount > slot.capacity) {
      return res
        .status(400)
        .json({ message: "Bu saat üçün yer doludur. Başqa saat seçin." });
    }

    // 4) Booking yarat
    const booking = await Booking.create({
      tour: tour._id,
      date,
      time,
      guestCount,
      user: userId,
    });

    // 5) İstifadəçini tap və email göndər
    const foundUser = await user.findById(userId);
    if (foundUser) {
      // ✅ PDF yarat
      const pdfPath = generateBookingPdf(booking, foundUser, tour);

      // ✅ Email göndər (PDF əlavə olunmuş halda)
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: foundUser.email,
        subject: "Rezervasiya Təsdiqi (PDF əlavə olunub)",
        html: `
          <h3>Salam ${foundUser.username},</h3>
          <p>Rezervasiyanız uğurla qeydə alındı. Ətraflı məlumatı əlavə edilmiş PDF sənədində tapa bilərsiniz.</p>
        `,
        attachments: [
          {
            filename: `Rezervasiya_${tour.name}.pdf`,
            path: pdfPath,
          },
        ],
      });

      // (İstəklə) əlavə HTML email də göndərmək istəsən:
      // await sendBookingConfirmation(booking, foundUser, tour);
    }

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "User ID yoxdur" });

    const bookings = await Booking.find({ user: userId })
      .populate("tour")
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Rezervasiya tapılmadı" });

    res.json({ message: "Rezervasiya silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tour")
      .populate("user")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

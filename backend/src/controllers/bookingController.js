// controllers/bookingController.js
import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";

export const createBooking = async (req, res) => {
  const { tourId, date, time, guestCount, userId } = req.body;
  try {
    // 1) tour mövcudluğunu yoxla
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // 2) bu gün/saat üçün artıq rezervasiyaları topla
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setHours(23,59,59);

    const agg = await Booking.aggregate([
      { $match: { tour: tour._id, date: { $gte: dayStart, $lte: dayEnd }, time } },
      { $group: { _id: null, totalGuests: { $sum: "$guestCount" } } }
    ]);
    const used = agg[0]?.totalGuests || 0;

    // 3) seçilmiş slotun capacity-ni tap
    const slot = tour.timeSlots.find(s => s.time === time);
    if (!slot) return res.status(400).json({ message: "Invalid time slot" });

    if (used + guestCount > slot.capacity) {
      return res.status(400).json({ message: "This time slot is full. Please choose another." });
    }

    // 4) yarımçıq yox, rezervasiyanı yaradıb qaytar
    const booking = await Booking.create({
      tour: tour._id,
      date,
      time,
      guestCount,
      user: userId
    });

    res.status(201).json(booking);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

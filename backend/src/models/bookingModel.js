// models/bookingModel.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },       // eyni formatda “11:00” və s.
  guestCount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);

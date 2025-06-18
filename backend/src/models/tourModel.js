import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    activity: {
      type: String,
      enum: [
        "Beaches",
        "City Tours",
        "Cruises",
        "Hiking",
        "Historical",
        "Museum Tours",
      ],
      required: true,
    },
    availableDateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    maxGuests: { type: Number, default: 10 },
    image: { type: String },
  },
  { collection: "Tours", timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

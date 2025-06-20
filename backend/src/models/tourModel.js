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
    description: { type: String, required: true },
    duration: { type: String, required: true }, // məsələn: "3 days" və ya "4 hours"
    price: { type: Number, required: true },
    availableDateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    maxGuests: { type: Number, default: 10 },
    images: [{ type: String }],

    nearby: {
      hotels: [
        {
          name: { type: String, required: true },
          distance: { type: String }, // məsələn: "500m", "2 km"
          link: { type: String },     // Google Maps və ya otelin vebsaytı
        },
      ],
      restaurants: [
        {
          name: { type: String, required: true },
          type: { type: String },     // məsələn: "Italian", "Azerbaijani"
          distance: { type: String },
          link: { type: String },
        },
      ],
    },
  },
  { collection: "Tours", timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

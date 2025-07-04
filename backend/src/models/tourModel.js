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
    discount: { type: Number, default: 0 },
    timeSlots: [
      {
        time: { type: String, required: true }, // “11:00”, “15:00” və s.
        capacity: { type: Number, default: 20 }, // maksimum qonaq sayı hər slot üçün
      },
    ],
    availableDateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    disabledDays: {type: [String], default: [],
    },
    maxGuests: { type: Number, default: 10 },
    images: [{ type: String }],
    streetViewSrc: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    isFeatured: { type: Boolean, default: false },
    nearby: {
      hotels: [
        {
          name: { type: String, required: true },
          distance: { type: String }, // məsələn: "500m", "2 km"
          link: { type: String }, // Google Maps və ya otelin vebsaytı
        },
      ],
      restaurants: [
        {
          name: { type: String, required: true },
          distance: { type: String },
          link: { type: String },
        },
      ],
    },
  },
  { collection: "Tours", timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

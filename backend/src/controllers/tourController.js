import Tour from "../models/tourModel.js";
import Booking from "../models/bookingModel.js";

// 🟢 1. Ölkəyə görə şəhərləri gətir
export const getCitiesByCountry = async (req, res) => {
  const { country } = req.query;
  if (!country) {
    return res.status(400).json({ message: "Country parametri tələb olunur" });
  }
  try {
    const cities = await Tour.distinct("city", { country });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 2. Mövcud activity-ləri gətir
export const getActivities = async (req, res) => {
  try {
    const activities = await Tour.distinct("activity");
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 3. Yeni tur əlavə et
export const addTour = async (req, res) => {
  try {
    const {
      name,
      country,
      city,
      activity,
      duration,
      price,
      location,
      description,
      availableDateRange,
      maxGuests,
      nearby,
      streetViewSrc,
      isFeatured,
      timeSlots,
      disabledDays,
    } = req.body;

    if (!availableDateRange?.startDate || !availableDateRange?.endDate) {
      return res.status(400).json({ message: "Tarix aralığı tam deyil" });
    }

    const imagePaths = req.files.map((f) =>
      `images/${f.filename}`.replace(/\\/g, "/")
    );

    let parsedNearby = {};
    if (nearby) {
      try {
        parsedNearby = JSON.parse(nearby);
      } catch {
        return res.status(400).json({ message: "Nearby formatı yanlışdır" });
      }
    }

    let parsedTimeSlots = [];
    if (timeSlots) {
      try {
        parsedTimeSlots = JSON.parse(timeSlots); // frontend string göndərirsə
      } catch {
        return res.status(400).json({ message: "timeSlots formatı səhvdir" });
      }
    }

    let parsedDisabledDays = [];
    if (disabledDays) {
      try {
        parsedDisabledDays = JSON.parse(disabledDays);
      } catch {
        return res
          .status(400)
          .json({ message: "disabledDays formatı səhvdir" });
      }
    }

    const newTour = await Tour.create({
      name,
      country,
      city,
      activity,
      duration,
      price,
      location,
      description,
      availableDateRange,
      maxGuests,
      images: imagePaths,
      nearby: parsedNearby,
      streetViewSrc,
      isFeatured: isFeatured === "true",
      timeSlots: parsedTimeSlots,
      disabledDays: parsedDisabledDays,
    });

    res.status(201).json(newTour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 4. Turları filtrlə
export const getTours = async (req, res) => {
  try {
    const {
      country,
      city,
      activity,
      duration,
      description,
      price,
      location,
      dateFrom,
      guests,
    } = req.query;

    const filter = {};

    if (country) {
      filter.country = { $regex: new RegExp(`^${country.trim()}$`, "i") };
    }
    if (city) filter.city = city;
    if (activity) filter.activity = activity;
    if (duration) filter.duration = duration;
    if (description) filter.description = description;
    if (price) filter.price = price;
    if (location) filter.location = location;

    if (dateFrom) {
      const date = new Date(dateFrom);
      filter["availableDateRange.startDate"] = { $lte: date };
      filter["availableDateRange.endDate"] = { $gte: date };
    }

    if (guests) filter.maxGuests = { $gte: parseInt(guests) };

    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 5. Ada görə axtarış
export const searchTours = async (req, res) => {
  try {
    const { name } = req.params;
    const tours = await Tour.find({ name: { $regex: name, $options: "i" } });

    if (!tours.length)
      return res.status(404).json({ message: "Heç bir tur tapılmadı" });

    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 6. Tur silmək
export const deleteTour = async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour tapılmadı" });
    res.json({ message: "Tour uğurla silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 7. Tur güncəllə
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      country,
      city,
      activity,
      description,
      duration,
      price,
      maxGuests,
      nearby,
      streetViewSrc,
      isFeatured,
      timeSlots,
      disabledDays,
    } = req.body;

    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ message: "Tour tapılmadı" });

    const imagePaths = req.files?.length
      ? req.files.map((f) => `images/${f.filename}`.replace(/\\/g, "/"))
      : [];

    const updated = {
      name: name || tour.name,
      country: country || tour.country,
      city: city || tour.city,
      activity: activity || tour.activity,
      description: description || tour.description,
      duration: duration || tour.duration,
      price: price || tour.price,
      maxGuests: maxGuests || tour.maxGuests,
      images: imagePaths.length > 0 ? imagePaths : tour.images,
      streetViewSrc: req.body.streetViewSrc || tour.streetViewSrc,
      isFeatured: req.body.isFeatured === "true" || tour.isFeatured,
    };

    const sd = req.body["availableDateRange[startDate]"];
    const ed = req.body["availableDateRange[endDate]"];
    if (sd && ed) {
      updated.availableDateRange = {
        startDate: new Date(sd),
        endDate: new Date(ed),
      };
    }

    const lat = req.body["location[lat]"];
    const lng = req.body["location[lng]"];
    if (lat != null && lng != null) {
      updated.location = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    }

    if (nearby) {
      try {
        updated.nearby = JSON.parse(nearby);
      } catch {
        return res.status(400).json({ message: "Nearby formatı səhvdir" });
      }
    }

    if (timeSlots) {
      try {
        updated.timeSlots = JSON.parse(timeSlots);
      } catch {
        return res.status(400).json({ message: "timeSlots formatı səhvdir" });
      }
    }

    if (req.body.disabledDays) {
      try {
        updated.disabledDays = JSON.parse(req.body.disabledDays);
      } catch {
        return res
          .status(400)
          .json({ message: "disabledDays formatı səhvdir" });
      }
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true,
    });

    res.json(updatedTour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 8. Endirimli turlar
export const getDiscountedTours = async (req, res) => {
  try {
    const discountedTours = await Tour.find({ discount: { $gt: 0 } });
    res.status(200).json(discountedTours);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 9. Slot və qonaq sayı yoxlaması
export const getSlots = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: "Date tələb olunur" });

  try {
    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ message: "Tour tapılmadı" });

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59);

    const bookings = await Booking.aggregate([
      {
        $match: {
          tour: tour._id,
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "$time",
          totalGuests: { $sum: "$guestCount" },
        },
      },
    ]);

    const slots = tour.timeSlots.map((slot) => {
      const found = bookings.find((b) => b._id === slot.time);
      const used = found ? found.totalGuests : 0;
      return {
        time: slot.time,
        capacity: slot.capacity,
        remaining: slot.capacity - used,
      };
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 10. ID ilə tur gətir
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour tapılmadı" });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 11. Seçilmiş (featured) turlar
export const getFeaturedTours = async (req, res) => {
  try {
    const featured = await Tour.find({ isFeatured: true }).sort({
      createdAt: -1,
    });
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Tour from "../models/tourModel.js";

export const getCitiesByCountry = async (req, res) => {
  const { country } = req.query;
  if (!country) {
    return res.status(400).json({ message: "Country parametri tələb olunur" });
  }
  try {
    const cities = await Tour.distinct("city", { country });
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Tour.distinct("activity");
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const addTour = async (req, res) => {
  try {
    const {
      name,
      country,
      city,
      activity,
      duration,
      price,
      availableDateRange,
      maxGuests = 10,
    } = req.body;
    if (
      !availableDateRange ||
      !availableDateRange.startDate ||
      !availableDateRange.endDate
    ) {
      return res
        .status(400)
        .json({ message: "availableDateRange tam və düzgün olmalıdır" });
    }
    const imageUrl = req.file
      ? `images/${req.file.filename}`.replace(/\\/g, "/")
      : "";
    const newTour = await Tour.create({
      name,
      country,
      city,
      activity,
      duration,
      price,
      availableDateRange,
      maxGuests,
      image: imageUrl,
    });
    res.status(201).json(newTour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getTours = async (req, res) => {
  try {
    const { country, city, activity,duration, price, dateFrom, guests } = req.query;
    const filter = {};
    if (country) filter.country = country;
    if (city) filter.city = city;
    if (activity) filter.activity = activity;
    if (duration) filter.duration = duration;
    if (price) filter.price = price;
    if (dateFrom) {
      const date = new Date(dateFrom);
      filter["availableDateRange.startDate"] = { $lte: date };
      filter["availableDateRange.endDate"] = { $gte: date };
    }
    if (guests) filter.maxGuests = { $gte: parseInt(guests) };

    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const searchTours = async (req, res) => {
  try {
    const { name } = req.params;
    const tours = await Tour.find({ name: { $regex: name, $options: "i" } });
    if (!tours.length)
      return res.status(404).json({ message: "Heç bir tur tapılmadı" });
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour tapılmadı" });
    res.json({ message: "Tour uğurla silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      country,
      city,
      activity,
      duration,
      maxGuests,
      price,
      "availableDateRange[startDate]": startDate,
      "availableDateRange[endDate]": endDate,
    } = req.body;

    const imageUrl = req.file
      ? `images/${req.file.filename}`.replace(/\\/g, "/")
      : undefined;

    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (country) updatedFields.country = country;
    if (city) updatedFields.city = city;
    if (activity) updatedFields.activity = activity;
    if (duration) updatedFields.duration = duration;
    if (price) updatedFields.price = price;
    if (maxGuests) updatedFields.maxGuests = parseInt(maxGuests);
    if (startDate && endDate) {
      updatedFields.availableDateRange = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
    }
    if (imageUrl) updatedFields.image = imageUrl;

    const updatedTour = await Tour.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour tapılmadı" });
    }

    res.json(updatedTour);
  } catch (err) {
    console.error("updateTour error:", err);
    res.status(500).json({ message: err.message });
  }
};

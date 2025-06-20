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
      description,
      availableDateRange,
      maxGuests = 10,
      nearby = {},
    } = req.body;

    // Tarix yoxlaması
    if (!availableDateRange?.startDate || !availableDateRange?.endDate) {
      return res
        .status(400)
        .json({ message: "availableDateRange tam olmalıdır" });
    }

    // Multer ilə gələn faylları path halına gətir
    const imagePaths = req.files.map((f) =>
      `images/${f.filename}`.replace(/\\/g, "/")
    );

    const newTour = await Tour.create({
      name,
      country,
      city,
      activity,
      duration,
      price,
      description,
      availableDateRange,
      maxGuests,
      images: imagePaths, // <-- plural
      nearby,
    });

    res.status(201).json(newTour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getTours = async (req, res) => {
  try {
    const { country, city, activity, duration,description, price, dateFrom, guests } =
      req.query;
    const filter = {};

    if (country) filter.country = country;
    if (city) filter.city = city;
    if (activity) filter.activity = activity;
    if (duration) filter.duration = duration;
    if (description) filter.description = description;
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
      description,
      duration,
      price,
      maxGuests,
      nearby,
      "availableDateRange[startDate]": startDate,
      "availableDateRange[endDate]": endDate,
    } = req.body;

    const imagePaths = req.files?.length
      ? req.files.map((f) => `images/${f.filename}`.replace(/\\/g, "/"))
      : undefined;

    const updated = {};

    if (name) updated.name = name;
    if (country) updated.country = country;
    if (city) updated.city = city;
    if (activity) updated.activity = activity;
    if (duration) updated.duration = duration;
    if (description) updated.description = description;
    if (price) updated.price = price;
    if (maxGuests) updated.maxGuests = parseInt(maxGuests, 10);
    if (nearby) updated.nearby = nearby;
    if (startDate && endDate) {
      updated.availableDateRange = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
    }
    if (imagePaths) updated.images = imagePaths; // <-- plural

    const updatedTour = await Tour.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true,
    });
    if (!updatedTour)
      return res.status(404).json({ message: "Tour tapılmadı" });

    res.json(updatedTour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

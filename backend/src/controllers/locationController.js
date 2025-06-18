import Tour from "../models/tourModel.js";

export const getLocations = async (req, res) => {
  try {
    const tours = await Tour.find({}, "city country").lean();
    const seen = new Set();
    const locations = tours.reduce((arr, { city, country }) => {
      const key = `${city}||${country}`;
      if (!seen.has(key)) {
        seen.add(key);
        arr.push({ city, country });
      }
      return arr;
    }, []);
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

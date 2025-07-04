import wishlistModel from "../models/wishlistModel.js";

export const toggleWishlist = async (req, res) => {
  const { tourId, userId } = req.body;

  try {
    const existing = await wishlistModel.findOne({ tour: tourId, user: userId });

    if (existing) {
      await wishlistModel.findByIdAndDelete(existing._id);
      return res.status(200).json({ message: "Removed from wishlist", removed: true, tourId });
    }

    const newItem = await wishlistModel.create({ tour: tourId, user: userId });
    const populated = await newItem.populate("tour");
    res.status(201).json({ message: "Added to wishlist", removed: false, item: populated.tour });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWishlist = async (req, res) => {
  const { userId } = req.query;

  try {
    const items = await wishlistModel.find({ user: userId }).populate("tour");
    const formatted = items.map((item) => item.tour); // yalnız tour-ları frontend-ə göndər
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const deleted = await wishlistModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

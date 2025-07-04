import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
}, { timestamps: true });

wishlistSchema.index({ user: 1, tour: 1 }, { unique: true });

export default mongoose.model("Wishlist", wishlistSchema);

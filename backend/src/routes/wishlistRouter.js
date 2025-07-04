import express from "express";
import {
  toggleWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/toggle", toggleWishlist);
wishlistRouter.get("/", getWishlist);
wishlistRouter.delete("/:id", removeFromWishlist);

export default wishlistRouter;

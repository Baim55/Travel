import express from "express";
import {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  replyToReview,
} from "../controllers/reviewController.js";
import { isAuthenticated } from "../middleware/auth/authMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/", createReview);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.post("/:id/reply", isAuthenticated, replyToReview);

export default reviewRouter;

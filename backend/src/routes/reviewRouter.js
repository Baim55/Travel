import express from "express";
import {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/", createReview);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;

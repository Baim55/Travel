// src/routes/tourRouter.js
import express from "express";
import upload from "../upload/upload.js";
import {
  addTour,
  getTours,
  deleteTour,
  searchTours,
  getCitiesByCountry,
  getActivities,
  updateTour,
  getDiscountedTours,
  getSlots,
  getTourById,
  getFeaturedTours,
} from "../controllers/tourController.js";

const tourRouter = express.Router();

tourRouter.get("/cities", getCitiesByCountry);
tourRouter.get("/activities", getActivities);
tourRouter.post("/", upload.array("images", 10), addTour);
tourRouter.put("/:id", upload.array("images", 10), updateTour);
tourRouter.get("/", getTours);
tourRouter.get("/search/:name", searchTours);
tourRouter.delete("/:id", deleteTour);
tourRouter.get("/discounted", getDiscountedTours);
tourRouter.get("/:id/slots", getSlots);
tourRouter.get("/:id", getTourById);
tourRouter.get("/featured", getFeaturedTours);


export default tourRouter;

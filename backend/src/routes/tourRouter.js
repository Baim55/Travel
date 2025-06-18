import express from "express";
import upload from "../upload/upload.js";
import {
  addTour,
  getTours,
  deleteTour,
  searchTours,
  getCitiesByCountry,
  getActivities,
  updateTour
} from "../controllers/tourController.js";

const tourRouter = express.Router();

tourRouter.get("/cities",    getCitiesByCountry);
tourRouter.get("/activities", getActivities);
tourRouter.post("/",          upload.single("image"), addTour);
tourRouter.get("/",           getTours);
tourRouter.get("/search/:name", searchTours);
tourRouter.delete("/:id",     deleteTour);
tourRouter.put("/:id", upload.single("image"), updateTour);

export default tourRouter;

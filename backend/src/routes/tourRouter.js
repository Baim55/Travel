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

const router = express.Router();

router.get("/cities",    getCitiesByCountry);
router.get("/activities", getActivities);
router.post("/",          upload.single("image"), addTour);
router.get("/",           getTours);
router.get("/search/:name", searchTours);
router.delete("/:id",     deleteTour);
router.put("/tours/:id", upload.single("image"), updateTour);

export default router;

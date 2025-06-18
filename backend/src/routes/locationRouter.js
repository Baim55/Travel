import express from "express";
import { getLocations } from "../controllers/locationController.js";

const locationRouter = express.Router();

locationRouter.get("/", getLocations);

export default locationRouter;

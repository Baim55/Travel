import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getUserBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/user", getUserBookings);
bookingRouter.delete("/:id", deleteBooking);
bookingRouter.get("/", getAllBookings);

export default bookingRouter;

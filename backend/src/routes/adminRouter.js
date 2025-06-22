import express from "express";
import User from "../models/userModel.js";
const adminRouter = express.Router();

adminRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default adminRouter;

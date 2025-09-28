// routes/adminRouter.js
import express from "express";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import { loginAdmin } from "../controllers/adminController.js";
import { getAllReviewsForAdmin } from "../controllers/adminReviewController.js";

const adminRouter = express.Router();

// Bütün istifadəçiləri gətir
adminRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Müvəqqəti admin yaratmaq (1 dəfəlik istifadə üçün)
adminRouter.post("/admin/create", async (req, res) => {
  try {
    const newAdmin = new Admin({
      username: "baim13",
      password: "Beyim13!",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin yaradıldı" });
  } catch (error) {
    res.status(500).json({ message: "Admin yaratmaqda xəta", error });
  }
});

// Admin login
adminRouter.post("/admin/login", loginAdmin);

// Rəyləri admin üçün gətir
adminRouter.get("/admin/comments", getAllReviewsForAdmin);

export default adminRouter;

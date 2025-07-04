// src/routes/paymentRouter.js
import express from "express";
import { createCheckoutSession } from "../controllers/paymentsController.js";

const router = express.Router();
router.post("/create-checkout-session", createCheckoutSession);

export default router;

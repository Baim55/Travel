import express from "express";
import {
  getMessages,
  sendContactMessage,
} from "../controllers/messageController.js"; // burada contactController yox, messageController olacaq

const router = express.Router();

router.post("/send", sendContactMessage);
router.get("/", getMessages);

export default router;

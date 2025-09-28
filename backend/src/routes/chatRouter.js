import express from "express";
import { getMessages, createMessage } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/", getMessages);
chatRouter.post("/", createMessage);

export default chatRouter;

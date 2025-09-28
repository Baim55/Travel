import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import "./src/db/dbConnection.js";
import userRouter from "./src/routes/userRouter.js";
import tourRouter from "./src/routes/tourRouter.js";
import locationRouter from "./src/routes/locationRouter.js";
import reviewRouter from "./src/routes/reviewRouter.js";
import adminRouter from "./src/routes/adminRouter.js";
import bookingRouter from "./src/routes/bookingRouter.js";
import messageRouter from "./src/routes/messageRouter.js";
import blogRouter from "./src/routes/blogRouter.js";
import wishlistRouter from "./src/routes/wishlistRouter.js";
import paymentRouter from "./src/routes/paymentRouter.js";
import chatRouter from "./src/routes/chatRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/images", express.static("src/images"));

app.use("/auth", userRouter);
app.use("/api/tours", tourRouter);
app.use("/api/locations", locationRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api", adminRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/messages", messageRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => res.send("Hello World"));

io.on("connection", (socket) => {
  console.log("Yeni bağlantı:", socket.id);

  socket.on("chat_message", (data) => {
    const receiverId = data.receiverId;
    if (receiverId) {
      socket.broadcast.emit("chat_message", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("Bağlantı kəsildi:", socket.id);
  });
});

server.listen(port, () => console.log(`Server running on ${port}`));

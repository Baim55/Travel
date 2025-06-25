import express from "express";
import "dotenv/config";
import cors from "cors";
import "./src/db/dbConnection.js";
import userRouter from "./src/routes/userRouter.js";
import tourRouter from "./src/routes/tourRouter.js";
import locationRouter from "./src/routes/locationRouter.js";
import cookieParser from "cookie-parser";
import reviewRouter from "./src/routes/reviewRouter.js";
import adminRouter from "./src/routes/adminRouter.js";
// import testimonialRouter from "./src/routes/testimonialRouter.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/tours", tourRouter);
app.use("/api/locations", locationRouter);
app.use("/auth", userRouter);
app.use("/images", express.static("src/images"));
app.use("/api/reviews", reviewRouter);
app.use("/api", adminRouter);
// app.use("/api/testimonials", testimonialRouter);

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Server running on ${port}`));

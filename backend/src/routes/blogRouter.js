import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../upload/upload.js";

const blogRouter = express.Router();

blogRouter.post("/", upload.single("image"), createBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog başlığı tələb olunur"],
      trim: true,
    },
    image: {
      type: String, // şəkil URL və ya filename olacaq
      required: [true, "Şəkil tələb olunur"],
    },
    excerpt: {
      type: String,
      required: [true, "Qısa təsvir tələb olunur"],
    },
    content: {
      type: String,
      required: [true, "Mətn tələb olunur"],
    },
    category: {
      type: String,
      default: "General",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true } // createdAt və updatedAt avtomatik olacaq
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

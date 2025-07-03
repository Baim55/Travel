import fs from "fs";
import path from "path";
import Blog from "../models/blogModel.js";

// ✅ Yeni blog əlavə et
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, author } = req.body;
    const image = req.file?.filename;

    if (!title || !excerpt || !content || !image) {
      return res.status(400).json({ message: "Bütün sahələr doldurulmalıdır" });
    }

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      category,
      author,
      image,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: "Blog əlavə edilərkən xəta baş verdi", error: err.message });
  }
};

// ✅ Bütün blogları al
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Blogları alarkən xəta baş verdi" });
  }
};

// ✅ Tək blog post (ID ilə)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog tapılmadı" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Blog alınarkən xəta baş verdi" });
  }
};

// ✅ Blog sil
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog tapılmadı" });

    // şəkli də sil (əgər varsa)
    const imagePath = path.join("public/uploads", blog.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: "Blog silindi" });
  } catch (err) {
    res.status(500).json({ message: "Blog silinərkən xəta baş verdi" });
  }
};

import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminBlogForm.module.css";

export default function AdminBlogForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Şəkil seçilməyib");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/blogs", formData);
      alert("✅ Blog uğurla əlavə olundu");
      setForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "Admin",
      });
      setImage(null);
      if (onSuccess) onSuccess(); // refresh üçün
    } catch (err) {
      alert("❌ Blog əlavə edilərkən xəta baş verdi");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>New blog</h2>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <label>Excerpt</label>
      <input
        type="text"
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        required
      />

      <label>Content</label>
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        rows={6}
        required
      ></textarea>

      <label>Category</label>
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
      />

      <label>Author</label>
      <input type="file" accept="image/*" onChange={handleImageChange} required />

      <button type="submit">Add</button>
    </form>
  );
}

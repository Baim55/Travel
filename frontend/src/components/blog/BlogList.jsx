import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BlogList.module.css";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Bloglar alınmadı:", err));
  }, []);

  return (
    <section className={styles.blogList}>
      <h2>Bloq Yazıları</h2>
      <div className={styles.grid}>
        {blogs.map((blog) => (
          <div key={blog._id} className={styles.card}>
            <img
              src={`http://localhost:5000/uploads/${blog.image}`}
              alt={blog.title}
            />
            <div className={styles.content}>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <Link to={`/blogs/${blog._id}`} className={styles.readMore}>
                Davamını oxu →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styles from "./BlogDetail.module.css";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Blog tapılmadı:", err));
  }, [id]);

  if (!blog) return <p>Yüklənir...</p>;

  return (
    <div className={styles.detail}>
      <img src={`http://localhost:5000/uploads/${blog.image}`} alt={blog.title} />
      <h1>{blog.title}</h1>
      <p className={styles.meta}>
        Kateqoriya: {blog.category} • Müəllif: {blog.author}
      </p>
      <div className={styles.content}>{blog.content}</div>
      <Link to="/blogs" className={styles.backLink}>← Geri qayıt</Link>
    </div>
  );
}

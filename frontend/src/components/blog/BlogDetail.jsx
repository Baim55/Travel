import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./BlogDetail.module.css";
import Container from "../container/Container";
import { FaCalendarAlt, FaUser, FaFolder } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Blog tapılmadı:", err));

    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setRecentBlogs(res.data.slice(0, 3)))
      .catch((err) => console.error("Recent bloglar alınmadı:", err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <section className={styles.blogDetail}>
      <Container>
        <div className={styles.blogDetailContainer}>
          <div className={styles.left}>
            <div className={styles.imageWrapper}>
              <img
                src={`http://localhost:5000/images/${blog.image}`}
                alt={blog.title}
              />
            </div>
            <div className={styles.content}>
              <h1>{blog.title}</h1>
              <div className={styles.meta}>
                <span>
                  <FaCalendarAlt />{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span>
                  <FaUser /> {blog.author}
                </span>
                <span>
                  <FaFolder /> {blog.category}
                </span>
              </div>

              <p>{blog.content}</p>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.widget}>
              <h4>{t("blog.categories")}</h4>
              <ul>
                <li>{t("blog.companyInsight")}</li>
                <li>{t("blog.creative")}</li>
                <li>{t("blog.lifestyle")}</li>
                <li>{t("blog.tips")}</li>
                <li>{t("blog.uncategorized")}</li>
              </ul>
            </div>

            <div className={styles.widget}>
              <h4>{t("blog.recentPosts")}</h4>
              {recentBlogs.map((item) => (
                <Link key={item._id} to={`/blog/${item._id}`}>
                  <div className={styles.recentPost}>
                    <img
                      src={`http://localhost:5000/images/${item.image}`}
                      alt={item.title}
                    />
                    <div>
                      <p>{item.title}</p>
                      <small>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

import { FaCalendarAlt, FaUser, FaFolder } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BlogList.module.css";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useTranslation } from "react-i18next";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Bloglar alınmadı:", err));
  }, []);

  return (
    <section className={styles.blogList}>
      <Container>
        <h2 className={styles.heading}>{t("blog.title")}</h2>
        <div className={styles.blogListContainer}>
          <div className={styles.left}>
            {blogs.map((blog) => (
              <div key={blog._id} className={styles.blogCard}>
                <img
                  src={`http://localhost:5000/images/${blog.image}`}
                  alt={blog.title}
                />
                <div className={styles.blogContent}>
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

                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <Link to={`/blog/${blog._id}`} className={styles.readMore}>
                    {t("blog.readMore")}
                  </Link>
                </div>
              </div>
            ))}
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
              {blogs.slice(0, 3).map((blog) => (
                <Link key={blog._id} to={`/blog/${blog._id}`}>
                  <div className={styles.recentPost}>
                    <img
                      src={`http://localhost:5000/images/${blog.image}`}
                      alt={blog.title}
                    />
                    <div>
                      <p>{blog.title}</p>
                      <small>
                        {new Date(blog.createdAt).toLocaleDateString()}
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

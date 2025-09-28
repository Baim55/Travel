import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HomeBlogPreview.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../container/Container";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomeBlogPreview() {
  const [blogs, setBlogs] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data.slice(0, 3)))
      .catch((err) => console.error("Bloglar alınmadı:", err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <Container>
        <p className={styles.subtitle}>Blog</p>
        <h2 className={styles.sectionTitle}>{t("blog.blogTitle")}</h2>
        <div className={styles.grid}>
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={`http://localhost:5000/images/${blog.image}`}
                alt={blog.title}
              />
              <div className={styles.content}>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <Link to={`/blog/${blog._id}`} className={styles.readMore}>
                  {t("blog.readMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btnWrapper}>
          <Link to="/blog" className={styles.seeAll}>
            {t("blog.seeAllBlog")}
          </Link>
        </div>
      </Container>
    </section>
  );
}

// src/components/destinations/Destinations.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Destinations.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Destinations() {
  const [countries, setCountries] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        const grouped = {};
        res.data.forEach((tour) => {
          const key = tour.country;
          if (!grouped[key]) {
            grouped[key] = { country: key, count: 0 };
          }
          grouped[key].count += 1;
        });
        setCountries(Object.values(grouped));
      })
      .catch((err) => console.error("Turlar alınarkən xəta:", err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className={styles.destinations}>
      <p className={styles.subtitle}>{t("destinations.subtitle")}</p>
      <h2 className={styles.sectionTitle}>{t("destinations.title")}</h2>
      <div className={styles.grid}>
        {countries.map((item, index) => {
          const imageUrl = `./images/${item.country.toLowerCase().trim()}.jpg`;

          return (
            <div
              key={item.country}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link
                to={`/tours/country/${encodeURIComponent(item.country.trim())}`}
                className={styles.link}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={`/images/${item.country.toLowerCase().trim()}.jpg`}
                    alt={item.country}
                    className={styles.image}
                  />
                </div>
                <h3 className={styles.country}>{item.country}</h3>
                <p className={styles.count}>
                  {item.count} {t("destinations.tours")}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

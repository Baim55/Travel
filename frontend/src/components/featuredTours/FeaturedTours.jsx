// src/components/FeaturedTours.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../container/Container";
import ToursList from "../tours/ToursList";
import styles from "./FeaturedTours.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

export default function FeaturedTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        // Yalnız seçilmiş turları götürək – ilk 3 və ya discount olanlar
        const featured = res.data.filter((t) => t.isFeatured).slice(0, 12);
        setTours(featured);
      })
      .catch((err) => console.error("Seçilmiş turlar alınmadı:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Container>
      <h2 className={styles.sectionTitle}>{t("featured.subtitle")}</h2>
      {loading ? <p>Loading...</p> : <ToursList tours={tours} />}
    </Container>
  );
}

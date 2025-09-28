import React, { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "../tourCard/TourCard";
import styles from "./Discount.module.css";
import discountImg from "../../assets/images/h2_50off.png";
import discountImg2 from "../../assets/images/12518628743016932-adfa95267b1011eb99030242ac110002.avif";
import Container from "../container/Container";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Discount() {
  const { t } = useTranslation();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/tours/discounted")
      .then((res) => setTours(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.sectionHeader}>
          <p className={styles.subtitle}>{t("discount.subtitle")}</p>
          <h2 className={styles.sectionTitle}>{t("discount.title")}</h2>
        </div>
        <div className={styles.flex}>
          <div className={styles.left} data-aos="fade-right" data-aos-duration="1000">
            <div className={styles.overlay}>
              <img src={discountImg2} alt="" className={styles.bgImg} />
              <img
                src={discountImg}
                alt="50% Off"
                className={styles.discountBadge}
              />
            </div>

            <div className={styles.promoContent}>
              <h3 className={styles.promoTitle}>{t("discount.promoTitle")}</h3>
              <p className={styles.promoText}>{t("discount.promoText")}</p>
              <a href="#" className={styles.promoButton}>
                {t("discount.bookNow")}{" "}
                <span className="triply-icon-long-arrow-right" />
              </a>
            </div>
          </div>

          <div className={styles.right} data-aos="fade-left" data-aos-duration="1000">
            {loading && <p className={styles.msg}>Loading discounts…</p>}
            {error && <p className={styles.msgError}>Error: {error}</p>}
            {!loading && !error && tours.length === 0 && (
              <p className={styles.msg}>No discounted tours found.</p>
            )}
            <div className={styles.grid}>
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "../tourCard/TourCard";
import styles from "./Discount.module.css";
import discountImg from "../../assets/images/h2_50off.png";
import discountImg2 from "../../assets/images/12518628743016932-adfa95267b1011eb99030242ac110002.avif";
import Container from "../container/Container";

export default function Discount() {
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
          <p className={styles.subtitle}>Don’t miss</p>
          <h2 className={styles.sectionTitle}>Deals & Discounts</h2>
        </div>
        <div className={styles.flex}>
          <div className={styles.left}>
            <div className={styles.overlay}>
              <img src={discountImg2} alt="" className={styles.bgImg} />
              <img
                src={discountImg}
                alt="50% Off"
                className={styles.discountBadge}
              />
            </div>

            <div className={styles.promoContent}>
              <h3 className={styles.promoTitle}>Book Early to Save</h3>
              <p className={styles.promoText}>
                Enjoy 15% or more off stays between now and January 4, 2021
              </p>
              <a href="#" className={styles.promoButton}>
                Book Now&nbsp;
                <span className="triply-icon-long-arrow-right" />
              </a>
            </div>
          </div>

          <div className={styles.right}>
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

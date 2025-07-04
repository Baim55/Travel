import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import styles from "./Testimonials.module.css";
import test1 from "../../assets/images/h1_quote-1.png";
import test2 from "../../assets/images/h1_quote-2.png";
import { FaQuoteLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/comments")
      .then((res) => setReviews(res.data.slice(0, 5)))
      .catch((err) => console.error("Yorumlar alınmadı:", err));
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className={styles.testimonialSection}>
      <img src={test1} alt="quote left" className={styles.quoteLeft} />
      <img src={test2} alt="quote right" className={styles.quoteRight} />

      <h5 className={styles.subTitle}>{t("testimonials.title")}</h5>
      <h2 className={styles.mainTitle}>{t("testimonials.subtitle")}</h2>

      <Slider {...settings} className={styles.slider}>
        {reviews.map((review) => (
          <div key={review._id} className={styles.slide}>
            <p className={styles.comment}>"{review.comment}"</p>

            <div className={styles.details}>
              <div className={styles.circleIcon}>
                <FaQuoteLeft size={35} />
              </div>
              <img
                src={
                  review.user?.image
                    ? `http://localhost:5000/${review.user.image}`
                    : "/avatar.png"
                }
                alt="avatar"
                className={styles.avatar}
              />
              <div className={styles.info}>
                <div className={styles.name}>
                  {review.user?.name || "İstifadəçi"}
                </div>
                <div className={styles.job}>
                  {review.tour?.name || "Unknown"}
                </div>
                <div className={styles.rating}>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

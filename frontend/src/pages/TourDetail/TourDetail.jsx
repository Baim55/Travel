import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./TourDetail.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Container from "../../components/container/Container";
import ReviewForm from "../../components/reviews/RewievForm";
import ReviewList from "../../components/reviews/ReviewList";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function TourDetail({ tourId }) {
  const { id } = useParams();
  const { tours } = useSelector((state) => state.tour);
  const tour = tours.find((t) => t._id === id);
  const user = useSelector((state) => state.user.user);

  const [refresh, setRefresh] = useState(false);
  const handleReviewSubmit = () => {
    setRefresh((prev) => !prev); // refresh tetikleyici
  };

  if (!tour) {
    return <p className={styles.notFound}>Tour not found.</p>;
  }

  return (
    <Container>
      <div className={styles.detail}>
        <div className={styles.header}>
          <h1 className={styles.title}>{tour.name}</h1>
          <div className={styles.location}>
            <i className="fas fa-map-marker-alt" /> {tour.city}, {tour.country}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.swiperWrapper}>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={15}
                slidesPerView={1}
                className={styles.swiper}
              >
                {tour.images.map((imgPath, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={`http://localhost:5000/${imgPath}`}
                      alt={`${tour.name} ${idx + 1}`}
                      className={styles.fullImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <h4>Price</h4>
                <div className={styles.metaValue}>
                  <span>From</span>{" "}
                  <strong>${tour.price.toLocaleString()}</strong>
                </div>
              </div>

              <div className={styles.metaItem}>
                <h4>Duration</h4>
                <div className={styles.metaValue}>
                  <i className="fas fa-clock" /> {tour.duration}
                </div>
              </div>

              <div className={styles.metaItem}>
                <h4>Max Guests</h4>
                <div className={styles.metaValue}>
                  <i className="fas fa-user-friends" /> {tour.maxGuests}
                </div>
              </div>

              <div className={styles.metaItem}>
                <h4>Tour Type</h4>
                <div className={styles.metaValue}>
                  <i className="fas fa-tags" /> {tour.activity}
                </div>
              </div>
            </div>
            <div className={styles.description}>
              <p>{tour.description || "No description available."}</p>
            </div>
          </div>
        </div>
        <div className={styles.near}>
          <div className={styles.nearbyGrid}>
            {tour.nearby.restaurants.map((r, i) => (
              <div key={i} className={styles.nearbyCard}>
                <div className={styles.icon}>
                  <i className="fas fa-utensils" />
                </div>
                <div className={styles.info}>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.name}
                  >
                    {r.name}
                  </a>
                  <span className={styles.distance}>{r.distance}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.nearbyGrid}>
            {tour.nearby.hotels.map((h, i) => (
              <div key={i} className={styles.nearbyCard}>
                <div className={styles.icon}>
                  <i className="fas fa-bed" />
                </div>
                <div className={styles.info}>
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.name}
                  >
                    {h.name}
                  </a>
                  <span className={styles.distance}>{h.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.mapSection}>
          <h3>Location on Map</h3>
          <div className={styles.mapWrapper}>
            <iframe
              width="100%"
              height="300"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&zoom=14&q=${tour.location.lat},${tour.location.lng}`}
            ></iframe>
          </div>
        </div>
        <ReviewForm
          tourId={id}
          user={user}
          onReviewSubmit={handleReviewSubmit}
        />
        <ReviewList tourId={id} refreshTrigger={refresh} />
      </div>
    </Container>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./TourDetail.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Container from "../../components/container/Container";

export default function TourDetail() {
  const { id } = useParams();
  const { tours } = useSelector((state) => state.tour);
  const tour = tours.find((t) => t._id === id);

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
                  {" "}
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1717992.3052777606!2d-77.96050918949314!3d40.7298485325464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x24c91b2c24cb68a3%3A0x4987ecfdf76e51fc!2sSkyline%20Drone%20NJ!5e0!3m2!1saz!2saz!4v1750371594518!5m2!1saz!2saz"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
}

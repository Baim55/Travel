// src/components/ToursList.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./ToursList.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Container from "../container/Container";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../redux/features/wishlistSlice";
import { FaHeart } from "react-icons/fa";

export default function ToursList({ tours }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const toggleWishlist = (tour, e) => {
    e.stopPropagation(); // parent kliklənməsin
    dispatch(addWishlist(tour));
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  if (!tours.length) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>No tours found</p>;
  }

  return (
    <Container>
      <div className={styles.grid}>
        {tours.map((tour) => (
          <div
            key={tour._id}
            className={styles.card}
            onClick={() => navigate(`/detail/${tour._id}`)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={`http://localhost:5000/${tour.images[0]}`}
                alt={tour.name}
                className={styles.image}
              />
              <div className={styles.overlay}></div>
              <div
                className={`${styles.heartIcon} ${
                  isInWishlist(tour._id) ? styles.active : ""
                }`}
                onClick={(e) => toggleWishlist(tour, e)}
              >
                <FaHeart />
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{tour.name}</h3>
              <div className={styles.location}>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  {tour.city}, {tour.country}
                </span>
              </div>
              <div className={styles.meta}>
                <span>
                  <i className="fas fa-calendar-alt"></i> {tour.duration}
                </span>
                <span>
                  <i className="fas fa-user"></i> {tour.maxGuests}
                </span>
              </div>
              <div className={styles.footer}>
                <div className={styles.price}>${tour.price}</div>
                <div className={styles.button}>Explore →</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

ToursList.propTypes = {
  tours: PropTypes.array.isRequired,
};

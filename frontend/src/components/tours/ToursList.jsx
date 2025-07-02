// src/components/ToursList.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./ToursList.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Container from "../container/Container";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../redux/features/wishlistSlice";
import { FaHeart, FaCube } from "react-icons/fa";

export default function ToursList({ tours }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { user } = useSelector((state) => state.user);

  const toggleWishlist = (tour, e) => {
    e.stopPropagation(); 
    if (!user) {
    alert("Zəhmət olmasa, favoritlərə əlavə etmək üçün login olun");
    return;
  }
    dispatch(addWishlist(tour));
  };

  const goTo3DView = (tour, e) => {
    e.stopPropagation();
    navigate(`/detail/${tour._id}/3d-view`);
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
              {tour.streetViewSrc && (
                <button
                  className={styles.icon3DButton}
                  onClick={(e) => goTo3DView(tour, e)}
                  title="View in 3D"
                >
                  <FaCube />
                </button>
              )}
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

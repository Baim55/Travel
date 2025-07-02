import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./TourCard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaCube } from "react-icons/fa";
import axios from "axios";

export default function TourCard({ tour }) {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews?tourId=${tour._id}`);
        const reviews = res.data;
        if (reviews.length > 0) {
          const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
          setAverageRating(avg.toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (err) {
        console.error("Reytinq alınmadı:", err);
      }
    };

    fetchReviews();
  }, [tour._id]);

  const goTo3DView = (e) => {
    e.stopPropagation();
    navigate(`/detail/${tour._id}/3d-view`);
  };

  return (
    <div className={styles.card} onClick={() => navigate(`/detail/${tour._id}`)}>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:5000/${tour.images?.[0]}`}
          alt={tour.name}
          className={styles.image}
        />
        <div className={styles.overlay}></div>

        {tour.discount && (
          <span className={styles.discountBadge}>{tour.discount}% OFF</span>
        )}
        {tour.featured && (
          <span className={styles.featuredBadge}>FEATURED</span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.rating}>
          <i className="fas fa-star"></i> {averageRating}
        </div>

        <h3 className={styles.title}>{tour.name}</h3>

        <div className={styles.location}>
          <i className="fas fa-map-marker-alt"></i> {tour.city}, {tour.country}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            From{" "}
            <span>
              {tour.discount ? (
                <>
                  <del>{tour.originalPrice}</del> ${tour.price}
                </>
              ) : (
                `$${tour.price}`
              )}
            </span>
          </div>

          <div className={styles.actions}>
            {tour.streetViewSrc && (
              <button
                className={styles.cubeButton}
                onClick={goTo3DView}
                title="View in 3D"
              >
                <FaCube />
              </button>
            )}
            <button
              className={styles.exploreBtn}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/detail/${tour._id}`);
              }}
            >
              Explore →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};

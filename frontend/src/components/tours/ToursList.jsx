import React from "react";
import PropTypes from "prop-types";
import styles from "./ToursList.module.css";
import Container from "../container/Container";

export default function ToursList({ tours }) {
  if (!tours.length) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>No tours found</p>;
  }
  return (
    <Container>
      <div className={styles.grid}>
        {tours.map((tour) => (
          <div key={tour._id} className={styles.card}>
            <img src={`http://localhost:5000/${tour.image}`} alt={tour.name} className={styles.image} />
            <h3>{tour.name}</h3>
            <p>
              {tour.city}, {tour.country}
            </p>
            <p>Activity: {tour.activity}</p>
            <p>Max Guests: {tour.maxGuests}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

ToursList.propTypes = {
  tours: PropTypes.array.isRequired,
};

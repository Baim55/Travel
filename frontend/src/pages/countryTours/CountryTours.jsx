// src/pages/CountryTours.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import styles from "./CountryTours.module.css";
import ToursList from "../../components/tours/ToursList";

const CountryTours = () => {
  const { country } = useParams();
  const [tours, setTours] = useState([]);

 useEffect(() => {
  const cleanedCountry = country.trim();
  console.log("Query göndərilir:", cleanedCountry); // Əlavə et

  axios
    .get(`http://localhost:5000/api/tours?country=${cleanedCountry}`)
    .then((res) => setTours(res.data))
    .catch((err) => console.error("Xəta:", err));
}, [country]);


  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{country} Tours | NeoTravel</title>
      </Helmet>

      <div className={styles.header}>
        <h2>{country} Tours</h2>
        <p>{tours.length} tours found</p>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <span>{country}</span>
        </div>
      </div>

      <ToursList tours={tours} />
    </div>
  );
};

export default CountryTours;

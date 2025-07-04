// src/components/FeaturedTours.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../container/Container";
import ToursList from "../tours/ToursList";

export default function FeaturedTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tours")
      .then(res => {
        // Yalnız seçilmiş turları götürək – ilk 3 və ya discount olanlar
        const featured = res.data.filter(t => t.isFeatured).slice(0, 12);
        setTours(featured);
      })
      .catch(err => console.error("Seçilmiş turlar alınmadı:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <h2 style={{ margin: "2rem 0 1rem", textAlign: "center" }}>Featured Tours</h2>
      {loading ? <p>Loading...</p> : <ToursList tours={tours} />}
    </Container>
  );
}

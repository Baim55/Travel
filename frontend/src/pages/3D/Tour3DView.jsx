// src/pages/tours/Tour3DView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@google/model-viewer"; // AR + 3D dəstəyi üçün vacibdir
import { Helmet } from "react-helmet";

export default function Tour3DView() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Tour tapılmadı");
        }
        return res.json();
      })
      .then((data) => setTour(data))
      .catch((err) => {
        console.error("Tour3DView fetch error:", err);
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
        <h3>Xəta baş verdi:</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>Loading 3D View...</p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {tour.name} - 3D View & AR
      </h2>
      {tour.streetViewSrc ? (
        <div style={{ marginBottom: "40px" }}>
          <iframe
            width="100%"
            height="600"
            style={{ border: 0 }}
            loading="lazy"
            allow="geolocation; accelerometer; gyroscope; magnetometer; fullscreen"
            referrerPolicy="no-referrer-when-downgrade"
            src={tour.streetViewSrc}
            title="Street View"
          />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          Street View mövcud deyil.
        </p>
      )}
    </div>
  );
}

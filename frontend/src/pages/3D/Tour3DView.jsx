// src/pages/tours/Tour3DView.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Tour3DView() {
   const { id } = useParams();
  const { tours } = useSelector((state) => state.tour);
  const tour = tours.find((t) => t._id === id);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!tour) return <p>Loading 3D View...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{textAlign:"center"}}>{tour.name} - 3D View</h2>
      {tour.streetViewSrc && (
        <div>
          <iframe
            width="100%"
            height="600"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={tour.streetViewSrc}
            title="Street View"
          />
        </div>
      )}
    </div>
  );
}

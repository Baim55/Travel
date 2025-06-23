// src/pages/admin/EditTour.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTours, updateTour } from "../../../redux/features/tourSlice";
import TourForm from "../tourForm/TourForm";

export default function EditTour() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tours } = useSelector((state) => state.tour);
  const tour = tours.find((t) => t._id === id);

  useEffect(() => {
    if (!tours.length) dispatch(getTours());
  }, [dispatch, tours]);


const handleSubmit = (fd) => {
  dispatch(updateTour({ id, formData: fd }))
    .unwrap()
    .then(() => navigate("/admin/tours"))
    .catch((err) => {
      const msg =
        typeof err === "string" ? err : err.message || JSON.stringify(err);
      alert("Yeniləmə zamanı xəta: " + msg);
    });
};


  return tour ? <TourForm initialData={tour} onSubmit={handleSubmit} /> : null;
}

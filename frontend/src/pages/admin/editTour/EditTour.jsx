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

  const handleSubmit = (formData) => {
    dispatch(updateTour({ id, ...formData })).then(() =>
      navigate("/admin/tours")
    );
  };

  return tour ? <TourForm initialData={tour} onSubmit={handleSubmit} /> : null;
}

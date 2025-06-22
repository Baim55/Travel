// src/pages/admin/NewTour.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addTour } from "../../../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import TourForm from "../tourForm/TourForm";

export default function NewTour() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    dispatch(addTour(formData)).then(() => navigate("/admin/tours"));
  };

  return <TourForm onSubmit={handleSubmit} />;
}

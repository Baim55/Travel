// src/pages/admin/NewTour.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TourForm from "../tourForm/TourForm";
import { addTour } from "../../../redux/features/tourSlice";

export default function NewTour() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = formData => {
    dispatch(addTour(formData))
      .unwrap()
      .then(() => navigate("/admin/tours"))
      .catch(err => alert("Yükləmə zamanı xəta oldu: " + err));
  };

  return <TourForm onSubmit={handleSubmit} />;
}

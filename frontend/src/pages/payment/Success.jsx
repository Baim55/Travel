// pages/payment/Success.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBooking } from "../../redux/features/bookingSlice";
import styles from "./Success.module.css";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const createBooking = async () => {
      const params = new URLSearchParams(location.search);
      const tourId = params.get("tourId");
      const userId = params.get("userId");
      const date = params.get("date");
      const time = params.get("time");
      const guestCount = params.get("guestCount");

      try {
        const res = await axios.post("/api/bookings", {
          tourId,
          userId,
          date,
          time,
          guestCount,
        });

        dispatch(addBooking(res.data));
        setTimeout(() => navigate("/mybooking"), 3000);
      } catch (err) {
        console.error("Rezervasiya uğursuz oldu:", err.response?.data || err.message);
      }
    };

    createBooking();
  }, [location.search, navigate, dispatch]);

  return (
    <div className={styles.successContainer}>
      <h2>Ödəniş uğurla tamamlandı!</h2>
      <p>Rezervasiya sistemə əlavə olunur. Zəhmət olmasa gözləyin...</p>
    </div>
  );
};

export default Success;

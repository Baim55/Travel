// src/components/reviews/ReviewForm.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./ReviewForm.module.css";
import { toast } from "react-toastify";

function StarRating({ rating, setRating }) {
  const total = 5;
  return (
    <div className={styles.starRating}>
      {[...Array(total)].map((_, i) => {
        const starNumber = i + 1;
        return (
          <span
            key={starNumber}
            style={{
              cursor: "pointer",
              color: starNumber <= rating ? "#dc834e" : "#ccc",
              fontSize: "1.5rem",
              transition: "color 0.2s ease-in-out",
            }}
            onClick={() => setRating(starNumber)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setRating(starNumber);
            }}
            role="button"
            tabIndex={0}
            aria-label={`${starNumber} ulduz`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function ReviewForm({ tourId, user, onReviewSubmit }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please log in.");

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/reviews", {
        tour: tourId,
        user: user._id,
        comment,
        rating: Number(rating),
      });
      setComment("");
      setRating(0);
      toast.success("Comment sent successfully!");

      if (onReviewSubmit) {
        onReviewSubmit(); // ReviewList yenilənsin
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.heading}>Write a comment</h3>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        required
        className={styles.textarea}
      />
      <br />
      <label className={styles.selectLabel}>
        Rate:
        <StarRating rating={rating} setRating={setRating} />
      </label>
      <br />
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

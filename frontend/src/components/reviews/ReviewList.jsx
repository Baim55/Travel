import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import styles from "./ReviewList.module.css";
import Container from "../container/Container";

function renderStars(count) {
  const total = 5;
  const stars = [];
  for (let i = 1; i <= total; i++) {
    stars.push(
      <span key={i} style={{ color: i <= count ? "#dc834e" : "#ccc" }}>
        ★
      </span>
    );
  }
  return stars;
}

function StarRating({ rating, onChange }) {
  const total = 5;

  return (
    <div style={{ cursor: "pointer", userSelect: "none" }}>
      {[...Array(total)].map((_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            style={{ color: starValue <= rating ? "#dc834e" : "#ccc", fontSize: "24px" }}
            onClick={() => onChange(starValue)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onChange(starValue);
            }}
            role="button"
            tabIndex={0}
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function ReviewList({ tourId, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(5);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reviews?tourId=${tourId}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error("An error occurred while retrieving comments:", err);
      }
    }
    load();
  }, [tourId, refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete the comment?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("An error occurred during deletion.");
    }
  };

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedComment("");
    setEditedRating(5);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, {
        comment: editedComment,
        rating: Number(editedRating),
      });
      setReviews((prev) =>
        prev.map((r) =>
          r._id === id
            ? { ...r, comment: editedComment, rating: editedRating }
            : r
        )
      );
      cancelEdit();
    } catch (err) {
      alert("An error occurred while editing.");
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (!reviews.length)
    return <p>There are no comments yet. Be the first to comment!</p>;

  return (
    <Container>
      <h3>Comments</h3>

      <div className={`${styles.averageRatingBox} ${styles.averageRating}`}>
        <strong>Average Rating:</strong>{" "}
        {renderStars(Math.round(averageRating))}{" "}
        <span className={styles.ratingValue}>
          <span className={styles.bigNumber}>{averageRating.toFixed(1)}</span>/5
        </span>
      </div>

      <div className={styles.reviewCount}>
        {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
      </div>

      {reviews.map((r) => (
        <div key={r._id} className={styles.reviewBox}>
          {editingId === r._id ? (
            <div className={styles.editForm}>
              <StarRating rating={editedRating} onChange={setEditedRating} />
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <div className={styles.actions}>
                <button onClick={() => handleUpdate(r._id)}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.reviewHeader}>
                <img
                  src={
                    r.user?.image
                      ? `http://localhost:5000/${r.user.image.replace(
                          / /g,
                          "%20"
                        )}`
                      : "/default-avatar.png"
                  }
                  alt="Profil şəkli"
                  className={styles.avatar}
                />

                <div>
                  <strong>{r.user?.name || "Anonim"}</strong>
                  <div className={styles.subInfo}>
                    <small className={styles.date}>
                      {formatDistanceToNow(new Date(r.createdAt), {
                        addSuffix: true,
                      })}
                    </small>
                    <div className={styles.ratingBelow}>
                      {renderStars(r.rating)}{" "}
                      <span className={styles.ratingValue}>
                        {r.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className={styles.commentText}>{r.comment}</p>

              {user?._id === r.user?._id && (
                <div className={styles.actions}>
                  <button onClick={() => startEdit(r)}>Edit</button>
                  <button onClick={() => handleDelete(r._id)}>Delete</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </Container>
  );
}

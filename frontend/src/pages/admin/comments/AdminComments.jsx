import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminComments.module.css";

export default function AdminComments() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/comments")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Yorumlar alınmadı:", err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Comments</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Tour</th>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Rating</th>
              <th className={styles.th}>Comment</th>
              <th className={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id}>
                <td className={styles.td}>{r.tour?.name || "-"}</td>
                <td className={styles.td}>{r.user?.name || "Anonim"}</td>
                <td className={styles.td}>{r.rating}</td>
                <td className={styles.td}>{r.comment}</td>
                <td className={styles.td}>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

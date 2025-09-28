import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminBookings.module.css";
import { format } from "date-fns";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Rezervasiyalar alınmadı:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yüklənir...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>All Reservations</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Tour</th>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className={styles.td}>{b.tour?.name || "Silinib"}</td>
                <td className={styles.td}>{b.user?.username || "Silinib"}</td>
                <td className={styles.td}>{format(new Date(b.date), "dd.MM.yyyy")}</td>
                <td className={styles.td}>{b.time}</td>
                <td className={styles.td}>{b.guestCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

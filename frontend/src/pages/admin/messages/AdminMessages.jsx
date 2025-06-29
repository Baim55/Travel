import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminMessages.module.css";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/messages") // mesajlar üçün backend endpoint
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Mesajlar alınarkən xəta:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gələn Mesajlar</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Mesaj</th>
            <th>Tarix</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.message}</td>
              <td>{new Date(m.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

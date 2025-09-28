import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminMessages.module.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Incoming Messages</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Message</th>
              <th className={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td className={styles.td}>{msg.name}</td>
                <td className={styles.td}>{msg.email}</td>
                <td className={styles.td}>{msg.message}</td>
                <td className={styles.td}>
                  {new Date(msg.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;

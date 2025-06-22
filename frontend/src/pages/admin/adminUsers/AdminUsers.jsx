import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminUsers.module.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then(r => setUsers(r.data));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>
      <ul className={styles.list}>
        {users.map(u => (
          <li key={u._id} className={styles.listItem}>
            <span>{u.username} ({u.email})</span>
            {u.isAdmin && <span className={styles.adminBadge}>Admin</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

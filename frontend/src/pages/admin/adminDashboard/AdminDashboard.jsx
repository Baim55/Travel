import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h3 className={styles.menuTitle}>Admin Menu</h3>
        <ul className={styles.menuList}>
          <li><NavLink to="tours" className={({ isActive }) => isActive ? styles.active : styles.link}>Tours</NavLink></li>
          <li><NavLink to="users" className={({ isActive }) => isActive ? styles.active : styles.link}>Users</NavLink></li>
          <li><NavLink to="bookings" className={({ isActive }) => isActive ? styles.active : styles.link}>Bookings</NavLink></li>
          <li><NavLink to="messages" className={({ isActive }) => isActive ? styles.active : styles.link}>Messages</NavLink></li>
          <li><NavLink to="comments" className={({ isActive }) => isActive ? styles.active : styles.link}>Comments</NavLink></li>
          <li><NavLink to="blogs" className={({ isActive }) => isActive ? styles.active : styles.link}>Blogs</NavLink></li>
          <li><NavLink to="chat" className={({ isActive }) => isActive ? styles.active : styles.link}>Chat</NavLink></li>
        </ul>
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
}

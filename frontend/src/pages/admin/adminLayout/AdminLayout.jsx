import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  return (
    <div className={styles.admin}>
      <nav className={styles.nav}>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? styles.activeNav : styles.navLink
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="tours"
          className={({ isActive }) =>
            isActive ? styles.activeNav : styles.navLink
          }
        >
          Tours
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive ? styles.activeNav : styles.navLink
          }
        >
          Users
        </NavLink>
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

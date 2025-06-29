import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, padding: "1rem", background: "#f7f7f7" }}>
        <h3>Admin Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><NavLink to="tours">Tours</NavLink></li>
          <li><NavLink to="users">Users</NavLink></li>
          <li><NavLink to="bookings">Bookings</NavLink></li>
          <li><NavLink to="messages">Messages</NavLink></li>
          <li><NavLink to="comments">Comments</NavLink></li>
        </ul>
      </aside>
      <section style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </section>
    </div>
  );
}

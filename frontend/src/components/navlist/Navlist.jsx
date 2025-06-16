import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navlist.module.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Navlist = () => {
  return (
    <div className={styles.navContainer}>
      <ul className={styles.list}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ""}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/destinations" className={({ isActive }) => isActive ? styles.activeLink : ""}>Destinations</NavLink>
        </li>
        <li>
          <NavLink to="/stay" className={({ isActive }) => isActive ? styles.activeLink : ""}>Stay</NavLink>
        </li>
        <li>
          <NavLink to="/activities" className={({ isActive }) => isActive ? styles.activeLink : ""}>Activities</NavLink>
        </li>
        <li>
          <NavLink to="/ar" className={({ isActive }) => isActive ? styles.activeLink : ""}>AR</NavLink>
        </li>
        <li>
          <NavLink to="/plan" className={({ isActive }) => isActive ? styles.activeLink : ""}>Trip Planner</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : ""}>Contact</NavLink>
        </li>
      </ul>

      <div className={styles.burger}>
        <RxHamburgerMenu />
      </div>
    </div>
  );
};

export default Navlist;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navlist.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5"; // bağlama ikonu

const Navlist = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.navContainer}>
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
      <ul className={`${styles.list} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/destinations" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Destinations</NavLink>
        </li>
        <li>
          <NavLink to="/stay" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Stay</NavLink>
        </li>
        <li>
          <NavLink to="/activities" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Activities</NavLink>
        </li>
        <li>
          <NavLink to="/ar" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>AR</NavLink>
        </li>
        <li>
          <NavLink to="/plan" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Trip Planner</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Contact</NavLink>
        </li>
      </ul>

      <div className={styles.burger} onClick={toggleMenu}>
        {isOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
      </div>
    </div>
  );
};

export default Navlist;

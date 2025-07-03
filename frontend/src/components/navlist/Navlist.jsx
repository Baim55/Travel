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
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>About</NavLink>
        </li>
        <li>
          <NavLink to="/blog" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>Blog</NavLink>
        </li>
        <li>
          <NavLink to="/faq" className={({ isActive }) => isActive ? styles.activeLink : ""} onClick={closeMenu}>FAQ</NavLink>
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

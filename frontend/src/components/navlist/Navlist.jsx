import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navlist.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Navlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={closeMenu}
          >
            {t("navbar.home")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/destinations"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={closeMenu}
          >
            {t("navbar.destinations")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={closeMenu}
          >
            {t("navbar.about")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={closeMenu}
          >
            {t("navbar.blog")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/faq"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={closeMenu}
          >
            {t("navbar.faq")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={closeMenu}
          >
            {t("navbar.contact")}
          </NavLink>
        </li>
      </ul>

      <div className={styles.burger} onClick={toggleMenu}>
        {isOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
      </div>
    </div>
  );
};

export default Navlist;

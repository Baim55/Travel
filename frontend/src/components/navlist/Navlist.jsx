import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navlist.module.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Navlist = () => {
  return (
    <div>
      <ul className={styles.list}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/stay">Stay</Link>
        </li>
        <li>
          <Link to="/activities">Activities</Link>
        </li>
        <li>
          <Link to="/ar">AR</Link>
        </li>
        <li>
          <Link to="/plan">Trip Planner</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className={styles.burger}>
        <RxHamburgerMenu />
      </div>
    </div>
  );
};

export default Navlist;

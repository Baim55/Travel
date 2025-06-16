import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <section className={styles.header_area}>
      <Navbar />
    </section>
  );
};

export default Header;

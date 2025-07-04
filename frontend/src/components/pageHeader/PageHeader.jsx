import React from "react";
import styles from "./PageHeader.module.css";

const PageHeader = ({ title, subtitle }) => {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
 
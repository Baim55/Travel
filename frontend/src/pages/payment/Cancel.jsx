import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Cancel.module.css";

const Cancel = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.cancelPage}>
      <h2>{t("booking.cancelTitle")}</h2>
      <p>{t("booking.cancelMessage")}</p>
      <Link to="/" className={styles.homeButton}>
        {t("booking.backToHome")}
      </Link>
    </div>
  );
};

export default Cancel;

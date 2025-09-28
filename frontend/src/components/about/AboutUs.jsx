import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AboutUs.module.css";
import aboutImage from "../../assets/images/about_image-1.1.png";
import Container from "../container/Container";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.aboutarea}>
          <div className={styles.image} data-aos="fade-right" data-aos-duration="1000">
            <img src={aboutImage} alt="About us" />
          </div>
          <div className={styles.text}  data-aos="fade-left" data-aos-duration="1000">
            <p className={styles.subtitle}>{t("aboutHome.subtitle")}</p>
            <h2 className={styles.sectionTitle}>{t("aboutHome.title")}</h2>
            <p>{t("aboutHome.text")}</p>
            <button onClick={() => navigate("/about")}>
              {t("aboutHome.button")}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;

import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./Hero.module.css";
import hero1 from "../../assets/images/hero1.jpg";
import hero2 from "../../assets/images/hero2.jpg";
import hero3 from "../../assets/images/hero3.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id={styles.hero_area}>
      <Carousel fade controls={false} indicators={true} interval={4000}>
        <Carousel.Item>
          <div
            className={styles.hero_img}
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className={styles.hero_content}>
              <h1>{t("hero.enjoy")}</h1>
              <p>{t("hero.discover")}</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className={styles.hero_img}
            style={{ backgroundImage: `url(${hero2})` }}
          >
            <div className={styles.hero_content}>
              <h1>{t("hero.adventure")}</h1>
              <p>{t("hero.book")}</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className={styles.hero_img}
            style={{ backgroundImage: `url(${hero3})` }}
          >
            <div className={styles.hero_content}>
              <h1>{t("hero.comfort")}</h1>
              <p>{t("hero.deals")}</p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Hero;

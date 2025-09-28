import React from "react";
import styles from "./WhyUs.module.css";
import { GiBeachBag } from "react-icons/gi";
import {
  FaMapMarkerAlt,
  FaUserShield,
  FaGlobeAmericas,
  FaStar,
  FaReceipt,
} from "react-icons/fa";
import Container from "../container/Container";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WhyUs() {
  const { t } = useTranslation();
  const items = [
    {
      icon: <GiBeachBag />,
      title: t("whyUs.agentTitle"),
      text: t("whyUs.agentText"),
    },
    {
      icon: <FaMapMarkerAlt />,
      title: t("whyUs.placesTitle"),
      text: t("whyUs.placesText"),
    },
    {
      icon: <FaUserShield />,
      title: t("whyUs.safetyTitle"),
      text: t("whyUs.safetyText"),
    },
    {
      icon: <FaGlobeAmericas />,
      title: t("whyUs.passionTitle"),
      text: t("whyUs.passionText"),
    },
    {
      icon: <FaStar />,
      title: t("whyUs.priceTitle"),
      text: t("whyUs.priceText"),
    },
    {
      icon: <FaReceipt />,
      title: t("whyUs.bookingTitle"),
      text: t("whyUs.bookingText"),
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.header} data-aos="fade-up">
          <div className={styles.subheading}>{t("whyUs.subheading")}</div>
          <h2 className={styles.title}>{t("whyUs.title")}</h2>
        </div>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={i}
              className={styles.card}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

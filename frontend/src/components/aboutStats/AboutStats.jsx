import React from "react";
import styles from "./AboutStats.module.css";
import StatsCounter from "../statsCounter/StatsCounter";
import { FaGlobeAmericas, FaMapMarkedAlt, FaUserFriends } from "react-icons/fa";
import { BsBackpack2 } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const AboutStats = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.stats}>
      <div className={styles.overlay}>
        <StatsCounter
          icon={<FaMapMarkedAlt />}
          end={154}
          title={t("aboutStats.destinations")}
        />
        <StatsCounter
          icon={<FaGlobeAmericas />}
          end={2165}
          title={t("aboutStats.amazingTours")}
        />
        <StatsCounter
          icon={<BsBackpack2 />}
          end={98}
          title={t("aboutStats.tourTypes")}
        />
        <StatsCounter
          icon={<FaUserFriends />}
          end={117259}
          title={t("aboutStats.happyCustomers")}
        />
      </div>
    </section>
  );
};

export default AboutStats;

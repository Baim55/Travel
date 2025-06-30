import React from "react";
import styles from "./AboutStats.module.css";
import StatsCounter from "../statsCounter/StatsCounter";
import { FaGlobeAmericas, FaMapMarkedAlt, FaUserFriends } from "react-icons/fa";
import { BsBackpack2 } from "react-icons/bs";

const AboutStats = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.overlay}>
        <StatsCounter
          icon={<FaMapMarkedAlt />}
          end={154}
          title="Destinations"
        />
        <StatsCounter
          icon={<FaGlobeAmericas />}
          end={2165}
          title="Amazing Tours"
        />
        <StatsCounter icon={<BsBackpack2 />} end={98} title="Tour Types" />
        <StatsCounter
          icon={<FaUserFriends />}
          end={117259}
          title="Happy Customers"
        />
      </div>
    </section>
  );
};

export default AboutStats;

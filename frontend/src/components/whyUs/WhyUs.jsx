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

const items = [
  {
    icon: <GiBeachBag />,
    title: "Best Travel Agent",
    text: "Our professional tour operators design the most suitable and affordable travel plans for you.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Beautiful Places",
    text: "We discover and offer you the most stunning and fascinating destinations around the world.",
  },
  {
    icon: <FaUserShield />,
    title: "Trust & Safety",
    text: "Your safety and trust are our top priorities throughout every step of your journey.",
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Passionate Travel",
    text: "With our passion for travel, we deliver unforgettable experiences and adventures.",
  },
  {
    icon: <FaStar />,
    title: "Best Price Guarantee",
    text: "We guarantee the best quality tours at the most competitive prices.",
  },
  {
    icon: <FaReceipt />,
    title: "Fast Booking",
    text: "Plan your dream trip instantly with our simple and fast booking system.",
  },
];

export default function WhyUs() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subheading}>Why us</div>
          <h2 className={styles.title}>We Make All The Process Easy</h2>
        </div>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

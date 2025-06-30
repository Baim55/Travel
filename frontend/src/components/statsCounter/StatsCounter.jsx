import React, { useEffect, useRef, useState } from "react";
import styles from "./StatsCounter.module.css";

const StatsCounter = ({ icon, end, title }) => {
  const ref = useRef();
  const [hasViewed, setHasViewed] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasViewed) {
        setHasViewed(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasViewed]);

  useEffect(() => {
    if (!hasViewed) return;
    let start = 0;
    const duration = 2000; // 2 saniyə
    const increment = end / (duration / 20);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [hasViewed, end]);

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.count}>{count.toLocaleString()}</h3>
      <p className={styles.label}>{title}</p>
    </div>
  );
};

export default StatsCounter;

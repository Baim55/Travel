// src/components/Footer/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";
import Container from "../container/Container";
import logo from "../../assets/images/ChatGPT Image 19 Haz 2025 14_57_40.png"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.col}>
            <img
              src={logo}
              alt="Triply Logo"
              className={styles.logo}
            />
            <p>
              Nisi ut aliquip ex ea commodo consequatute irure dolor in
              reprehenderit in voluptatevelit esse cillum dolore eu fugiat nulla
              excepteur pariatur.
            </p>
            <div className={styles.address}>
              <i className="bi bi-geo-alt-fill" />
              <div>
                <div>754 West Gartner Street</div>
                <small>Encino, CA 91316</small>
              </div>
            </div>
            <button className={styles.mapBtn}>
              View Map <i className="bi bi-arrow-right" />
            </button>
          </div>

          <div className={styles.col}>
            <h4>Our Services</h4>
            <ul>
              {[
                "Booking",
                "RentalCar",
                "HostelWorld",
                "Trivago",
                "TripAdvisor",
              ].map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Explore</h4>
            <ul>
              {[
                "Madrid Tour",
                "Stockholm City",
                "Roma City",
                "Shanghai City",
                "Tokyo",
              ].map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Get Updates & More</h4>
            <p>Subscribe to the free newsletter and stay up to date</p>
            <form className={styles.newsForm}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe →</button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>Copyright © 2022 Triply. All Rights Reserved.</span>
          <nav>
            {["Privacy", "Policy", "About Us", "Support", "FAQ", "Blog"].map(
              (link) => (
                <a key={link} href="#" className={styles.link}>
                  {link}
                </a>
              )
            )}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

import React from "react";
import styles from "./Footer.module.css";
import Container from "../container/Container";
import logo from "../../assets/images/ChatGPT Image 19 Haz 2025 14_57_40.png";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.col}>
            <img src={logo} alt="Triply Logo" className={styles.logo} />
            <p>{t("footer.description")}</p>

            <div className={styles.address}>
              <i className="bi bi-geo-alt-fill" />
              <div>
                <div>{t("footer.addressLine1")}</div>
                <small>{t("footer.addressLine2")}</small>
              </div>
            </div>

            <button className={styles.mapBtn}>
              <a
                href="https://www.google.com/maps/place/42a+Jafar+Khandan+St,+Baku+1130,+Azerbaijan/@40.4184204,49.8421291,19.25z/data=!4m6!3m5!1s0x403087e5c74bffff:0xc99d578c6a8b3c4a!8m2!3d40.4183906!4d49.8425077!16s%2Fg%2F11yd08nyp7?hl=en-US&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapBtn}
              >
                {t("footer.viewMap")} <i className="bi bi-arrow-right" />
              </a>
            </button>
          </div>

          <div className={styles.col}>
            <h4>{t("footer.ourServices")}</h4>
            <ul>
              {[
                "booking",
                "rentalCar",
                "hostelWorld",
                "trivago",
                "tripAdvisor",
              ].map((key) => (
                <li key={key}>
                  <a href="#">{t(`footer.services.${key}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>{t("footer.explore")}</h4>
            <ul>
              {["madrid", "stockholm", "roma", "shanghai", "tokyo"].map(
                (key) => (
                  <li key={key}>
                    <a href="#">{t(`footer.exploreItems.${key}`)}</a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>{t("footer.getUpdates")}</h4>
            <p>{t("footer.subscribeText")}</p>
            <form className={styles.newsForm}>
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                required
              />
              <button type="submit">{t("footer.subscribeButton")}</button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>{t("footer.copyright")}</span>
          <nav>
            {["privacy", "policy", "about", "support", "faq", "blog"].map(
              (key) => (
                <a key={key} href="#" className={styles.link}>
                  {t(`footer.links.${key}`)}
                </a>
              )
            )}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

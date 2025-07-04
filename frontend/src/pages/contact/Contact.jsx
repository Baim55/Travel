import React, { useState } from "react";
import styles from "./Contact.module.css";
import { Helmet } from "react-helmet";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone, FiClock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import PageHeader from "../../components/pageHeader/PageHeader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/messages/send", formData);
      toast.success("Your message has been sent to your email!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("An error occurred while sending the email.");
    }
  };

  return (
    <>
      <PageHeader title={t("contact.title")} />
      <section className={styles.contactSection}>
        <Helmet>
          <title>{t("contact.seoTitle")} | NeoTravel</title>
        </Helmet>
        <div className={styles.contactWrapper}>
          <div className={styles.contactInfo}>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <HiOutlineLocationMarker />
              </div>
              <div className={styles.content}>
                <h3>{t("contact.address")}</h3>
                <p>
                  42A Jafar Khandan Street,
                  <br /> Binagadi District, Baku City
                </p>
              </div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <FiPhone />
              </div>
              <div className={styles.content}>
                <h3>{t("contact.phone")}</h3>
                <p>+994 10 318-52-85</p>
              </div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <MdOutlineEmail />
              </div>
              <div className={styles.content}>
                <h3>{t("contact.email")}</h3>
                <p>rustemzadebeyim@gmail.com</p>
              </div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <FiClock />
              </div>
              <div className={styles.content}>
                <h3>{t("contact.hours")}</h3>
                <p>
                  Every day: 09:00 AM - 20:00 PM <br />
                  (Note: Online support is available 24/7)
                </p>
              </div>
            </div>
          </div>

          <div className={styles.formBox}>
            <h2 className={styles.heading}>{t("contact.contactUs")}</h2>
            <p className={styles.description}>{t("contact.description")}</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder={t("contact.namePlaceholder")}
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("contact.emailPlaceholder")}
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder={t("contact.messagePlaceholder")}
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className={styles.button}>
                {t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

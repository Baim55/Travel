import React from "react";
import styles from "./Contact.module.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <section className={styles.contactSection}>
      <Helmet>
        <title>Contact | NeoTravel</title>
      </Helmet>
      <div className={styles.contactWrapper}>
        <div className={styles.contactInfo}>          
          <div className={styles.iconBox}>            
            <div className={styles.icon}><i className="triply-icon- triply-icon-location-circle"></i></div>
            <div className={styles.content}>
              <h3>Address</h3>
              <p>184 Mayfield St. Hopewell <br/>Junction, NY 12533</p>
            </div>
          </div>
          <div className={styles.iconBox}>
            <div className={styles.icon}><i className="triply-icon- triply-icon-phone-rotary"></i></div>
            <div className={styles.content}>
              <h3>Phone</h3>
              <p>+ 844 1800 - 333 55<br/>+ 844 1755 - 444 11</p>
            </div>
          </div>
          <div className={styles.iconBox}>
            <div className={styles.icon}><i className="triply-icon- triply-icon-envelope-open"></i></div>
            <div className={styles.content}>
              <h3>Email</h3>
              <p>contact@example.com</p>
            </div>
          </div>
          <div className={styles.iconBox}>
            <div className={styles.icon}><i className="triply-icon- triply-icon-clock-time"></i></div>
            <div className={styles.content}>
              <h3>Business Hours</h3>
              <p>Mon - Sat: 10:00 AM - 20:00 PM</p>
            </div>
          </div>
        </div>

        <div className={styles.formBox}>
          <h2 className={styles.heading}>Contact Us</h2>
          <p className={styles.description}>Feel free to reach out to us with any questions or concerns!</p>
          <form className={styles.form}>
            <input type="text" placeholder="Full Name" className={styles.input} required />
            <input type="email" placeholder="Email Address" className={styles.input} required />
            <textarea rows="5" placeholder="Your Message" className={styles.textarea}></textarea>
            <button type="submit" className={styles.button}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

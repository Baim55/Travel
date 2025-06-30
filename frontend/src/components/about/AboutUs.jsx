import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AboutUs.module.css";
import aboutImage from "../../assets/images/about_image-1.1.png";
import Container from "../container/Container";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.aboutarea}>
          <div className={styles.image}>
            <img src={aboutImage} alt="About us" />
          </div>
          <div className={styles.text}>
            <p className={styles.subtitle}>About</p>
            <h2 className={styles.sectionTitle}>We Help You Planning Your Journey</h2>
            <p>
              At NeoTravel, we believe travel is more than just visiting places
              — it's about creating stories, making memories, and discovering
              the beauty of different cultures. We curate unique and immersive
              tours that take you beyond the typical tourist path. With expert
              local guides, seamless booking, and carefully selected
              destinations, we make every journey meaningful and stress-free.
              Whether you're seeking adventure, relaxation, or cultural
              exploration, NeoTravel helps turn your travel dreams into
              unforgettable experiences.
            </p>
            <button onClick={() => navigate("/about")}>More Detailed</button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs; 

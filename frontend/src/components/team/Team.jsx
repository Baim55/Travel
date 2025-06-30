// src/components/about/Team.jsx
import React from "react";
import styles from "./Team.module.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const teamData = [
  {
    name: "Adam Johnson",
    role: "CEO, Founder",
    image: "/images/profile1.png",
    socials: {
      facebook: "#",
      twitter: "#",
      youtube: "#",
      instagram: "#"
    }
  },
  {
    name: "Kevin D.",
    role: "Marketing",
    image: "/images/profile2.png",
    socials: {
      facebook: "#",
      twitter: "#",
      youtube: "#",
      instagram: "#"
    }
  },
  {
    name: "Frank L.",
    role: "Designer",
    image: "/images/profile3.png",
    socials: {
      facebook: "#",
      twitter: "#",
      youtube: "#",
      instagram: "#"
    }
  },
  {
    name: "Alena Doe",
    role: "Support",
    image: "/images/profile4.png",
    socials: {
      facebook: "#",
      twitter: "#",
      youtube: "#",
      instagram: "#"
    }
  }
];

const Team = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <p className={styles.subTitle}>Our Team</p>
        <h2 className={styles.title}>Meet The Team</h2>
        <div className={styles.teamGrid}>
          {teamData.map((member, index) => (
            <div className={styles.card} key={index}>
              <img src={member.image} alt={member.name} className={styles.image} />
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <div className={styles.socials}>
                <a href={member.socials.facebook}><FaFacebookF /></a>
                <a href={member.socials.youtube}><FaYoutube /></a>
                <a href={member.socials.twitter}><FaTwitter /></a>
                <a href={member.socials.instagram}><FaInstagram /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

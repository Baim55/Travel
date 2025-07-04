import React from "react";
import styles from "./Team.module.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();

  const teamData = [
    {
      name: "Leyla Həsənli",
      role: t("team.ceo"),
      image: "/images/profile1.png",
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram: "#"
      }
    },
    {
      name: "Fərid Hüseynli",
      role: t("team.marketing"),
      image: "/images/profile2.png",
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram: "#"
      }
    },
    {
      name: "Aysel Rüstəmli",
      role: t("team.designer"),
      image: "/images/profile3.png",
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram: "#"
      }
    },
    {
      name: "Fuad Qasımlı",
      role: t("team.support"),
      image: "/images/profile4.png",
      socials: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        instagram: "#"
      }
    }
  ];

  return (
    <section className={styles.teamSection}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <p className={styles.subTitle}>{t("team.ourTeam")}</p>
        <h2 className={styles.title}>{t("team.meetTheTeam")}</h2>
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

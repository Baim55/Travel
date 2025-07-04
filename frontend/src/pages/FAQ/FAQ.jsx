import React, { useState } from "react";
import styles from "./Faq.module.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PageHeader from "../../components/pageHeader/PageHeader";
import Container from "../../components/container/Container";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const faqData = [
  { category: "payment" },
  { category: "reservation" },
  { category: "cancellation" },
  { category: "experience" },
  { category: "support" },
];

export default function Faq() {
  const [openIndexes, setOpenIndexes] = useState({});
  const { t } = useTranslation();

  const toggle = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section>
       <Helmet>
              <title> FAQ | NeoTravel</title>
            </Helmet>
      <PageHeader
        title={t("pageHeader.faq.title")}
      />
      <Container>
        <div className={styles.faqWrapper}>
          <div className={styles.left}>
            <h2 className={styles.title}>{t("faq.title")}</h2>
            <p className={styles.desc}>{t("faq.description")}</p>
          </div>
          <div className={styles.right}>
            {faqData.map((cat, catIndex) => {
              const categoryKey = cat.category;
              const items = t(`faq.questions.${categoryKey}`, { returnObjects: true });

              return (
                <div key={categoryKey} className={styles.categoryBlock}>
                  <h4 className={styles.category}>
                    {t(`faq.categories.${categoryKey}`)}
                  </h4>

                  {items.map((item, itemIndex) => {
                    const isOpen = openIndexes[`${catIndex}-${itemIndex}`];
                    return (
                      <div key={item.question} className={styles.faqItem}>
                        <div
                          className={styles.questionLine}
                          onClick={() => toggle(catIndex, itemIndex)}
                        >
                          <HelpOutlineIcon className={styles.icon} />
                          <span>{item.question}</span>
                        </div>

                        <div
                          className={`${styles.answerWrapper} ${isOpen ? styles.open : ""}`}
                        >
                          <p className={styles.answer}>{item.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

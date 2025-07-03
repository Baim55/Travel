import React, { useState } from "react";
import styles from "./Faq.module.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PageHeader from "../../components/pageHeader/PageHeader";
import Container from "../../components/container/Container";

const faqData = [
  {
    category: "Payment",
    items: [
      {
        question:
          "Are there any extra fees I need to pay on top of the listed price?",
        answer:
          "No hidden fees. All taxes and charges are included unless otherwise stated in the tour details.",
      },
      {
        question: "Can I pay in my local currency?",
        answer:
          "All payments are processed in USD. You can use a card from any country, but exchange rates may apply.",
      },
      {
        question: "Is online payment secure?",
        answer:
          "Yes. We use encrypted SSL connections and trusted payment gateways to ensure your security.",
      },
    ],
  },
  {
    category: "Reservation",
    items: [
      {
        question: "How do I make a reservation?",
        answer:
          "Simply select your tour, pick a date and time, enter guest details, and proceed to payment.",
      },
      {
        question: "Can I book a tour without creating an account?",
        answer:
          "No, because we recommend creating an account to view, manage, or cancel your bookings easily.",
      },
      {
        question: "What happens after I book a tour?",
        answer:
          "You will receive a confirmation email with all booking details and instructions.",
      },
    ],
  },
  {
    category: "Cancellation & Refund",
    items: [
      {
        question: "Can I cancel a booking?",
        answer:
          "Yes. You can cancel from your account dashboard. Note that each tour has its own cancellation policy.",
      },
      {
        question: "How long does it take to receive a refund?",
        answer:
          "Refunds are typically processed within 5–7 business days, depending on your bank.",
      },
    ],
  },
  {
    category: "Tour Guide & Experience",
    items: [
      {
        question: "Will a guide be with us during the tour?",
        answer:
          "Yes, all our tours include professional guides who speak English and sometimes local languages.",
      },
      {
        question: "Can I customize a private tour?",
        answer:
          "Absolutely! For private tour customization, please contact our support or use the custom request form.",
      },
    ],
  },
  {
    category: "Account & Support",
    items: [
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Go to the login page and click 'Forgot Password'. A reset link will be sent to your email.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can use the Contact page, live chat, or email us at support@neotravel.com.",
      },
    ],
  },
];

export default function Faq() {
  const [openIndexes, setOpenIndexes] = useState({});

  const toggle = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section>
      <PageHeader title="FAQ" />
      <Container>
        <div className={styles.faqWrapper}>
          <div className={styles.left}>
            <h2 className={styles.title}>Find Answers</h2>
            <p className={styles.desc}>
              Have questions about your upcoming journey with NeoTravel? Whether
              you're curious about booking processes, cancellation policies,
              tour availability, or payment options — we’ve got you covered.
              Browse through our frequently asked questions below to find quick
              and helpful answers. Still need help? Don’t hesitate to contact
              our support team anytime.
            </p>
          </div>
          <div className={styles.right}>
            {faqData.map((cat, catIndex) => (
              <div key={cat.category} className={styles.categoryBlock}>
                <h4 className={styles.category}>{cat.category}</h4>
                {cat.items.map((item, itemIndex) => {
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
                        className={`${styles.answerWrapper} ${
                          isOpen ? styles.open : ""
                        }`}
                      >
                        <p className={styles.answer}>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

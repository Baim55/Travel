import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    const checkDarkMode = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", checkDarkMode);
    checkDarkMode();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", checkDarkMode);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "40px",
        padding: "10px 15px",
        fontSize: "18px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: isDark ? "#fbbf24" : "#c36b36",
        color: isDark ? "#000" : "#fff",
        cursor: "pointer",
        boxShadow: isDark
          ? "0 2px 5px rgba(255, 255, 255, 0.3)"
          : "0 2px 5px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
      }}
      aria-label="Back to top"
      title="Back to top"
    >
      <FiArrowUp />
    </button>
  );
};

export default BackToTopButton;

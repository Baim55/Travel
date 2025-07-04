import React, { useContext, useEffect } from "react";
import styles from "./Wrapper.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/features/userSlice";
import { clearWishlist, setWishlist } from "../../redux/features/wishlistSlice";
import { clearBookings } from "../../redux/features/bookingSlice";
import { ThemeContext } from "../../context/darkModeContext";
import { useTranslation } from "react-i18next";

// React Icons
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart, FaUserPlus, FaSun, FaMoon } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";

const Wrapper = () => {
  const baseUrl = "http://localhost:5000/auth";
  const { user } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.booking);
  const bookingCount = bookings.length;
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { dark, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    dispatch(setUser(null));
    dispatch(clearWishlist());
    dispatch(clearBookings());
    const res = await axios.get(`${baseUrl}/logout`, { withCredentials: true });
    alert(res.status === 200 ? "Logout successful" : "Logout failed");
  };

  useEffect(() => {
  if (user) {
    axios
      .get(`http://localhost:5000/api/wishlist?userId=${user._id}`)
      .then((res) => dispatch(setWishlist(res.data)))
      .catch((err) => console.error("Wishlist fetch error:", err));
  }
}, [user]);

  return (
    <div className={styles.wrapper}>
      <div className="dropdown">
        <button
          className={`${styles.iconLink} btn`}
          type="button"
          data-bs-toggle="dropdown"
        >
          <IoPersonOutline size={21} />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {user ? (
            <>
              <li>
                <Link className="dropdown-item" to="/wishlist">
                  <FaRegHeart style={{ marginRight: "8px" }} />
                  {t("My Wishlist")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/mybooking">
                  <MdEventNote style={{ marginRight: "8px" }} />
                  {t("My Bookings")}
                  {bookingCount > 0 && (
                    <span className="badge bg-primary ms-2">{bookingCount}</span>
                  )}
                </Link>
              </li>
              <li onClick={handleLogout}>
                <button className="dropdown-item logout">
                  <FiLogOut style={{ marginRight: "8px" }} />
                  {t("Logout")}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="dropdown-item" to="/register">
                  <FaUserPlus style={{ marginRight: "8px" }} />
                  {t("Register")}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/login">
                  <FiLogIn style={{ marginRight: "8px" }} />
                  {t("Login")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* 🌗 DARK/LIGHT TOGGLE */}
      <button
        onClick={toggleTheme}
        className={styles.iconLink}
        title="Toggle Theme"
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>

      {/* 🌐 LANGUAGE SELECTOR */}
      <div className={styles.langDropdown}>
        <button className={styles.langBtn}>
          🌐 {i18n.language.toUpperCase()}
        </button>
        <ul className={styles.langList}>
          <li onClick={() => i18n.changeLanguage("en")}>🇬🇧 English</li>
          <li onClick={() => i18n.changeLanguage("az")}>🇦🇿 Azərbaycan</li>
          <li onClick={() => i18n.changeLanguage("ru")}>🇷🇺 Русский</li>
        </ul>
      </div>
    </div>
  );
};

export default Wrapper;

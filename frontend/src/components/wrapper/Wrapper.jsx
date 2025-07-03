import React from "react";
import styles from "./Wrapper.module.css";
import { Link } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/features/userSlice";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useContext } from "react";
import { ThemeContext } from "../../context/darkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { clearWishlist } from "../../redux/features/wishlistSlice";
import { clearBookings } from "../../redux/features/bookingSlice";
import { useTranslation } from "react-i18next";

const Wrapper = () => {
  const baseUrl = "http://localhost:5000/auth";
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    dispatch(setUser(null));
    dispatch(clearWishlist());
    dispatch(clearBookings());
    const res = await axios.get(`${baseUrl}/logout`, { withCredentials: true });

    if (res.status === 200) {
      alert("Logout successful");
    } else {
      alert("Logout failed");
    }
  };

  const { dark, toggleTheme } = useContext(ThemeContext);
  const { bookings } = useSelector((state) => state.booking);
  const bookingCount = bookings.length;

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

        <ul className="dropdown-menu">
          {user ? (
            <li onClick={handleLogout}>
              <Link className="dropdown-item logout " to="/">
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link className="dropdown-item register" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="dropdown-item login" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <Link to="/wishlist" className={styles.iconLink} title="Wishlist">
        <FaRegHeart size={21} />
      </Link>

      <Link
        to="/mybooking"
        className={styles.iconLink}
        title="Booking"
        style={{ marginLeft: "15px", position: "relative" }}
      >
        <EventAvailableIcon size={21} />
        {bookingCount > 0 && <sup className={styles.sup}>{bookingCount}</sup>}
      </Link>

      <button
        onClick={toggleTheme}
        className={styles.iconLink}
        title="Toggle Theme"
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>
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

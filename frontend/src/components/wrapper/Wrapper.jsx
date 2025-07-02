import React from "react";
import styles from "./Wrapper.module.css";
import { Link } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/features/userSlice";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useContext } from "react";
import { ThemeContext } from "../../context/darkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { clearWishlist } from "../../redux/features/wishlistSlice";

const Wrapper = () => {
  const baseUrl = "http://localhost:5000/auth";
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setUser(null));
    dispatch(clearWishlist());
    const res = await axios.get(`${baseUrl}/logout`, { withCredentials: true });

    if (res.status === 200) {
      alert("Logout successful");
    } else {
      alert("Logout failed");
    }
  };

  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.wrapper}>
      <div className="dropdown">
        <button className="btn" type="button" data-bs-toggle="dropdown">
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

      <Link to="/mybooking" className={styles.iconLink} title="Basket" style={{ marginLeft: '15px' }}>
        <EventAvailableIcon size={21} />
      </Link>
      <button onClick={toggleTheme} className={styles.iconLink} title="Toggle Theme">
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Wrapper;
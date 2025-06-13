import React from "react";
import styles from "./Wrapper.module.css"
import { Link } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <div className="dropdown">
        <button
          className="btn"
          type="button"
          data-bs-toggle="dropdown"
        >
          <i className="fa-solid fa-user"></i>
          <IoPersonOutline  size={21}/>
        </button>
        <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item logout " to="/">
                Logout
              </Link>
            </li>
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
        </ul>
      </div>
      <Link to="/wishlist"><FaRegHeart size={21}/></Link>
    </div>
  );
};

export default Wrapper;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/userSlice"; // Logout action
import styles from "./AccountPage.module.css"; // CSS modul varsa
import { FaSignOutAlt } from "react-icons/fa";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser); // Redux-da currentUser

  const handleLogout = () => {
    dispatch(logoutUser()); // Redux-dan istifadəçini sil
    localStorage.removeItem("user"); // localStorage-dan da sil
    navigate("/login");
  };

  if (!user) {
    return <p>Hesab tapılmadı. Zəhmət olmasa <a href="/login">giriş edin</a>.</p>;
  }

  return (
    <div className={styles.accountContainer}>
      <h2>Hesabım</h2>
      <div className={styles.infoCard}>
        <p><strong>Ad:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Əgər varsa əlavə məlumatlar */}
        <p><strong>Rol:</strong> {user.role || "İstifadəçi"}</p>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        <FaSignOutAlt /> Çıxış et
      </button>
    </div>
  );
};

export default AccountPage;

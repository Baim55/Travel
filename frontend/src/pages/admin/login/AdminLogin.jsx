import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/features/userSlice";
import { setAdmin } from "../../../redux/features/adminSlice";
import styles from "./AdminLogin.module.css";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials
      );
      const admin = res.data;

      localStorage.setItem("adminId", admin._id);
      dispatch(setAdmin(admin));
      dispatch(logoutUser());
      localStorage.removeItem("persist:user");
      toast.success("Admin login successfuly!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login uğursuz oldu");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Admin Login</h3>

          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className={styles.input}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

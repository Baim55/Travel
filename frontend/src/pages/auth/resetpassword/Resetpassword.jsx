import React from "react";
import { useFormik } from "formik";
import { resetschema } from "../../../schema/ResetSchema";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../login/Login.module.css";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = `http://localhost:5000/auth`;
  const token = new URLSearchParams(location.search).get("token");

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/resetpassword?token=${token}`, {
        password: values.password,
      });
      if (res.status === 200) {
        toast.success("Password reset successfully");
        actions.resetForm();
        navigate("/login");
      }
    } catch (error) {
      alert("Password reset failed");
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: submitForm,
    validationSchema: resetschema,
  });

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Reset Password</h3>

          <div className={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder="Enter new password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              className={styles.input}
              placeholder="Confirm new password"
              onChange={handleChange}
              value={values.confirmpassword}
            />
            {errors.confirmpassword && (
              <div className={styles.error}>{errors.confirmpassword}</div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

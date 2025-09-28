import React from "react";
import { useFormik } from "formik";
import { forgotschema } from "../../../schema/ForgotSchema";
import axios from "axios";
import styles from "../login/Login.module.css"; 
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const baseUrl = `http://localhost:5000/auth`;

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/forgotpassword`, values);
      if (res.status === 200) {
        toast.success("Check your email to reset your password");
        actions.resetForm();
      }
    } catch (error) {
      alert("Failed to send reset email");
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: { email: "" },
    onSubmit: submitForm,
    validationSchema: forgotschema,
  });

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="Enter your email"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

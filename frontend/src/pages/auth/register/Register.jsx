import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerschema } from "../../../schema/registerSchema";
import styles from "./Register.module.css"; // Module CSS import
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Register = () => {
  const baseUrl = "http://localhost:5000/auth";

  const submitForm = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      await axios
        .post(`${baseUrl}/register`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("SUCCESS:", res.data); // BURA ƏLAVƏ ET
          actions.resetForm();
        })
        .catch((error) => {
          console.error(
            "Registration failed:",
            error.response?.data || error.message
          );
          toast.error(error.response?.data?.message || error.message);
        });

      actions.resetForm();

      toast.success("Please check your email to verify your account.");
    } catch (error) {
      toast.error("Something went wrong during registration.");
    }
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } =
    useFormik({
      initialValues: {
        image: "",
        name: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      onSubmit: submitForm,
      validationSchema: registerschema,
    });

  return (
    <div className={styles.container}>
       <Helmet>
          <title>Register | NeoTravel</title>
        </Helmet>
      <div className={styles.register}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h3>Register</h3>

          <div className={styles.formGroup}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className={styles.input}
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              onChange={handleChange}
              value={values.name}
            />
            {errors.name && touched.name && (
              <div className={styles.error}>{errors.name}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
              onChange={handleChange}
              value={values.username}
            />
            {errors.username && touched.username && (
              <div className={styles.error}>{errors.username}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              className={styles.input}
              onChange={handleChange}
              value={values.confirmpassword}
            />
            {errors.confirmpassword && touched.confirmpassword && (
              <div className={styles.error}>{errors.confirmpassword}</div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>

          <div className={styles.loginLink}>
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

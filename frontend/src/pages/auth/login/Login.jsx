import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginschema } from "../../../schema/loginSchema";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Login = () => {
  const baseUrl = "http://localhost:5000/auth";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values, {
        withCredentials: true,
      });

      if (res.status === 200) {
        const user = res.data.existUser;
        localStorage.setItem("userId", user._id);
        localStorage.setItem("username", user.username);
        dispatch(setUser(res.data.existUser));
        toast.success("Login successful!");

        const from = location.state?.from?.pathname || "/";
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
      } else {
        toast.error("Login failed, please try again.");
      }

      actions.resetForm();
    } catch (error) {
      toast.error("Login failed, please try again.");
    }
  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: loginschema,
  });

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Login | NeoTravel</title>
      </Helmet>
      <div className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Login</h3>
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

          <div className={styles.forgot}>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>

          <button type="submit" className={styles.button}>
            Sign In
          </button>

          <div className={styles.register}>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

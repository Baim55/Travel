import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className={styles.container}>
         <Helmet>
                <title> Not Found | NeoTravel</title>
              </Helmet>
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={styles.backLink}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;

import React from "react";
import styles from "../../styles/Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <h1 className={styles.logo}>
            Orbit<span>.</span>
          </h1>
        </Link>
      </div>
    </>
  );
}

export default Logo;

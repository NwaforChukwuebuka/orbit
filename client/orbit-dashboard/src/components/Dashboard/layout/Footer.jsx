// src/components/Layout/Footer.jsx
import React from "react";
import styles from "../../../styles/Layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} Orbit. All rights reserved.
    </footer>
  );
}

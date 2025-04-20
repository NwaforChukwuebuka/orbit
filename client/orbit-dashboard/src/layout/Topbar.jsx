// src/components/Layout/Topbar.jsx
import React from "react";
import styles from "../styles/Topbar.module.css";
import { FiBell } from "react-icons/fi";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <input
        type="text"
        placeholder="Search workspace, bookings..."
        className={styles.searchInput}
      />
      <div className={styles.actions}>
        <FiBell className={styles.icon} />
      </div>
    </div>
  );
}

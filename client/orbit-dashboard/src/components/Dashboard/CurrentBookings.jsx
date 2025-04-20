// src/components/Dashboard/CurrentBookings.jsx
import React from "react";
import styles from "../../styles/CurrentBookings.module.css";

export default function CurrentBookings() {
  return (
    <div className={styles.bookingBox}>
      <h4 className={styles.boxTitle}>Current Bookings</h4>
      <ul className={styles.bookingList}>
        <li>
          <strong>Desk #15</strong> — April 24, 2024, 1:00 PM
        </li>
        <li>
          <strong>Meeting Room B</strong> — April 25, 2024, 11:30 AM
        </li>
      </ul>
    </div>
  );
}

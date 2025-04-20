// src/components/Dashboard/BookingStreak.jsx
import React from "react";
import styles from "../../styles/BookingStreak.module.css";

export default function BookingStreak() {
  return (
    <div className={styles.streakBox}>
      <h4 className={styles.boxTitle}>Booking Streak</h4>
      <div className={styles.streakBadge}>🔥 3-Day Streak</div>
      <p className={styles.subText}>Keep booking to earn rewards!</p>
    </div>
  );
}

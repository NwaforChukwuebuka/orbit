import React from "react";
import styles from "../../../styles/BookingStreak.module.css";
import { FaTrophy } from "react-icons/fa";

function BookingStreak() {
  return (
    <div className={styles.streakCard}>
      <h3>Booking Streak</h3>
      <div className={styles.streakContent}>
        <div className={styles.trophy}>
          <FaTrophy />
        </div>
        <h4>3-Day Streak</h4>
        <p>Keep booking works-pace to continue your streak!</p>
      </div>
    </div>
  );
}

export default BookingStreak;

import React from "react";
import styles from "../../styles/UpcomingBooking.module.css";
import { FaCalendarAlt } from "react-icons/fa";

function UpcomingBooking() {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <FaCalendarAlt />
      </div>
      <div className={styles.content}>
        <h3>Upcoming Booking</h3>
        <h4>Meeting Room A</h4>
        <p>April 25, 2024</p>
        <p>10:00 AM - 11:AM</p>
      </div>
    </div>
  );
}

export default UpcomingBooking;

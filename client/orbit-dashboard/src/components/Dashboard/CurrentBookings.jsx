import React from "react";
import styles from "../../styles/CurrentBookings.module.css";

function CurrentBookings() {
  return (
    <div className={styles.bookingsCard}>
      <h3>Current Bookings</h3>
      <div className={styles.bookingList}>
        <div className={styles.bookingItem}>
          <div className={styles.bookingInfo}>
            <h4>Desk #15</h4>
            <p>
              April 24, 2024 <span className={styles.time}>1:0 PM</span>
            </p>
          </div>
        </div>
        <div className={styles.bookingItem}>
          <div className={styles.bookingInfo}>
            <h4>Meeting Room B</h4>
            <p>
              April 25, 2024 <span className={styles.time}>11:30 PM</span>
            </p>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.editBtn}>Edit</button>
          <button className={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentBookings;

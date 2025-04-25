import React from "react";
import styles from "../../../styles/BookingForm.module.css";

export default function BookingForm() {
  return (
    <div className={styles.bookingForm}>
      <h4 className={styles.formTitle}>Book a Workspace</h4>
      <form className={styles.formGrid}>
        <input type="date" className={styles.input} />

        <select className={styles.input}>
          <option value="">Select Workspace</option>
          <option value="desk">Desk</option>
          <option value="room-a">Meeting Room A</option>
          <option value="room-b">Meeting Room B</option>
        </select>

        <input type="time" className={styles.input} />
        <input type="time" className={styles.input} />

        <button type="submit" className={styles.submitBtn}>
          Book
        </button>
      </form>
    </div>
  );
}

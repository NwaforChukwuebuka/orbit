// src/pages/Bookings.jsx
import React from "react";
import styles from "../styles/Bookings.module.css";

export default function Bookings() {
  const upcoming = [
    {
      id: 1,
      space: "Desk #12",
      date: "April 25, 2024",
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: 2,
      space: "Meeting Room A",
      date: "April 26, 2024",
      time: "1:00 PM - 2:00 PM",
    },
  ];

  const past = [
    {
      id: 3,
      space: "Desk #5",
      date: "April 20, 2024",
      time: "9:00 AM - 11:00 AM",
    },
    {
      id: 4,
      space: "Room B",
      date: "April 18, 2024",
      time: "3:00 PM - 4:00 PM",
    },
  ];

  return (
    <div className={styles.bookingsPage}>
      <h2 className={styles.heading}>Your Bookings</h2>

      <section className={styles.section}>
        <h3 className={styles.subheading}>Upcoming</h3>
        <ul className={styles.bookingList}>
          {upcoming.map((b) => (
            <li key={b.id} className={styles.card}>
              <strong>{b.space}</strong>
              <span>{b.date}</span>
              <span>{b.time}</span>
              <button className={styles.cancelBtn}>Cancel</button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subheading}>Past</h3>
        <ul className={styles.bookingList}>
          {past.map((b) => (
            <li key={b.id} className={styles.card}>
              <strong>{b.space}</strong>
              <span>{b.date}</span>
              <span>{b.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

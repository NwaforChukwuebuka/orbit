// src/components/Dashboard/Calendar.jsx
import React from "react";
import styles from "../../styles/Calendar.module.css";

export default function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const sampleDates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className={styles.calendarBox}>
      <h4 className={styles.boxTitle}>Calendar</h4>

      <div className={styles.calendarGrid}>
        {days.map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}

        {sampleDates.map((date) => (
          <div key={date} className={styles.dayCell}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}

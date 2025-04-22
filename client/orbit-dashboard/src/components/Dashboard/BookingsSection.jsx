import React from "react";
import styles from "../../styles/BookingsSection.module.css";
import BookingsCalendar from "./BookingsCalendar";
import CurrentBookings from "./CurrentBookings";
import BookingStreak from "./BookingStreak";

function BookingsSection() {
  return (
    <div className={styles.bookingsSection}>
      <h2>Your Bookings</h2>
      <div className={styles.bookingCards}>
        <BookingsCalendar />
        <CurrentBookings />
        <BookingStreak />
      </div>
    </div>
  );
}

export default BookingsSection;

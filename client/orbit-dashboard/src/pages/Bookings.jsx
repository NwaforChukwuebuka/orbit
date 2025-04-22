// pages/bookings.js
import React from "react";
import BookingCalendar from "../components/Dashboard/BookingsCalendar";
import CurrentBookings from "../components/Dashboard/CurrentBookings";
import BookWorkspace from "../components/Dashboard/BookWorkspace";
import styles from "../styles/Bookings.module.css";

const Bookings = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Your Bookings</h1>
      </div>

      <div className={styles.bookingsLayout}>
        <div className={styles.calendarSection}>
          <BookingCalendar />
        </div>

        <div className={styles.bookingsSection}>
          <CurrentBookings />
        </div>
      </div>

      <div className={styles.bookWorkspaceSection}>
        <BookWorkspace />
      </div>
    </>
  );
};

export default Bookings;

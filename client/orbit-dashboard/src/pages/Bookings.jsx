// pages/bookings.js
import React from "react";
import Layout from "../components/Layout/Layout";
import BookingCalendar from "../components/BookingCalendar/BookingCalendar";
import CurrentBookings from "../components/CurrentBookings/CurrentBookings";
import BookWorkspace from "../components/BookWorkspace/BookWorkspace";
import styles from "../styles/pages/Bookings.module.css";

const Bookings = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Bookings;

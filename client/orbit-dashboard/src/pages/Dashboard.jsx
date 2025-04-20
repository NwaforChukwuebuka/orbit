import React from "react";
import SummaryCard from "../components/Dashboard/SummaryCard";
import CurrentBookings from "../components/Dashboard/CurrentBookings";
import BookingStreak from "../components/Dashboard/BookingStreak";
import BookingForm from "../components/Dashboard/BookingForm";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>Welcome back 👋</h2>

      {/* Top Summary Cards */}
      <div className={styles.cardsGrid}>
        <SummaryCard
          icon="desk"
          label="Workspace Usage"
          value="45%"
          sub="Occupancy Rate"
        />
        <SummaryCard
          icon="calendar"
          label="Upcoming Booking"
          value="Meeting Room A"
          sub="April 25, 2024 | 10:00 AM - 11:00 AM"
        />
        <SummaryCard
          icon="swap"
          label="Seat Swap Requests"
          value=""
          sub="No active requests"
        />
      </div>

      {/* Bookings & Streak */}
      <div className={styles.bookingSection}>
        <CurrentBookings />
        <BookingStreak />
      </div>

      {/* Booking Form */}
      <BookingForm />
    </div>
  );
}

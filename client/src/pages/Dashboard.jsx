import React from "react";
import styles from "../styles/Dashboard.module.css";
import DashboardTitle from "../components/Dashboard/DashboardTitle";
import StatCards from "../components/Dashboard/StatCards";
import BookingsSection from "../components/Dashboard/Bookings/BookingsSection";
import BookWorkspace from "../components/Dashboard/Bookings/BookWorkspace";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <DashboardTitle />
      <StatCards />
      <BookingsSection />
      <BookWorkspace />
    </div>
  );
}

export default Dashboard;

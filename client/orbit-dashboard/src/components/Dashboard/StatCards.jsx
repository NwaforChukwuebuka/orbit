import React from "react";
import styles from "../../styles/StatCards.module.css";
import WorkspaceUsage from "./Bookings/WorkspaceUsage";
import UpcomingBooking from "./Bookings/UpcomingBooking";
import SeatSwapRequests from "./Swaps/SeatSwapRequests";

function StatCards() {
  return (
    <div className={styles.statCards}>
      <WorkspaceUsage />
      <UpcomingBooking />
      <SeatSwapRequests />
    </div>
  );
}

export default StatCards;

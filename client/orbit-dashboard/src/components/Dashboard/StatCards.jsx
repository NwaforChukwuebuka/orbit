import React from "react";
import styles from "../../styles/StatCards.module.css";
import WorkspaceUsage from "./WorkspaceUsage";
import UpcomingBooking from "./UpcomingBooking";
import SeatSwapRequests from "./SeatSwapRequests";

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

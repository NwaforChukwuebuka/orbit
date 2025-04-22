import React from "react";
import styles from "../../styles/SeatSwapRequests.module.css";
import { FaSync } from "react-icons/fa";

function SeatSwapRequests() {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <FaSync />
      </div>
      <div className={styles.content}>
        <h3>Seat Swap Requests</h3>
        <p>No active requests</p>
      </div>
    </div>
  );
}

export default SeatSwapRequests;

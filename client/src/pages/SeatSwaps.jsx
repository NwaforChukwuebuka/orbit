import React from "react";
import SwapRequests from "../components/Dashboard/Swaps/SwapRequests";
import CreateSwapRequest from "../components/Dashboard/Swaps/CreateSwapRequest";
import SwapHistory from "../components/Dashboard/Swaps/SwapHistory";
import styles from "../styles/SeatSwaps.module.css";

const SeatSwaps = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Seat Swaps</h1>
      </div>

      <div className={styles.swapsLayout}>
        <div className={styles.requestsSection}>
          <SwapRequests />
        </div>

        <div className={styles.createSection}>
          <CreateSwapRequest />
        </div>
      </div>

      <div className={styles.historySection}>
        <SwapHistory />
      </div>
    </>
  );
};

export default SeatSwaps;

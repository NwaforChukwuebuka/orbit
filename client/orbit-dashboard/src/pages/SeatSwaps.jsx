// pages/seat-swaps.js
import React from "react";
import Layout from "../components/Layout/Layout";
import SwapRequests from "../components/SwapRequests/SwapRequests";
import CreateSwapRequest from "../components/CreateSwapRequest/CreateSwapRequest";
import SwapHistory from "../components/SwapHistory/SwapHistory";
import styles from "../styles/pages/SeatSwaps.module.css";

const SeatSwaps = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default SeatSwaps;

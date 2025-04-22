import React from "react";
import styles from "../../styles/WorkspaceUsage.module.css";
import { FaBed } from "react-icons/fa";

function WorkspaceUsage() {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <FaBed />
      </div>
      <div className={styles.content}>
        <h3>Workspace Usage</h3>
        <div className={styles.rate}>
          <span className={styles.percentage}>45%</span>
          <span className={styles.label}>Occupancy Rate</span>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceUsage;

import React from "react";
import styles from "../../../styles/BookWorkspace.module.css";
import { FaChevronDown } from "react-icons/fa";

function BookWorkspace() {
  return (
    <div className={styles.bookWorkspace}>
      <h2>Book a Workspace</h2>
      <div className={styles.bookingForm}>
        <div className={styles.formGroup}>
          <div className={styles.dateInput}>
            <input type="text" value="April 25, 2024" readOnly />
            <FaChevronDown className={styles.inputIcon} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.workspaceInput}>
            <input type="text" value="Select Workspace" readOnly />
            <FaChevronDown className={styles.inputIcon} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.timeInput}>
            <input type="text" value="9:00 AM" readOnly />
            <span className={styles.timeSeparator}>–</span>
            <input type="text" value="11:00 AM" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookWorkspace;

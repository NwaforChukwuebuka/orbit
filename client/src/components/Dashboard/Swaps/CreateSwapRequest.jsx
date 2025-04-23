// components/CreateSwapRequest/CreateSwapRequest.js
import React, { useState } from "react";
import { FaExchangeAlt, FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import styles from "../../../styles/CreateSwapRequest.module.css";

const CreateSwapRequest = () => {
  const [currentDesk, setCurrentDesk] = useState("Desk #23");
  const [targetDesk, setTargetDesk] = useState("Select desk");
  const [date, setDate] = useState("April 26, 2024");

  return (
    <div className={styles.createSwapContainer}>
      <div className={styles.header}>
        <FaExchangeAlt className={styles.headerIcon} />
        <h2>Create Swap Request</h2>
      </div>

      <div className={styles.swapForm}>
        <div className={styles.formGroup}>
          <label>Your Current Desk</label>
          <div className={styles.selectInput}>
            <select
              value={currentDesk}
              onChange={(e) => setCurrentDesk(e.target.value)}
              className={styles.select}
            >
              <option value="Desk #23">Desk #23</option>
              <option value="Desk #24">Desk #24</option>
              <option value="Desk #25">Desk #25</option>
            </select>
            <FaChevronDown className={styles.selectIcon} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Desk You Want</label>
          <div className={styles.selectInput}>
            <select
              value={targetDesk}
              onChange={(e) => setTargetDesk(e.target.value)}
              className={styles.select}
            >
              <option value="Select desk">Select desk</option>
              <option value="Desk #15">Desk #15</option>
              <option value="Desk #16">Desk #16</option>
              <option value="Desk #17">Desk #17</option>
            </select>
            <FaChevronDown className={styles.selectIcon} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Date</label>
          <div className={styles.dateInput}>
            <FaCalendarAlt className={styles.calendarIcon} />
            <input type="text" value={date} readOnly className={styles.input} />
          </div>
        </div>

        <button className={styles.createButton}>Create Request</button>
      </div>
    </div>
  );
};

export default CreateSwapRequest;

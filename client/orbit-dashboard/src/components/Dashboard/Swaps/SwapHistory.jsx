import React from "react";
import { FaHistory, FaCheck, FaTimes } from "react-icons/fa";
import styles from "../../../styles/SwapHistory.module.css";

const SwapHistory = () => {
  const history = [
    {
      id: 1,
      user: "Emma Thompson",
      fromDesk: "Desk #18",
      toDesk: "Desk #32",
      date: "April 15, 2024",
      status: "approved",
    },
    {
      id: 2,
      user: "Michael Chen",
      fromDesk: "Desk #24",
      toDesk: "Desk #10",
      date: "April 12, 2024",
      status: "declined",
    },
    {
      id: 3,
      user: "Sarah Johnson",
      fromDesk: "Desk #05",
      toDesk: "Desk #27",
      date: "April 10, 2024",
      status: "approved",
    },
  ];

  return (
    <div className={styles.historyContainer}>
      <div className={styles.header}>
        <FaHistory className={styles.headerIcon} />
        <h2>Swap History</h2>
      </div>

      <div className={styles.historyTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>User</div>
          <div className={styles.headerCell}>From</div>
          <div className={styles.headerCell}>To</div>
          <div className={styles.headerCell}>Date</div>
          <div className={styles.headerCell}>Status</div>
        </div>

        <div className={styles.tableBody}>
          {history.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              <div className={styles.cell}>
                <div className={styles.userInfo}>
                  <div className={styles.userAvatar}>{item.user.charAt(0)}</div>
                  <span className={styles.userName}>{item.user}</span>
                </div>
              </div>
              <div className={styles.cell}>{item.fromDesk}</div>
              <div className={styles.cell}>{item.toDesk}</div>
              <div className={styles.cell}>{item.date}</div>
              <div className={styles.cell}>
                <span
                  className={`${styles.statusBadge} ${styles[item.status]}`}
                >
                  {item.status === "approved" ? (
                    <>
                      <FaCheck className={styles.statusIcon} /> Approved
                    </>
                  ) : (
                    <>
                      <FaTimes className={styles.statusIcon} /> Declined
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwapHistory;

import React from "react";
import { FaSync, FaCheck, FaTimes } from "react-icons/fa";
import styles from "../../../styles/SwapRequests.module.css";

const SwapRequests = () => {
  // Sample swap requests data
  const requests = [
    {
      id: 1,
      requester: "Emma Thompson",
      currentDesk: "Desk #23",
      requestedDesk: "Desk #15",
      date: "April 26, 2024",
      status: "pending",
    },
    {
      id: 2,
      requester: "Michael Chen",
      currentDesk: "Desk #18",
      requestedDesk: "Desk #32",
      date: "April 27, 2024",
      status: "pending",
    },
  ];

  return (
    <div className={styles.swapRequestsContainer}>
      <div className={styles.header}>
        <FaSync className={styles.headerIcon} />
        <h2>Seat Swap Requests</h2>
      </div>

      {requests.length > 0 ? (
        <div className={styles.requestsList}>
          {requests.map((request) => (
            <div key={request.id} className={styles.requestItem}>
              <div className={styles.requestInfo}>
                <div className={styles.userInfo}>
                  <div className={styles.userAvatar}>
                    {request.requester.charAt(0)}
                  </div>
                  <span className={styles.userName}>{request.requester}</span>
                </div>
                <div className={styles.requestDetails}>
                  <div className={styles.deskInfo}>
                    <span>{request.currentDesk}</span>
                    <span className={styles.swapArrow}>→</span>
                    <span>{request.requestedDesk}</span>
                  </div>
                  <div className={styles.requestDate}>{request.date}</div>
                </div>
              </div>
              <div className={styles.requestActions}>
                <button className={styles.acceptButton}>
                  <FaCheck />
                </button>
                <button className={styles.declineButton}>
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noRequests}>
          <div className={styles.emptyIcon}>
            <FaSync />
          </div>
          <p>No active swap requests</p>
        </div>
      )}
    </div>
  );
};

export default SwapRequests;

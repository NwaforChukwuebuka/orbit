import React from "react";
import styles from "../../../styles/Sidebar.module.css";
import { Link } from "react-router-dom";
import {
  FaThLarge,
  FaCalendarAlt,
  FaExchangeAlt,
  FaChartBar,
  FaUser,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="18" fill="white" />
              <path
                d="M18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z"
                fill="#0052CC"
              />
              <path
                d="M22 14C22 16.2091 20.2091 18 18 18C15.7909 18 14 16.2091 14 14C14 11.7909 15.7909 10 18 10C20.2091 10 22 11.7909 22 14Z"
                fill="#00A3BF"
              />
              <path
                d="M26 22C26 24.2091 24.2091 26 22 26C19.7909 26 18 24.2091 18 22C18 19.7909 19.7909 18 22 18C24.2091 18 26 19.7909 26 22Z"
                fill="#6554C0"
              />
            </svg>
          </div>
          <h1>Orbit</h1>
        </div>
        <button className={styles.closeButton} onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <hr />
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <FaThLarge />
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <FaCalendarAlt />
            <Link to="/bookings">
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <FaExchangeAlt />
            <Link to="/seat-swaps">
              <span>Seat Swaps</span>
            </Link>
          </li>
          <li>
            <FaChartBar />
            <span>Analytics</span>
          </li>
        </ul>
      </nav>
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <FaUser />
        </div>
        <span>Administrator</span>
      </div>
    </div>
  );
}

export default Sidebar;

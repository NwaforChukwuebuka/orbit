import React, { useState, useEffect } from "react";
import styles from "../../../styles/Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaCalendarAlt,
  FaExchangeAlt,
  FaChartBar,
  FaUser,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    // Update active path when location changes
    setActivePath(location.pathname);
  }, [location]);

  const isActive = (path) => {
    return activePath === path;
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <Link to="/" className={styles.logo}>
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
        </Link>

        <button className={styles.closeButton} onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li className={isActive("/dashboard") ? styles.active : ""}>
            <Link to="/dashboard" className={styles.navLink}>
              <span className={styles.icon}>
                <FaThLarge />
              </span>
              <span className={styles.navigationText}>Dashboard</span>
            </Link>
          </li>
          <li className={isActive("/bookings") ? styles.active : ""}>
            <Link to="/bookings" className={styles.navLink}>
              <span className={styles.icon}>
                <FaCalendarAlt />
              </span>
              <span className={styles.navigationText}>Bookings</span>
            </Link>
          </li>
          <li className={isActive("/seat-swaps") ? styles.active : ""}>
            <Link to="/seat-swaps" className={styles.navLink}>
              <span className={styles.icon}>
                <FaExchangeAlt />
              </span>
              <span className={styles.navigationText}>Seat Swaps</span>
            </Link>
          </li>
          <li className={isActive("/analytics") ? styles.active : ""}>
            <Link to="/analytics" className={styles.navLink}>
              <span className={styles.icon}>
                <FaChartBar />
              </span>
              <span className={styles.navigationText}>Analytics</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <FaUser />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>John Doe</div>
          <div className={styles.userRole}>Administrator</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

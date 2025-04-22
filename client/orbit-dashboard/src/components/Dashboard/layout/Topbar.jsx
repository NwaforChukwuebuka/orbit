import React from "react";
import styles from "../../../styles/Topbar.module.css";
import { FaSearch, FaBell, FaBars } from "react-icons/fa";

function Topbar({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.menuToggle} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className={styles.search}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={styles.headerRight}>
        <button className={styles.notificationBtn}>
          <FaBell />
        </button>
        <div className={styles.userAvatar}>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;

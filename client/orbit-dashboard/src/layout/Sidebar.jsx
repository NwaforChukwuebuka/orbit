// src/components/Layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { FiHome, FiCalendar, FiRepeat } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.logo}>WorkNexus</h1>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FiHome className={styles.icon} /> Dashboard
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FiCalendar className={styles.icon} /> Bookings
        </NavLink>
        <NavLink
          to="/swaps"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FiRepeat className={styles.icon} /> Seat Swaps
        </NavLink>
      </nav>
    </aside>
  );
}

import React from "react";
import styles from "../../styles/AdminCard.module.css";
import {
  Users,
  Building2,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";

const iconMap = {
  "Total Users": <Users size={22} className={styles.icon} />,
  "Active Venues": <Building2 size={22} className={styles.icon} />,
  Bookings: <CalendarCheck size={22} className={styles.icon} />,
  Workstations: <MonitorSmartphone size={22} className={styles.icon} />,
};

const colorMap = {
  blue: "#2563eb",
  green: "#16a34a",
  purple: "#7c3aed",
  orange: "#ea580c",
};

export default function AdminCard({ label, value, color }) {
  return (
    <div className={styles.card} style={{ borderColor: colorMap[color] }}>
      <div className={styles.header}>
        <span>{iconMap[label]}</span>
        <p className={styles.label}>{label}</p>
      </div>
      <h3 className={styles.value} style={{ color: colorMap[color] }}>
        {value}
      </h3>
    </div>
  );
}

// import React from "react";
// import styles from "../../styles/SummaryCard.module.css";
// import { FiMonitor, FiCalendar, FiRepeat } from "react-icons/fi";

// const iconMap = {
//   desk: <FiMonitor />,
//   calendar: <FiCalendar />,
//   swap: <FiRepeat />,
// };

// export default function SummaryCard({ icon, label, value, sub }) {
//   const selectedIcon = iconMap[icon] || <FiMonitor />;

//   return (
//     <div className={styles.card}>
//       <div className={styles.icon}>{selectedIcon}</div>
//       <div>
//         <p className={styles.label}>{label}</p>
//         {value && <h3 className={styles.value}>{value}</h3>}
//         {sub && <p className={styles.sub}>{sub}</p>}
//       </div>
//     </div>
//   );
// }

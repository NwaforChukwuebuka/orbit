import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "../../../styles/App.module.css";

const Layout = ({ children, sidebarOpen, toggleSidebar }) => {
  return (
    <div className={styles.app}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.mainContent}>
        <Topbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;

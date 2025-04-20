import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styles from "../styles/Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}

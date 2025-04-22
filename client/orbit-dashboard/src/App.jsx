import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles/App.module.css";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import SeatSwaps from "./pages/SeatSwaps";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={styles.mainContent}>
          <Topbar toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/seat-swaps" element={<SeatSwaps />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

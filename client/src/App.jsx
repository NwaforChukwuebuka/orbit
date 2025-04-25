import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Dashboard/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import SeatSwaps from "./pages/SeatSwaps";
import Homepage from "./pages/Homepage";
import AdminRegistration from "./components/Auth/AdminRegistration";
import LoginForm from "./components/Auth/LoginForm";
import { PasswordResetRequest } from "./components/Auth/PasswordReset";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Homepage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/bookings"
          element={
            <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
              <Bookings />
            </Layout>
          }
        />
        <Route
          path="/seat-swaps"
          element={
            <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
              <SeatSwaps />
            </Layout>
          }
        />
        <Route path="/register" element={<AdminRegistration />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<PasswordResetRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

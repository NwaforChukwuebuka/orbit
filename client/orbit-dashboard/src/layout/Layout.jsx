import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;

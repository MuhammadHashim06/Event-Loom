import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../utilities/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
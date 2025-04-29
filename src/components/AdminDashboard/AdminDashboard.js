// In your AdminDashboard.js or main layout component
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "./AdminDashboard.css";
import SideBar from "./SideBar/SideBar";
import Dashboard from "./Dashboard/Dashboard";
import TabBar from "../../components/TabBar/TabBar";
import { useTabs } from "../../context/TabBar/TabBarContext";
import UserDisplay from "./UserDisplay/UserDisplay";
import Users from "./Users/Users";

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const { tabs, getActiveTab } = useTabs();
  const activeTab = getActiveTab();
  const renderContent = () => {
    if (activeTab) {
      return <UserDisplay />;
    }
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            <div className="context">
              <Typography variant="h4">Welcome to Admin Dashboard!</Typography>
            </div>
            <div className="dashboard-container">
              <Dashboard />
            </div>
          </>
        );
      case "users":
        return (
          <>
            <div className="context">
              <Typography variant="h4">User Management</Typography>
            </div>
            <div className="users-container">
              <Users />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="admin-dashboard" sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideBar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main Content */}
      <Box
        className="main-content"
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* Desktop Header with Logo */}
        <Box className="desktop-header">
          <img src="/logo.svg" alt="Logo" className="logo" />
        </Box>

        {tabs.length > 0 && <TabBar />}

        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

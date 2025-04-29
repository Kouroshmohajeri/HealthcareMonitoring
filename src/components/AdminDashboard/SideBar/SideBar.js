import React, { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import { Dashboard, People, Logout, Menu } from "@mui/icons-material";
import "./SideBar.css";
import { useTabs } from "../../../context/TabBar/TabBarContext";

const SideBar = ({ activeNav, setActiveNav }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setActiveTab } = useTabs();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (navItem) => {
    setActiveTab(null);
    setActiveNav(navItem);
    setMobileOpen(false);
  };

  const drawerContent = (
    <>
      {/* Top Section */}
      <Box className="top-section">
        {/* User Info */}
        <Box className="user-info">
          <Avatar src="/user.jpg" alt="User" sx={{ width: 100, height: 100 }} />
          <Typography variant="h6" className="username">
            John Doe
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box className="nav-buttons">
          <Button
            fullWidth
            className={`nav-button ${
              activeNav === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleNavClick("dashboard")}
          >
            <Box className="button-content">
              <Box className="icon-container">
                <Dashboard fontSize="small" />
              </Box>
              <Typography className="text">Dashboard</Typography>
            </Box>
          </Button>

          <Button
            fullWidth
            className={`nav-button ${activeNav === "users" ? "active" : ""}`}
            onClick={() => handleNavClick("users")}
          >
            <Box className="button-content">
              <Box className="icon-container">
                <People fontSize="small" />
              </Box>
              <Typography className="text">Users</Typography>
            </Box>
          </Button>
        </Box>
      </Box>

      {/* Bottom Logout */}
      <Box className="logout-section">
        <Button startIcon={<Logout />} fullWidth className="logout-button">
          Logout
        </Button>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Header with Logo and Hamburger */}
      <Box
        className="mobile-header"
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Box className="logo-container">
          <img src="/logo.svg" alt="Logo" className="logo" />
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          className="mobile-menu-button"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <Menu sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Desktop Sidebar */}
      <Box className="sidebar desktop-sidebar">{drawerContent}</Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "80%",
            maxWidth: "300px",
            background: "white",
            paddingTop: "10px",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SideBar;

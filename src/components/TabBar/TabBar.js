import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTabs } from "../../context/TabBar/TabBarContext";
import CloseIcon from "@mui/icons-material/Close";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const TabBar = () => {
  const { tabs, closeTab, setActiveTab } = useTabs();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  // Mobile drawer
  const drawerContent = (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#f1f1f1",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {tabs.map((tab) => (
          <Box
            key={tab.id}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: tab.active ? "#6200ea" : "#e0e0e0",
              color: tab.active ? "#fff" : "#000",
              padding: "8px 16px",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: tab.active ? "#3700b3" : "#c8c8c8",
              },
            }}
            onClick={() => handleTabClick(tab.id)}
          >
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {tab.title}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              size="small"
              sx={{
                color: tab.active ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );

  // Desktop view
  if (!isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          padding: 1,
          backgroundColor: "#f1f1f1",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "3px",
          },
        }}
      >
        {tabs.map((tab) => (
          <Box
            key={tab.id}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: tab.active ? "#6200ea" : "#e0e0e0",
              color: tab.active ? "#fff" : "#000",
              padding: "6px 12px",
              borderRadius: 2,
              cursor: "pointer",
              flexShrink: 0,
              "&:hover": {
                backgroundColor: tab.active ? "#3700b3" : "#c8c8c8",
              },
            }}
            onClick={() => handleTabClick(tab.id)}
          >
            <Typography variant="body2">{tab.title}</Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              size="small"
              sx={{
                color: tab.active ? "#fff" : "#000",
                marginLeft: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    );
  }

  // Mobile view
  return (
    <>
      {/* Tab indicator at bottom of screen */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#6200ea",
          color: "#fff",
          textAlign: "center",
          py: 1,
          zIndex: theme.zIndex.drawer + 1,
          cursor: "pointer",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        }}
        onClick={toggleDrawer(true)}
      >
        <Typography variant="body2">
          {tabs.length} {tabs.length === 1 ? "Tab" : "Tabs"} Open
        </Typography>
      </Box>

      {/* Swipeable drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "60vh",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        {drawerContent}
      </SwipeableDrawer>
    </>
  );
};

export default TabBar;

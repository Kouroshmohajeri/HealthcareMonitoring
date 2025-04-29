import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { getUserById } from "../../services/users/actions";
import { useTabs } from "../../context/TabBar/TabBarContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        p: 3,
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const UserInfo = () => {
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getActiveTab } = useTabs();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const user = getActiveTab();
  const userId = user?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserById(userId);
        setUserData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  useEffect(() => {
    if (userData) {
      document.title = `${userData.firstName} ${userData.lastName} - Intera`;
    } else {
      document.title = "Intera";
    }

    return () => {
      document.title = "Intera";
    };
  }, [userData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: isMobile ? "auto" : "calc(100vh - 112px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading user data: {error}</Typography>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No user selected</Typography>
      </Box>
    );
  }

  const tabData = {
    "Personal Data": {
      "First Name": userData.firstName,
      "Last Name": userData.lastName,
      "Maiden Name": userData.maidenName || "N/A",
      Age: userData.age,
      Gender: userData.gender,
      "Birth Date": userData.birthDate,
      Role: userData.role,
    },
    "Physical Attributes": {
      Height: `${userData.height} cm`,
      Weight: `${userData.weight} kg`,
      "Eye Color": userData.eyeColor,
      "Hair Color": userData.hair.color,
      "Hair Type": userData.hair.type,
      "Blood Group": userData.bloodGroup,
    },
    "Contact Information": {
      Email: userData.email,
      Phone: userData.phone,
      Address: `${userData.address.address}, ${userData.address.city}, ${userData.address.state} ${userData.address.postalCode}`,
      Country: userData.address.country,
    },
    "Financial Information": {
      Bank: `${userData.bank.cardType} (${userData.bank.cardNumber.slice(-4)})`,
      Currency: userData.bank.currency,
      IBAN: userData.bank.iban,
      EIN: userData.ein,
      "Crypto Wallet": `${userData.crypto.coin} (${userData.crypto.wallet.slice(
        0,
        6
      )}...${userData.crypto.wallet.slice(-4)})`,
    },
    Company: {
      University: userData.university,
      Company: userData.company.name,
      Department: userData.company.department,
      Title: userData.company.title,
      "Work Address": `${userData.company.address.address}, ${userData.company.address.city}, ${userData.company.address.state}`,
    },
    "Digital Information": {
      Username: userData.username,
      "IP Address": userData.ip,
      "MAC Address": userData.macAddress,
      "User Agent": userData.userAgent,
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: isMobile ? "auto" : "calc(100vh - 112px)",
        bgcolor: "background.default",
      }}
    >
      {/* Mobile: Horizontal scrollable tabs */}
      {isMobile && (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            overflow: "auto",
            mb: 2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Scrollable user info tabs"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "0.875rem",
                minWidth: "unset",
                px: 2,
              },
            }}
          >
            {Object.keys(tabData).map((tabName, index) => (
              <Tab
                key={tabName}
                label={tabName}
                {...a11yProps(index)}
                sx={{
                  "&.Mui-selected": {
                    fontWeight: "bold",
                  },
                }}
              />
            ))}
          </Tabs>
        </Paper>
      )}

      {/* Desktop: Vertical tabs */}
      {!isMobile && (
        <Paper
          elevation={3}
          sx={{
            width: "20%",
            borderRadius: 0,
            overflow: "auto",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="User information tabs"
            sx={{
              height: "100%",
              borderRight: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                alignItems: "flex-start",
                padding: "12px 24px",
                textTransform: "none",
                fontSize: "0.875rem",
              },
            }}
          >
            {Object.keys(tabData).map((tabName, index) => (
              <Tab
                key={tabName}
                label={tabName}
                {...a11yProps(index)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "action.selected",
                    fontWeight: "bold",
                  },
                }}
              />
            ))}
          </Tabs>
        </Paper>
      )}

      {/* Content Area */}
      <Box
        sx={{
          width: isMobile ? "100%" : "80%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {Object.entries(tabData).map(([tabName, data], index) => (
          <TabPanel key={tabName} value={value} index={index}>
            <Typography variant="h4" gutterBottom>
              {tabName}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 3,
                pb: 3,
              }}
            >
              {Object.entries(data).map(([key, value]) => (
                <Paper key={key} elevation={1} sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {key}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {value || "N/A"}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

UserInfo.propTypes = {
  currentDisplay: PropTypes.number,
};

export default UserInfo;

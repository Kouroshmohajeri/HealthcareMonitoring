import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import "./Dashboard.css";
import FastAccess from "../FastAccess/FastAccess";
import { getTotalAmount } from "../../../services/users/actions";

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const total = await getTotalAmount();
        setTotalMembers(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching total members:", error);
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, []);
  useEffect(() => {
    document.title = "Dashboard - Intera";
    return () => {
      document.title = "Intera";
    };
  }, []);

  return (
    <Box className="dashboard-container">
      {/* First Row */}
      <div className="first-row">
        <div className="grid-item">
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Last Login
              </Typography>
              <Typography variant="body2" className="card-content">
                April 27, 2025 - 14:00
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className="grid-item">
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Total Members
              </Typography>
              <Typography variant="body2" className="card-content">
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  `${totalMembers} members`
                )}
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className="grid-item">
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Recently Viewed
              </Typography>
              <Typography variant="body2" className="card-content">
                User Profiles, Settings
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second Row */}
      <div className="second-row">
        <FastAccess />
      </div>
    </Box>
  );
};

export default Dashboard;

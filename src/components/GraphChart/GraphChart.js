import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import { useTabs } from "../../context/TabBar/TabBarContext";
import { getSensorByUserId } from "../../services/sensors/actions";

const GraphChart = () => {
  const { getActiveTab } = useTabs();
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const activeTab = getActiveTab();

        if (!activeTab?.id) {
          throw new Error("No active user selected");
        }

        const data = await getSensorByUserId(activeTab.id);
        setSensorData(data);
      } catch (err) {
        console.error("Failed to fetch sensor data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getActiveTab]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <Typography>Loading sensor data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!sensorData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <Typography>No sensor data available</Typography>
      </Box>
    );
  }

  // Transform data for Recharts
  const chartData = sensorData.sensorData.timestamps.map(
    (timestamp, index) => ({
      timestamp: new Date(timestamp).toLocaleTimeString(),
      heartRate: sensorData.sensorData.vitalSigns.heartRate[index],
      systolicBP:
        sensorData.sensorData.vitalSigns.bloodPressure.systolic[index],
      diastolicBP:
        sensorData.sensorData.vitalSigns.bloodPressure.diastolic[index],
      oxygen: sensorData.sensorData.vitalSigns.oxygenSaturation[index],
      respiratoryRate: sensorData.sensorData.vitalSigns.respiratoryRate[index],
      temperature: sensorData.sensorData.vitalSigns.temperature[index],
    })
  );

  return (
    <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Patient Vital Signs
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Heart Rate Chart */}
        <Box sx={{ height: 300 }}>
          <Typography variant="subtitle1">Heart Rate (bpm)</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Blood Pressure Chart */}
        <Box sx={{ height: 300 }}>
          <Typography variant="subtitle1">Blood Pressure (mmHg)</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="systolicBP"
                stroke="#ff7300"
                name="Systolic"
              />
              <Line
                type="monotone"
                dataKey="diastolicBP"
                stroke="#387908"
                name="Diastolic"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Oxygen Saturation Chart */}
        <Box sx={{ height: 300 }}>
          <Typography variant="subtitle1">Oxygen Saturation (%)</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="oxygen" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default GraphChart;

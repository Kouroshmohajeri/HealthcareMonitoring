import API from "../server";

// Get all sensor data
export const getAllSensors = async () => {
  try {
    const response = await API.get(process.env.REACT_APP_SENSOR_URL);
    return response.data.sensors; // Assuming the response has a "sensors" array
  } catch (error) {
    console.error("Error fetching all sensors:", error);
    throw error;
  }
};

// Get sensor data by userId
export const getSensorByUserId = async (userId) => {
  try {
    const response = await API.get(process.env.REACT_APP_SENSOR_URL);
    console.log(process.env.REACT_APP_SENSOR_URL);
    const sensor = response.data.sensors.find((s) => s.userId === userId);
    console.log(sensor);
    if (!sensor) {
      throw new Error(`No sensor found for user ID ${userId}`);
    }
    return sensor;
  } catch (error) {
    console.error(`Error fetching sensor for user ${userId}:`, error);
    throw error;
  }
};

// Get sensor data by sensorId
export const getSensorBySensorId = async (sensorId) => {
  try {
    const response = await API.get(process.env.REACT_APP_SENSOR_URL);
    const sensor = response.data.sensors.find((s) => s.sensorId === sensorId);
    if (!sensor) {
      throw new Error(`No sensor found with ID ${sensorId}`);
    }
    return sensor;
  } catch (error) {
    console.error(`Error fetching sensor ${sensorId}:`, error);
    throw error;
  }
};

// Get total amount of sensors
export const getTotalSensors = async () => {
  try {
    const response = await API.get(process.env.REACT_APP_SENSOR_URL);
    return response.data.sensors.length;
  } catch (error) {
    console.error("Error fetching total sensors:", error);
    throw error;
  }
};

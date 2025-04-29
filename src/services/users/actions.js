import API from "../server";

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Get total amount of users
export const getTotalAmount = async () => {
  try {
    const response = await API.get("/users");
    return response.data.users.length;
  } catch (error) {
    console.error("Error fetching total amount:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

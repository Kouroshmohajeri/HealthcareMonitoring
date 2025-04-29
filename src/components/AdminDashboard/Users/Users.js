import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { getAllUsers } from "../../../services/users/actions";
import { useTabs } from "../../../context/TabBar/TabBarContext";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { addTab, setActiveTab } = useTabs();
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    document.title = "All Users - Intera";
    return () => {
      document.title = "Intera";
    };
  }, []);
  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  if (!users.length) {
    return <Typography>No users found.</Typography>;
  }
  const handleRowClick = (user) => {
    addTab({
      id: user.id,
      title: user.username,
      active: true,
    });
    setActiveTab(user.id);
  };
  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>User</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Bank</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover onClick={() => handleRowClick(user)}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{user.username}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography>{user.email}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {user.address.address}, {user.address.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.address.state}, {user.address.country}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{user.company.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.company.department}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {user.bank.cardType}: ****{user.bank.cardNumber.slice(-4)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Exp: {user.bank.cardExpire}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color:
                      user.role === "admin" ? "primary.main" : "text.primary",
                    fontWeight: user.role === "admin" ? "bold" : "normal",
                  }}
                >
                  {user.role}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;

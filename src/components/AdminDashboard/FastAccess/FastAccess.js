import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Autocomplete,
  TextField,
  CircularProgress,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers } from "../../../services/users/actions";
import { useTabs } from "../../../context/TabBar/TabBarContext";

const FastAccess = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [customColor, setCustomColor] = useState("#ffffff");
  const [selectedUser, setSelectedUser] = useState(null);
  const [fastAccessList, setFastAccessList] = useState([]);
  const [activeBox, setActiveBox] = useState(null);
  const { addTab, setActiveTab } = useTabs();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Color options
  const colorOptions = [
    "#003049", // dark blue
    "#fb6f92", // pink
    "#e4c1f9", // lavender
    "#ffd60a", // yellow
    "#92e6a7", // mint
    "#4cc9f0", // light blue
    "#ef233c", // red
    "#ff99c8", // light pink
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const savedFastAccessList = JSON.parse(
      localStorage.getItem("fastAccessList") || "[]"
    );
    setFastAccessList(savedFastAccessList);

    if (open) {
      fetchUsers();
    }
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBoxClick = (rowIndex, index) => {
    if (isMobile) {
      const clickedBox = `${rowIndex}-${index}`;
      setActiveBox(activeBox === clickedBox ? null : clickedBox);
    }
  };
  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 50) {
      setDescription(e.target.value);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleColorPickerOpen = (event) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
  };

  const handleCustomColorSelect = () => {
    if (customColor) {
      setSelectedColor(customColor);
    }
    handleColorPickerClose();
  };

  const handleSave = () => {
    const newItem = {
      selectedUserId: selectedUser.id || selectedUser._id,
      description: description || "",
      color: selectedColor,
      userName: `${selectedUser.firstName} ${selectedUser.lastName}`,
    };

    const newFastAccessList = [...fastAccessList, newItem];
    setFastAccessList(newFastAccessList);
    localStorage.setItem("fastAccessList", JSON.stringify(newFastAccessList));
    setSelectedUser(null);
    setDescription("");
    setSelectedColor("");
    handleClose();
  };

  const handleDelete = (index, rowIndex) => {
    const itemIndex = rowIndex * 6 + index;
    const newFastAccessList = fastAccessList.filter((_, i) => i !== itemIndex);
    setFastAccessList(newFastAccessList);
    localStorage.setItem("fastAccessList", JSON.stringify(newFastAccessList));
  };

  const groupedItems = [];
  for (let i = 0; i < fastAccessList.length; i += 6) {
    groupedItems.push(fastAccessList.slice(i, i + 6));
  }

  return (
    <Box className="fast-access-section">
      <Typography variant="h6" className="fast-access-title">
        Fast Access
      </Typography>

      {groupedItems.map((row, rowIndex) => (
        <Box key={rowIndex} display="flex" gap={2} mb={2} flexWrap="wrap">
          {row.map((item, index) => (
            <Box
              key={`${rowIndex}-${index}`}
              onClick={() => handleBoxClick(rowIndex, index)}
              sx={{
                width: 150,
                height: 150,
                backgroundColor: item.color,
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: 1,
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              {(!isMobile || activeBox === `${rowIndex}-${index}`) && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    opacity: isMobile ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Icons container */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(item.selectedUserId);
                        addTab({
                          id: item.selectedUserId,
                          title: item.userName,
                          active: true,
                        });
                      }}
                    >
                      <PersonIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#ff6b6b",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index, rowIndex);
                        setActiveBox(null);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}

              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: getContrastColor(item.color),
                  textAlign: "center",
                  px: 1,
                  zIndex: 1,
                }}
              >
                {item.userName}
              </Typography>
              {item.description && (
                <Typography
                  variant="caption"
                  sx={{
                    color: getContrastColor(item.color),
                    textAlign: "center",
                    px: 1,
                    mt: 1,
                    zIndex: 1,
                  }}
                >
                  {item.description}
                </Typography>
              )}
            </Box>
          ))}
          {/* Plus button at the end of the last row */}
          {rowIndex === groupedItems.length - 1 && row.length < 6 && (
            <Box
              className="fast-access-box"
              sx={{
                width: 150,
                height: 150,
              }}
            >
              <IconButton
                size="large"
                onClick={handleOpen}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}

      {/* Show plus button on new row if last row is full */}
      {(groupedItems.length === 0 ||
        groupedItems[groupedItems.length - 1].length === 6) && (
        <Box display="flex" gap={2} mb={2}>
          <Box
            className="fast-access-box"
            sx={{
              width: 150,
              height: 150,
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpen}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Option</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Autocomplete
                options={users}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                onChange={(e, newValue) => setSelectedUser(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select User"
                    variant="outlined"
                    required
                  />
                )}
                fullWidth
                disableClearable
              />

              <TextField
                label="Description (optional)"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={handleDescriptionChange}
                helperText={`${description.length}/50 characters`}
                margin="normal"
                inputProps={{ maxLength: 50 }}
              />

              <Typography variant="body1" gutterBottom mt={2}>
                Pick a Color:
              </Typography>

              <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                {colorOptions.map((color) => (
                  <Button
                    key={color}
                    aria-label={`Select color ${color}`}
                    sx={{
                      minWidth: 40,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border:
                        selectedColor === color ? "2px solid black" : "none",
                      padding: 0,
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
                <Button
                  aria-label="Custom color"
                  sx={{
                    minWidth: 40,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor:
                      selectedColor && !colorOptions.includes(selectedColor)
                        ? selectedColor
                        : "#f0f0f0",
                    border:
                      selectedColor && !colorOptions.includes(selectedColor)
                        ? "2px solid black"
                        : "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor:
                        selectedColor && !colorOptions.includes(selectedColor)
                          ? selectedColor
                          : "#e0e0e0",
                    },
                  }}
                  onClick={handleColorPickerOpen}
                >
                  <ColorLensIcon
                    fontSize="small"
                    sx={{
                      color:
                        selectedColor && !colorOptions.includes(selectedColor)
                          ? getContrastColor(selectedColor)
                          : "#666",
                    }}
                  />
                </Button>
              </Box>
              <Popover
                open={Boolean(colorPickerAnchor)}
                anchorEl={colorPickerAnchor}
                onClose={handleColorPickerClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box sx={{ p: 2, width: 250 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Choose Custom Color
                  </Typography>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    style={{
                      width: "100%",
                      height: 50,
                      border: "none",
                      cursor: "pointer",
                      marginBottom: 16,
                    }}
                  />
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Button variant="outlined" onClick={handleColorPickerClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleCustomColorSelect}
                      disabled={!customColor}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </Popover>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!selectedUser || !selectedColor}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Helper function to determine text color based on background
function getContrastColor(hexColor) {
  if (!hexColor) return "#000000";
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default FastAccess;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, useTheme } from "@mui/material";

const Logout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleCancelLogout = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Confirm Logout
        </Typography>
        <Typography variant="body1" mb={4}>
          Are you sure you want to logout?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleCancelLogout}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleConfirmLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Logout;
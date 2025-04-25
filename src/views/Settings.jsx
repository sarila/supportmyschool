import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: theme.shape.borderRadius,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
}));

const Settings = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    emailUpdates: true,
    autoSave: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleLanguageChange = (event) => {
    setSettings((prev) => ({
      ...prev,
      language: event.target.value,
    }));
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        py: 6,
        px: 3,
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        Settings
      </Typography>

      <StyledPaper elevation={3}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3,
          }}
        >
          General Settings
        </Typography>
        <List sx={{ "& > *:not(:last-child)": { mb: 2 } }}>
          <StyledListItem>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Notifications
                </Typography>
              }
              secondary="Enable or disable all notifications"
            />
            <ListItemSecondaryAction>
              <StyledSwitch
                edge="end"
                checked={settings.notifications}
                onChange={() => handleToggle("notifications")}
              />
            </ListItemSecondaryAction>
          </StyledListItem>
          <Divider sx={{ my: 2 }} />

          <StyledListItem>
            <ListItemText
              primary="Email Updates"
              secondary="Receive email notifications for updates"
            />
            <ListItemSecondaryAction>
              <StyledSwitch
                edge="end"
                checked={settings.emailUpdates}
                onChange={() => handleToggle("emailUpdates")}
              />
            </ListItemSecondaryAction>
          </StyledListItem>
          <Divider sx={{ my: 2 }} />

          <StyledListItem>
            <ListItemText
              primary="Auto-Save"
              secondary="Automatically save drafts and changes"
            />
            <ListItemSecondaryAction>
              <StyledSwitch
                edge="end"
                checked={settings.autoSave}
                onChange={() => handleToggle("autoSave")}
              />
            </ListItemSecondaryAction>
          </StyledListItem>
        </List>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3,
          }}
        >
          Preferences
        </Typography>
        <List sx={{ "& > *:not(:last-child)": { mb: 2 } }}>
          <StyledListItem>
            <FormControl fullWidth>
              <InputLabel id="language-select-label">Language</InputLabel>
              <StyledSelect
                labelId="language-select-label"
                value={settings.language}
                onChange={handleLanguageChange}
                label="Language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ne">नेपाली</MenuItem>
              </StyledSelect>
            </FormControl>
          </StyledListItem>
          <Divider sx={{ my: 2 }} />

        </List>
      </StyledPaper>
    </Box>
  );
};

export default Settings;

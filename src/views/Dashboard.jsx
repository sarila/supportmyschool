import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FaBars,
  FaUser,
  FaWallet,
  FaFileAlt,
  FaSchool,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import logo from "../assets/HeaderResize1.png";
import Proposals from "./Proposals";
import SchoolTable from "./SchoolTable";
import Budget from "./Budget";
import Profile from "./Profile";
import ViewDashboard from "./ViewDashboard";
import Logout from "./Logout";
import { Outlet } from "react-router-dom";
import { useTheme as useMuiTheme } from "@mui/material";
import { useTheme as useCustomTheme } from "../context/ThemeContext";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2), // Reduced padding
    // marginLeft: open ? drawerWidth : drawerMinWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })
);

const drawerWidth = 200; // Reduced width
const drawerMinWidth = 50; // Reduced collapsed width

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: "4px 8px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const Dashboard = () => {
  const [isWideNavbar, setIsWideNavbar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();

  const toggleNavbar = () => {
    setIsWideNavbar((prev) => !prev);
  };

  // Helper function to get current section from path
  const getCurrentSection = (path) => {
    const section = path.split("/")[1];
    return section || "dashboard";
  };

  // Use location.pathname to determine selected section
  const selectedSection = getCurrentSection(location.pathname);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaChartLine />,
      section: "view-dashboard",
      path: "/dashboard",
    },
    {
      label: "Profile",
      icon: <FaUser />,
      section: "profile",
      path: "/profile",
    },
    { label: "Budget", icon: <FaWallet />, section: "budget", path: "/budget" },
    {
      label: "Proposal",
      icon: <FaFileAlt />,
      section: "proposal",
      path: "/proposals",
    },
    {
      label: "Schools",
      icon: <FaSchool />,
      section: "schools",
      path: "/schools",
    },
    {
      label: "Settings",
      icon: <FaCog />,
      section: "settings",
      path: "/settings",
    },
    {
      label: "Logout",
      icon: <FaSignOutAlt />,
      section: "logout",
      path: "/logout",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: isWideNavbar ? drawerWidth : drawerMinWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isWideNavbar ? drawerWidth : drawerMinWidth,
            overflowX: "hidden",
            boxSizing: "border-box",
            transition: "width 0.3s ease",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            {isWideNavbar && (
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ height: 40, transition: "opacity 0.3s" }}
              />
            )}
            <IconButton onClick={toggleNavbar}>
              <FaBars />
            </IconButton>
          </Box>

          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <Tooltip
                title={isWideNavbar ? "" : item.label}
                placement="right"
                arrow
                key={item.label}
              >
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={selectedSection === item.section}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    {isWideNavbar && <ListItemText primary={item.label} />}
                  </StyledListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>

          <Box
            sx={{
              p: 2,
              display: isWideNavbar ? "flex" : "none",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2">Dark Mode</Typography>
            <Switch checked={isDarkMode} onChange={toggleTheme} />
          </Box>
        </Box>
      </Drawer>

      <Main open={isWideNavbar}>
        <Outlet /> {/* This will render the child routes */}
      </Main>
    </Box>
  );
};

export default Dashboard;

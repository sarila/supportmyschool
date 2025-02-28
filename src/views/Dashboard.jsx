// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   CssBaseline,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Switch,
//   Typography,
//   Tooltip,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   FaBars,
//   FaUser,
//   FaWallet,
//   FaFileAlt,
//   FaSchool,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import logo from "../assets/HeaderResize1.png";
// import Proposals from "./Proposals";
// import SchoolTable from "./SchoolTable";
// import Budget from "./Budget";
// import Profile from "./Profile";
// import ViewDashboard from "./ViewDashboard";

// const drawerWidth = 240;
// const drawerMinWidth = 60;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     marginLeft: open ? drawerWidth : drawerMinWidth,
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   })
// );

// export const Dashboard = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [selectedSection, setSelectedSection] = useState("profile");
//   const [isWideNavbar, setIsWideNavbar] = useState(true);

//   useEffect(() => {
//     document.body.className = isDarkMode ? "dark-mode" : "light-mode";
//   }, [isDarkMode]);

//   const toggleNavbar = () => {
//     setIsWideNavbar((prev) => !prev);
//   };

//   const renderContent = () => {
//     switch (selectedSection) {
//       case "view-dashboard":
//         return <ViewDashboard/>;
//       case "profile":
//         return <Profile />;
//       case "budget":
//         return <Budget />;
//       case "proposal":
//         return <Proposals />;
//       case "schools":
//         return <SchoolTable />;
//       case "settings":
//         return <div>Settings Content</div>;
//       case "logout":
//         return <div>Logout Content</div>;
//       default:
//         return <div>Welcome to the Dashboard</div>;
//     }
//   };

//   const menuItems = [
//     { label: "Dashboard", icon: <FaUser />, section: "view-dashboard" },
//     { label: "Profile", icon: <FaUser />, section: "profile" },
//     { label: "Budget", icon: <FaWallet />, section: "budget" },
//     { label: "Proposal", icon: <FaFileAlt />, section: "proposal" },
//     { label: "Schools", icon: <FaSchool />, section: "schools" },
//     { label: "Settings", icon: <FaCog />, section: "settings" },
//     { label: "Logout", icon: <FaSignOutAlt />, section: "logout" },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: isWideNavbar ? drawerWidth : drawerMinWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: isWideNavbar ? drawerWidth : drawerMinWidth,
//             overflowX: "hidden",
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         {/* Hamburger Icon Above the Logo */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 1,
//           }}
//         >
//           <IconButton onClick={toggleNavbar}>
//             <FaBars />
//           </IconButton>
//         </Box>

//         {/* Logo */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 2,
//           }}
//         >
//           <Box
//             component="img"
//             src={logo}
//             alt="Logo"
//             sx={{
//               width: isWideNavbar ? "100%" : "40px",
//               transition: "width 0.3s",
//             }}
//           />
//         </Box>

//         {/* Menu Items */}
//         <List>
//           {menuItems.map((item) => (
//             <Tooltip
//               title={isWideNavbar ? "" : item.label}
//               placement="right"
//               arrow
//               key={item.label}
//             >
//               <ListItem disablePadding>
//                 <ListItemButton
//                   selected={selectedSection === item.section}
//                   onClick={() => setSelectedSection(item.section)}
//                 >
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   {isWideNavbar && <ListItemText primary={item.label} />}
//                 </ListItemButton>
//               </ListItem>
//             </Tooltip>
//           ))}
//         </List>

//         {/* Dark Mode Toggle */}
//         <Box sx={{ p: 2, display: isWideNavbar ? "block" : "none" }}>
//           <Typography variant="body2">Dark Mode</Typography>
//           <Switch
//             checked={isDarkMode}
//             onChange={() => setIsDarkMode((prev) => !prev)}
//           />
//         </Box>
//       </Drawer>

//       {/* Main Content */}
//       <Main open={isWideNavbar}>{renderContent()}</Main>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
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
  ThemeProvider,
  createTheme,
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

const drawerWidth = 240;
const drawerMinWidth = 60;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: open ? drawerWidth : drawerMinWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })
);

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: "4px 8px",
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState("view-dashboard");
  const [isWideNavbar, setIsWideNavbar] = useState(true);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const toggleNavbar = () => {
    setIsWideNavbar((prev) => !prev);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "view-dashboard":
        return <ViewDashboard />;
      case "profile":
        return <Profile />;
      case "budget":
        return <Budget />;
      case "proposal":
        return <Proposals />;
      case "schools":
        return <SchoolTable />;
      case "settings":
        return <div>Settings Content</div>;
      case "logout":
        return <div>Logout Content</div>;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  const menuItems = [
    { label: "Dashboard", icon: <FaChartLine />, section: "view-dashboard" },
    { label: "Profile", icon: <FaUser />, section: "profile" },
    { label: "Budget", icon: <FaWallet />, section: "budget" },
    { label: "Proposal", icon: <FaFileAlt />, section: "proposal" },
    { label: "Schools", icon: <FaSchool />, section: "schools" },
    { label: "Settings", icon: <FaCog />, section: "settings" },
    { label: "Logout", icon: <FaSignOutAlt />, section: "logout" },
  ];

  return (
    <ThemeProvider theme={theme}>
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
                      onClick={() => setSelectedSection(item.section)}
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                      {isWideNavbar && <ListItemText primary={item.label} />}
                    </StyledListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </List>

            <Box sx={{ p: 2, display: isWideNavbar ? "flex" : "none", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="body2">Dark Mode</Typography>
              <Switch
                checked={isDarkMode}
                onChange={() => setIsDarkMode((prev) => !prev)}
              />
            </Box>
          </Box>
        </Drawer>

        <Main open={isWideNavbar}>{renderContent()}</Main>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;

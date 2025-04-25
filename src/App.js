import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import { Dashboard } from "./views/Dashboard.jsx";
import LoginPage from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import ViewDashboard from "./views/ViewDashboard.jsx";
import Proposals from "./views/Proposals.jsx";
import Budget from "./views/Budget.jsx";
import Profile from "./views/Profile.jsx";
import SchoolTable from "./views/SchoolTable.jsx";
import Settings from "./views/Settings.jsx";
import Logout from "./views/Logout.jsx";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />

          {/* Nested routes under Dashboard layout */}
          <Route path="/" element={<Dashboard />}>
            <Route path="dashboard" element={<ViewDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="budget" element={<Budget />} />
            <Route path="proposals" element={<Proposals />} />
            <Route path="schools" element={<SchoolTable />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

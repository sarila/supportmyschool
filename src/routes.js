import React from "react";

const Login = React.lazy(() => import("./views/Login"));
const Signup = React.lazy(() => import("./views/Signup"));
const Reports = React.lazy(() => import("./views/Reports"));
const Budget = React.lazy(() => import("./views/Budget"));
const Settings = React.lazy(() => import("./views/Settings"));
const Profile = React.lazy(() => import("./views/Profile"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));

// Routes and their properties
const routes = {
  login: {
    name: "Login",
    component: Login,
    path: "/login",
    exact: true,
  },
  signup: {
    name: "Signup",
    component: Signup,
    path: "/signup",
    exact: true,
  },
  reports: {
    name: "Reports",
    component: Reports,
    path: "/reports",
    exact: true,
  },
  budget: {
    name: "Budget",
    component: Budget,
    path: "/budget",
    exact: true,
  },
  settings: {
    name: "Settings",
    component: Settings,
    path: "/settings",
    exact: true,
  },
  profile: {
    name: "Profile",
    component: Profile,
    path: "/profile",
    exact: true,
  },
  dashboard: {
    name: "Dashboard",
    component: Dashboard,
    path: "/dashboard",
    exact: true,
  },
};

export default routes;

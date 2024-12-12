import React from "react";

const Login = React.lazy(() => import("./views/Login"));
const Signup = React.lazy(() => import("./views/Signup"));
const Proposals = React.lazy(() => import("./views/Proposals"));
const Budget = React.lazy(() => import("./views/Budget"));
const Settings = React.lazy(() => import("./views/Settings"));
const Profile = React.lazy(() => import("./views/Profile"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const ForgotPassword = React.lazy(() => import("./views/ForgotPassword.jsx"));

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
  proposals: {
    name: "Proposals",
    component: Proposals,
    path: "/proposals",
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
  forgotPassword: {
    name: "Forgot Password",
    component: ForgotPassword,
    path: "/forgotpassword",
    exact: true,
  },
};

export default routes;

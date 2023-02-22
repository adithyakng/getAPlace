import React from "react";
import { createBrowserRouter as Routes } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";

const AppRouter = Routes([
  {
    path: "/users/auth",
    element: <Auth />,
  },
  {
    path: "/admin/auth",
    element: <Auth />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/user/dashboard",
    element: <UserDashboard />,
  },
]);

export default AppRouter;

import React from "react";
import { createBrowserRouter as Routes, Navigate } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AddHouse from "./pages/AdminDashboard/AddHouse";
import ViewHouse from "./pages/AdminDashboard/ViewHouse";

const AppRouter = Routes([
  {
    path: "",
    element: <Navigate to="/admin/auth" replace />,
  },
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
  {
    path: "/admin/ads/add",
    element: (
      <AdminDashboard>
        <AddHouse />
      </AdminDashboard>
    ),
  },
  {
    path: "/admin/ads/view",
    element: (
      <AdminDashboard>
        <ViewHouse />
      </AdminDashboard>
    ),
  },
]);

export default AppRouter;

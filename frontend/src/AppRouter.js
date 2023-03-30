import React from "react";
import { createBrowserRouter as Routes, Navigate } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UsersDashboard from "./pages/UsersDashboard/UsersDashboard";
import AddHouse from "./pages/AdminDashboard/AddHouse";
import ViewHouse from "./pages/AdminDashboard/ViewHouse";
import UsersViewHouse from "./pages/UsersDashboard/UsersViewHouse";
import UsersFAQs from "./pages/UsersDashboard/UsersFAQs";
import UsersChatRoom from "./pages/UsersDashboard/UsersChatRoom";
import UserLeases from "./pages/UsersDashboard/UserLeases";
import ViewAllRequestsModal from "./pages/AdminDashboard/ViewAllRequestsModal";
import ChatGPT from "./pages/ChatGPT/ChatGPT";

const AppRouter = Routes([
  {
    path: "",
    element: <Navigate to="/users/auth" replace />,
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
    path: "/users/dashboard",
    element: <UsersDashboard />,
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
  {
    path: "/admin/view/requests",
    element: (
      <AdminDashboard>
        <ViewAllRequestsModal />
      </AdminDashboard>
    ),
  },
  {
    path: "/users/ads/view",
    element: (
      <UsersDashboard>
        <UsersViewHouse />
      </UsersDashboard>
    ),
  },

  {
    path: "/users/view/leases",
    element: (
      <UsersDashboard>
        <UserLeases />
      </UsersDashboard>
    ),
  },

  {
    path: "/users/faqs/*",
    element: (
      <UsersDashboard>
        <UsersFAQs />
      </UsersDashboard>
    ),
  },
  {
    path: "/users/room/*",
    element: (
      <UsersDashboard>
        <UsersChatRoom />
      </UsersDashboard>
    ),
  },
  {
    path: "/chatgpt",
    element: (
      <UsersDashboard>
        <ChatGPT />
      </UsersDashboard>
    ),
  },
]);

export default AppRouter;

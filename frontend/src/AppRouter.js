import React from "react";
import Auth from "./pages/Auth/Auth";

import { createBrowserRouter as Routes } from "react-router-dom";

const AppRouter = Routes([
  {
    path: "/users/auth",
    element: <Auth />,
  },
  {
    path: "/admin/auth",
    element: <Auth />,
  },
]);

export default AppRouter;

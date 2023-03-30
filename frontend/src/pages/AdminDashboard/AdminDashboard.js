import React from "react";

import NavSidebar from "../NavSidebar/NavSidebar";

import AddHomeIcon from "@mui/icons-material/AddHome";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HomeIcon from "@mui/icons-material/Home";

const AdminDashboard = ({ children }) => {
  const menuItemsGroups = [
    [
      {
        key: "HousesGroup",
        items: [
          {
            key: "HousesGroup.AddHousesAd",
            label: "Add House Ad",
            icon: <AddHomeIcon />,
            href: "/admin/ads/add",
          },
          {
            key: "HousesGroup.ViewHouseAds",
            label: "View House Ads",
            icon: <HomeIcon />,
            href: "/admin/ads/view",
          },
          {
            key: "HousesGroup.ViewAllRequests",
            label: "View All Maintenenacec Requests",
            icon: <EngineeringIcon />,
            href: "/admin/view/requests",
          },
        ],
      },
    ],
    [
      {
        key: "AccountGroup",
        items: [
          {
            key: "AccountGroup.Logout",
            label: "Logout Admin",
            icon: <AddHomeIcon />,
            href: "/admin/auth",
          },
        ],
      },
    ],
  ];

  return (
    <div
      className="base_container"
      style={{ margin: "-2%", marginLeft: "-2%" }}
    >
      <NavSidebar
        key={"navsidebaradmindashboard"}
        menuItemsGroups={menuItemsGroups}
      >
        <div style={{ margin: "3%" }}>{children}</div>
      </NavSidebar>
    </div>
  );
};

export default AdminDashboard;

import React from "react";

import NavSidebar from "../NavSidebar/NavSidebar";

import AddHomeIcon from "@mui/icons-material/AddHome";
import HomeIcon from "@mui/icons-material/Home";

const UsersDashboard = ({ children }) => {
  const menuItemsGroups = [
    [
      {
        key: "HousesGroup",
        items: [
          {
            key: "HousesGroup.ViewHouseAds",
            label: "View House Ads",
            icon: <HomeIcon />,
            href: "/users/ads/view",
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
            label: "Logout User",
            icon: <AddHomeIcon />,
            href: "/users/auth",
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
        key={"navsidebarusersdashboard"}
        menuItemsGroups={menuItemsGroups}
      >
        <div style={{ margin: "3%" }}>{children}</div>
      </NavSidebar>
    </div>
  );
};

export default UsersDashboard;

import React from "react";

import NavSidebar from "../NavSidebar/NavSidebar";

import AddHomeIcon from "@mui/icons-material/AddHome";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import HomeIcon from "@mui/icons-material/Home";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

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
          {
            key: "HousesGroup.ViewLeases",
            label: "View Current Leases",
            icon: <HouseSidingIcon />,
            href: "/users/view/leases",
          },
        ],
      },
    ],
    [
      {
        key: "AdminChatGroup",
        items: [
          {
            key: "AdminChatGroup.ChatBot",
            label: "Chat with our Bot",
            icon: <MarkUnreadChatAltIcon />,
            href: "/chatgpt",
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
            href: "/",
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

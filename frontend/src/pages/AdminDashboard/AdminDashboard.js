import React from "react";

import NavSidebar from "../NavSidebar/NavSidebar";

const AdminDashboard = ({ children }) => {
  return (
    <div
      className="base_container"
      style={{ margin: "-2%", marginLeft: "-2%" }}
    >
      <NavSidebar key={"navsidebaradmindashboard"}>
        <div style={{ margin: "3%" }}>{children}</div>
      </NavSidebar>
    </div>
  );
};

export default AdminDashboard;

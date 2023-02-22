import React from "react";

import NavSidebar from "../NavSidebar/NavSidebar";
import AddHouse from "./AddHouse";

const AdminDashboard = () => {
  return (
    <div
      className="base_container"
      style={{ margin: "-2%", marginLeft: "-2%" }}
    >
      <NavSidebar>
        <div style={{ margin: "3%" }}>
          <AddHouse />
        </div>
      </NavSidebar>
    </div>
  );
};

export default AdminDashboard;

import React from "react";

import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import logo from "../../logo.png";
const Homepage = () => {
  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "var(--main-bg-color)" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "var(--main-bg-color)",
        }}
      >
        <img src={logo} width="500" height="500" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CustomButton
          id="loginusers"
          name="loginusers"
          value="Go To User Login"
          clickHandler={() => {
            window.location.href = "/users/auth";
          }}
          key={"admin_login_redirect"}
          width="30%"
        />
        <CustomButton
          id="loginadmin"
          name="loginadmin"
          value="Go To Admin Login"
          clickHandler={() => {
            window.location.href = "/admin/auth";
          }}
          key={"admin_login_redirect"}
          width="30%"
        />
      </div>
    </div>
  );
};

export default Homepage;

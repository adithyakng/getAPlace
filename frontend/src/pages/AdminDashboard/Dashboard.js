import React from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

const Dashboard = () => {
  return (
    <div className="base_container">
      <div className="left_container">
        <Login apiPath={"/login/login"} key="LoginMainPage" />
      </div>
      <div className="right_container">
        <Signup apiPath={"/login/signup"} key="SignupMainPage" />
      </div>
    </div>
  );
};

export default Dashboard;

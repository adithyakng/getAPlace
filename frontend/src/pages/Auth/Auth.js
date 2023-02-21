import React from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

const UserAuth = () => {
  const mainPath = window.location.pathname.split("/")[1];
  const apiPaths = {
    login: `/${mainPath}/login`,
    signup: `/${mainPath}/register`,
  };

  return (
    <div className="base_container">
      <div className="left_container">
        <Login
          apiPath={apiPaths.login}
          pageName={mainPath}
          key={`${mainPath}LoginMainPage`}
        />
      </div>
      <div className="right_container">
        <Signup
          apiPath={apiPaths.signup}
          pageName={mainPath}
          key={`${mainPath}SignupMainPage`}
        />
      </div>
    </div>
  );
};

export default UserAuth;

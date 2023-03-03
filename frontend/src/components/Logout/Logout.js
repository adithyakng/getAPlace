import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    window.location.href = "/user/auth";
  }, []);
  return <div></div>;
};

export default Logout;

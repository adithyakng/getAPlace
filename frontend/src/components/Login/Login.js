import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";
import types from "../../types/types";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";

const Login = ({ pageName, apiPath }) => {
  const navigate = useNavigate();
  // States
  const [loginObject, setLoginObject] = useState(new types.LoginObject());
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());

  // Handlers
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginObject({ ...loginObject, [name]: value });
  };

  const clickHandler = async () => {
    try {
      await axios.post(apiPath, loginObject);
      setLoginObject(new types.LoginObject());
      navigate(`/${pageName}/dashboard`);
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Authentication Failed!",
        body: error.response.data.error,
      });
    }
  };

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
      <Card variant="outlined" sx={{ padding: "2%" }}>
        <CustomTextField
          helperText="Please enter your email"
          id="email"
          label="Email"
          name="email"
          value={loginObject}
          setValue={changeHandler}
          key={`${pageName}_login_email`}
        />
        <CustomTextField
          helperText="Please enter your password"
          id="password"
          label="Password"
          name="password"
          type="password"
          value={loginObject}
          setValue={changeHandler}
          key={`${pageName}_login_password`}
        />
        <CustomButton
          id="login"
          name="login"
          value="Log In"
          clickHandler={clickHandler}
          key={`${pageName}_login_button`}
        />
      </Card>
    </>
  );
};

export default Login;

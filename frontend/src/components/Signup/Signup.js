import React, { useState } from "react";
import axios from "axios";
import { Card } from "@mui/material";

import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import CustomPhoneNumber from "../../ui-elements/CustomPhoneNumber/CustomPhoneNumber";
import types from "../../types/types";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";

const Signup = ({ pageName, apiPath }) => {
  // States
  const [signupObject, setSignupObject] = useState(new types.SignupObject());
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupObject({ ...signupObject, [name]: value });
  };

  const clickHandler = async () => {
    try {
      const resp = await axios.post(apiPath, signupObject);
      setErrorModal({
        show: true,
        title: "Registration Successful!",
        body: resp.data.message,
      });
      setSignupObject(new types.SignupObject());
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Signup Failed!",
        body: error.response.data.error,
      });
    }
  };

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />

      <Card variant="outlined" sx={{ padding: "2%" }}>
        <CustomTextField
          helperText="Please enter your full name"
          id="name"
          label="Full Name"
          name="name"
          value={signupObject}
          setValue={changeHandler}
          key={`${pageName}_signup_name`}
        />
        <CustomTextField
          helperText="Please enter your email"
          id="email"
          label="Email"
          name="email"
          value={signupObject}
          setValue={changeHandler}
          key={`${pageName}_signup_email`}
        />
        <CustomTextField
          helperText="Please enter your password"
          id="password"
          label="Password"
          name="password"
          type="password"
          value={signupObject}
          setValue={changeHandler}
          key={`${pageName}_signup_password`}
        />
        <CustomPhoneNumber
          value={signupObject}
          setValue={setSignupObject}
          key={`${pageName}_signup_phoneNumber`}
        />
        <CustomButton
          id="signup"
          name="signup"
          value="Sign Up"
          clickHandler={clickHandler}
          key={`${pageName}_signup_button`}
        />
      </Card>
    </>
  );
};

export default Signup;

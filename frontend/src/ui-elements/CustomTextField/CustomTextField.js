import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({
  helperText,
  id,
  name,
  label,
  value,
  setValue,
  type = "text",
  isDisabled = false,
}) => {
  return (
    <TextField
      style={{ width: "96%", margin: "2%" }}
      helperText={helperText}
      id={id}
      name={name}
      label={label}
      value={value[name]}
      onChange={setValue}
      type={type}
      disabled={isDisabled}
    />
  );
};

export default CustomTextField;

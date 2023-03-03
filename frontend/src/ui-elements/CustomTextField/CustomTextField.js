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
  width = "96%",
  margin = "2%",
}) => {
  return (
    <TextField
      style={{ width: width, margin: margin }}
      label={label}
      helperText={helperText}
      value={value[name]}
      id={id}
      name={name}
      onChange={setValue}
      type={type}
      disabled={isDisabled}
    />
  );
};

export default CustomTextField;

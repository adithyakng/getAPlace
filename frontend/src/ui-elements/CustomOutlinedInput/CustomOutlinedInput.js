import { OutlinedInput, TextField } from "@mui/material";
import React from "react";

const CustomOutlinedInput = ({
  helperText,
  id,
  name,
  value,
  setValue,
  type = "text",
  isDisabled = false,
  width = "96%",
  margin = "2%",
  children = null,
}) => {
  return (
    <OutlinedInput
      style={{ width: width, margin: margin }}
      helperText={helperText}
      value={value[name]}
      id={id}
      name={name}
      onChange={setValue}
      type={type}
      disabled={isDisabled}
      endAdornment={children}
    />
  );
};

export default CustomOutlinedInput;

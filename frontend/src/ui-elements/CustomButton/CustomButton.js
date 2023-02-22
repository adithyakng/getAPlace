import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  id,
  name,
  value,
  clickHandler,
  isDisabled = false,
  width = "96%",
  margin = "2%",
}) => {
  return (
    <Button
      style={{ width: width, margin: margin }}
      type="button"
      variant="contained"
      id={id}
      name={name}
      onClick={clickHandler}
      disabled={isDisabled}
      sx={{
        backgroundColor: "var(--main-color1)",
        "&:hover": { backgroundColor: "var(--main-color1dark)" },
      }}
    >
      {value}
    </Button>
  );
};

export default CustomButton;

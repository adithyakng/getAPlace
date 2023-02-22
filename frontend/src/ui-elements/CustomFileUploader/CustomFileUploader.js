import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";

const CustomFileUploader = ({
  id,
  name,
  value,
  clickHandler,
  isDisabled = false,
  width = "96%",
  margin = "2%",
  isMultiple = true,
}) => {
  return (
    <>
      <input
        color="primary"
        accept="image/*"
        type="file"
        multiple={isMultiple}
        onChange={clickHandler}
        name={name}
        id={id}
        style={{ display: "none" }}
      />
      <label htmlFor={name}>
        <Button
          style={{ width: width, margin: margin }}
          variant="contained"
          component="span"
          disabled={isDisabled}
          sx={{
            backgroundColor: "var(--main-color1)",
            "&:hover": { backgroundColor: "var(--main-color1dark)" },
          }}
          size="large"
          color="primary"
        >
          <ImageIcon />
          &nbsp;&nbsp;{value}
        </Button>
      </label>
    </>
  );
};

export default CustomFileUploader;

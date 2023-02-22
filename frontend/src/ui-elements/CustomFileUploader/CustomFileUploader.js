import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";
import CustomTextField from "../CustomTextField/CustomTextField";

const CustomFileUploader = ({
  id,
  name,
  value,
  valuesList,
  clickHandler,
  isDisabled = false,
  width = "45%",
  margin = "2%",
  isMultiple = true,
}) => {
  console.log(valuesList);
  return (
    <>
      <input
        color="primary"
        accept="*/*"
        type="file"
        multiple={isMultiple}
        onChange={clickHandler}
        name={name}
        id={id}
        style={{ display: "none" }}
      />
      <CustomTextField
        helperText={`${name} List`}
        id={`${name}_list`}
        name={`${name}metadata`}
        label={`${name} List`}
        isDisabled={true}
        value={valuesList}
        margin={margin}
        width={width}
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

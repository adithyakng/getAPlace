import { Slider, Typography } from "@mui/material";
import React from "react";

const CustomTextField = ({
  label,
  defaultLabelName,
  labelName,
  value,
  setValue,
}) => {
  const calculateValue = (currValue) => {
    let step = Math.ceil(
      (value[defaultLabelName][1] - value[defaultLabelName][0]) / 100
    );
    return currValue * step;
  };

  const handleChange = (event, newValue, activeThumb) => {
    const name = event.target.name;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue({
        ...value,
        [name]: [Math.min(newValue[0], value[name][1] - 0), value[name][1]],
      });
    } else {
      setValue({
        ...value,
        [name]: [value[name][0], Math.max(newValue[1], value[name][0] + 0)],
      });
    }
  };

  return (
    <>
      <Typography id="non-linear-slider" gutterBottom>
        {label}
      </Typography>
      <Slider
        key={labelName}
        value={value[labelName]}
        name={labelName}
        scale={calculateValue}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={(currValue) => {
          return `${currValue}`;
        }}
        disableSwap
      />
    </>
  );
};

export default CustomTextField;

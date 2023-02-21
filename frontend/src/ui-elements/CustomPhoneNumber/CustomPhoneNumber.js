import React from "react";
import { MuiTelInput } from "mui-tel-input";

const CustomPhoneNumber = ({
  value,
  setValue,
  label = "Phone Number",
  helperText = "Please choose country code and enter 10 digit mobile number",
  isDisabled = false,
}) => {
  return (
    <MuiTelInput
      sx={{ margin: "2%", width: "96%" }}
      label={label}
      helperText={helperText}
      value={value.combinedNumber}
      disabled={isDisabled}
      onChange={(val, info) => {
        setValue({
          ...value,
          phoneNumber: info.nationalNumber,
          countryCode: "+" + info.countryCallingCode,
          combinedNumber: info.numberValue,
        });
      }}
    />
  );
};

export default CustomPhoneNumber;

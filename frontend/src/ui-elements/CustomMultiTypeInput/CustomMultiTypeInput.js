import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CustomTextField from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";

const CustomMultiTypeInput = ({
  label,
  labelName,
  labelAdd,
  labelAddName,
  value,
  setValue,
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const theme = useTheme();

  // Handlers
  const getStyles = (name, valuesList, theme) => {
    return {
      fontWeight:
        valuesList.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleChange = (event) => {
    const eValue = event.target.value;
    setValue({
      ...value,
      [labelName]: {
        ...value[labelName],
        list: typeof eValue === "string" ? eValue.split(",") : eValue,
      },
    });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const eValue = event.target.value;

    setValue({
      ...value,
      [labelName]: {
        ...value[labelName],
        [name]: eValue,
      },
    });
  };

  const addValueHandler = () => {
    if (value[labelName][labelAddName] !== "") {
      setValue({
        ...value,
        [labelName]: {
          ...value[labelName],
          list: [...value[labelName].list, value[labelName][labelAddName]],
          [labelAddName]: "",
        },
      });
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "50%" }}>
        <InputLabel id="demo-multiple-input-label">{`${label} List`}</InputLabel>
        <Select
          labelId="demo-multiple-input-label"
          id="demo-multiple-input"
          multiple
          value={value[labelName].list}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label={`${label} List`} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {value[labelName].list.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, value[labelName].list, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CustomTextField
        helperText={`Please enter ${labelAddName}`}
        id={labelAddName}
        name={labelAddName}
        label={labelAdd}
        value={value[labelName]}
        width="30%"
        margin="0.5%"
        setValue={changeHandler}
      />
      <CustomButton
        id={`${labelAddName}`}
        name={`${labelAddName}`}
        value={"Add"}
        clickHandler={addValueHandler}
        width="10%"
        margin="1%"
      />
    </div>
  );
};

export default CustomMultiTypeInput;

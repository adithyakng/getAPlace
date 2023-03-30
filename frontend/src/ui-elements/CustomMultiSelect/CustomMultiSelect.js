import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const CustomMultiTypeInput = ({ label, labelName, id, value, setValue }) => {
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

  return (
    <div>
      <FormControl sx={{ m: 1, width: "50%" }}>
        <InputLabel id={labelName + "-label"}>{label}</InputLabel>
        <Select
          labelId={labelName + "-label"}
          id={id}
          name={labelName}
          multiple
          value={value[labelName]}
          onChange={setValue}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {value[labelName].map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, value[labelName], theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomMultiTypeInput;

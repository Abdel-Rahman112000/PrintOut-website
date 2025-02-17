import { Choice } from "@/types/common/Product";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function MoreCustomization(props: PropsType) {
  const { label, handleChange, choices } = props;
  
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={(e) => {
          handleChange(e.target.value as string);
        }}
        sx={{
          height: "52.31px",
          borderRadius: "30px",
          border: "1.17px",
        }}
      >
        {choices?.map((choice) => (
          <MenuItem key={choice.id} value={choice.id}>
            {choice.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

type PropsType = {
  label: string;
  handleChange: (str: string) => void;
  choices: Choice[];
};

import { Checkbox, FormControlLabel } from "@mui/material";

export default function OneCustomization(props: PropsType) {
  const { label } = props;

  return <FormControlLabel control={<Checkbox />} label={label} />;
}

type PropsType = {
  label: string;
};

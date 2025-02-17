import { Stack, Typography, TypographyProps } from "@mui/material";
import AddLabelToEl, { AddLabelToElProps } from ".";

function CinzelAddLabelToEl({
  labelTypographyProps,
  ...props
}: AddLabelToElProps) {
  return (
    <AddLabelToEl
      {...props}
      labelTypographyProps={{ fontFamily: "Cinzel", ...labelTypographyProps }}
    />
  );
}

export default CinzelAddLabelToEl;

import { Button, ButtonProps } from "@mui/material";
import { ElementType, ReactElement } from "react";

function RoundedButton<C extends ElementType>({
  sx,
  ...props
}: ButtonProps<C, { component?: C }>) {
  return (
    <Button
      variant="contained"
      sx={{ borderRadius: 100, px: 6, ...sx }}
      {...props}
    />
  );
}

export default RoundedButton;

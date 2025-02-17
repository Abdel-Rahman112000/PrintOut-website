"use client";
import { lighten, useTheme } from "@mui/material";
import CircularButton, { CircularButtonProps } from "..";

function DarkCircularButton({ sx, ...props }: CircularButtonProps) {
  const {
    palette: { background },
  } = useTheme();

  return (
    <CircularButton
      sx={{
        bgcolor: lighten(background.default, 0.2),
        color: "text.primary",
        "&:hover": {
          bgcolor: lighten(background.default, 0.1),
        },
      }}
      {...props}
    />
  );
}

export default DarkCircularButton;

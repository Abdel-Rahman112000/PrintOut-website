"use client";
import { Fab, FabProps } from "@mui/material";

function CircularButton({ sx, ...props }: FabProps) {
  return <Fab sx={{ zIndex: 1, ...sx }} {...props} />;
}

export type CircularButtonProps = FabProps;

export default CircularButton;

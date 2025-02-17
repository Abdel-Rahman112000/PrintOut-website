import { PaletteOptions } from "@mui/material";
import { green } from "@mui/material/colors";

export const DarkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#9f9f9f",
    lightest: "#9f9f9f55",
    contrastText: "#000000",
  },
  secondary: {
    main: "#E09B6B",
    lightest: "#E09B6B55",
  },
  background: {
    default: "#0F0F0F",
    darkest: "#000000",
    paper: "#171717",
    medTransparent: "rgba(30, 41, 59, 0.5)",
  },
  success: {
    main: green.A400,
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#7c8fb0",
  },
};

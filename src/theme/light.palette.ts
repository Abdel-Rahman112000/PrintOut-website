import { PaletteOptions } from "@mui/material";
import { green, grey } from "@mui/material/colors";

export const LightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#20B9C9 ",
    lightest: "#20B9C922",
    contrastText: "#FFF",
  },
  secondary: {
    main: "#3C4242",
    lightest: "#3C424233",
  },
  background: {
    default: "#FFFFFF ",
    paper: "#FFFFFF",
  },
  success: {
    main: green.A400,
  },
  text: {
    primary: "#3C4242",
    secondary: "#646368",
    disabled: grey[400],
  },
};
